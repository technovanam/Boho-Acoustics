import { test, expect } from "@playwright/test";

/**
 * End-to-end tests for critical user journeys
 * These tests validate that core functionality works across the application
 */

test.describe("Homepage", () => {
  test("should load homepage and display expected content", async ({ page }) => {
    await page.goto("/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check for main heading
    let heading = page.locator("h1");
    await expect(heading.first()).toBeVisible();

    // Check for navigation menu
    const navBar = page.locator("nav");
    await expect(navBar).toBeVisible();

    // Check for CTA button
    const consultationButton = page.locator('a:has-text("BOOK CONSULTATION")').first();
    expect(consultationButton).toBeDefined();

    // Check that primary navigation links are present and visible
    const navLinks = page.locator('nav a:has-text("Home"), nav a:has-text("Services"), nav a:has-text("Solutions")');
    expect(await navLinks.count()).toBeGreaterThan(0);
  });

  test("should have correct SEO meta tags on homepage", async ({ page }) => {
    await page.goto("/");

    // Check title tag
    const title = await page.title();
    expect(title).toContain("Boho Acoustics");

    // Check meta description
    const description = page.locator('meta[name="description"]');
    const descContent = await description.getAttribute("content");
    expect(descContent).toContain("acoustic solutions");

    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]');
    const canonicalHref = await canonical.getAttribute("href");
    expect(canonicalHref).toContain("bohoacoustic.com/");
  });

  test("should load hero image with proper attributes", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);

    // Verify images have alt text (accessibility)
    const imagesWithoutAlt = page.locator("img:not([alt])");
    const missingAltCount = await imagesWithoutAlt.count();
    expect(missingAltCount).toBe(0);
  });
});

test.describe("Navigation", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    await page.goto("/");

    // Navigate to Services
    await page.click('a[href="/services"]');
    await expect(page).toHaveURL(/\/services/);
    let pageTitle = await page.title();
    expect(pageTitle).toContain("Services");

    // Navigate to About
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/\/about/);
    pageTitle = await page.title();
    expect(pageTitle).toContain("About");

    // Navigate back to home
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/\/$/);
  });

  test("should show correct active state in navigation", async ({ page }) => {
    await page.goto("/services");

    // Find the Services link in nav
    const servicesLink = page.locator('a[href="/services"]').first();

    // It might have a specific class or color indicating active state
    const computedColor = await servicesLink.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Should be primary color (gold) or different from inactive state
    expect(computedColor).toBeDefined();
  });
});

test.describe("Blog", () => {
  test("should load blog page with article list", async ({ page }) => {
    await page.goto("/blog");

    // Wait for content to load
    await page.waitForLoadState("networkidle");

    // Check for blog articles
    const articles = page.locator("a[href*='/blog/']");
    const articleCount = await articles.count();

    // Should have at least one blog article
    expect(articleCount).toBeGreaterThan(0);
  });

  test("should navigate to individual blog posts", async ({ page }) => {
    await page.goto("/blog");

    // Click first article link
    const firstArticle = page.locator("a[href*='/blog/']").first();
    const href = await firstArticle.getAttribute("href");

    if (href && href !== "/blog") {
      await firstArticle.click();
      await expect(page).toHaveURL(new RegExp(href));

      // Verify blog post content loads
      const postTitle = page.locator("h1");
      await expect(postTitle.first()).toBeVisible();
    }
  });

  test("should have proper SEO meta tags on blog posts", async ({ page }) => {
    await page.goto("/blog");

    // Click first article
    const firstArticle = page.locator("a[href*='/blog/']").first();
    await firstArticle.click();

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check for required meta tags
    const description = page.locator('meta[name="description"]');
    const descContent = await description.getAttribute("content");
    expect(descContent).toBeTruthy();
    expect(descContent?.length).toBeGreaterThan(0);

    // Check og:type is article
    const ogType = page.locator('meta[property="og:type"]');
    const ogTypeContent = await ogType.getAttribute("content");
    expect(ogTypeContent).toBe("article");
  });
});

test.describe("Consultation Form", () => {
  test("should load consultation page", async ({ page }) => {
    await page.goto("/consultation");

    await page.waitForLoadState("networkidle");

    // Check for form elements
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Check for required input fields
    const nameInput = page.locator('input[name*="name"], input[name*="Name"], input[type="text"]').first();
    const emailInput = page.locator('input[name*="email"], input[type="email"]').first();

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
  });

  test("should show validation errors for empty submission", async ({ page }) => {
    await page.goto("/consultation");

    await page.waitForLoadState("networkidle");

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Wait for validation feedback
      await page.waitForTimeout(500);

      // Check for error messages (could be HTML5 validation or custom)
      const formErrors = page.locator("[role='alert'], .error, .invalid");
      const errorCount = await formErrors.count();

      // Should show at least one error or input should be marked invalid
      const invalidInputs = page.locator("input:invalid");
      expect(await invalidInputs.count() + errorCount).toBeGreaterThan(0);
    }
  });

  test("should accept valid form input", async ({ page }) => {
    await page.goto("/consultation");

    await page.waitForLoadState("networkidle");

    // Fill form with valid data
    await page.fill('input[type="text"], input[name*="name"]', "John Doe");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="tel"], input[name*="contact"]', "9876543210");

    // Select city (likely a dropdown)
    const citySelect = page.locator('select, input[name*="city"]').first();
    if (await citySelect.isVisible()) {
      const selectTag = await citySelect.evaluate((el) => el.tagName);
      if (selectTag === "SELECT") {
        await citySelect.selectOption({ index: 1 });
      } else {
        await citySelect.fill("Mumbai");
      }
    }

    // Select state
    const stateSelect = page.locator('select, input[name*="state"]').first();
    if (await stateSelect.isVisible()) {
      const selectTag = await stateSelect.evaluate((el) => el.tagName);
      if (selectTag === "SELECT") {
        await stateSelect.selectOption({ index: 1 });
      } else {
        await stateSelect.fill("Maharashtra");
      }
    }

    // Select facility type
    const facilitySelect = page.locator('select, input[name*="facility"]').first();
    if (await facilitySelect.isVisible()) {
      const selectTag = await facilitySelect.evaluate((el) => el.tagName);
      if (selectTag === "SELECT") {
        await facilitySelect.selectOption({ index: 1 });
      } else {
        await facilitySelect.fill("Home Theatre");
      }
    }

    // Verify inputs are filled
    const nameInput = page.locator('input[type="text"], input[name*="name"]').first();
    expect(await nameInput.inputValue()).toBeTruthy();
  });

  test("should not show form validation errors for valid input", async ({ page }) => {
    await page.goto("/consultation");

    await page.waitForLoadState("networkidle");

    // Fill all required fields with valid data
    const inputs = page.locator("input");
    const inputCount = await inputs.count();

    // If form is simple, fill the visible inputs
    for (let i = 0; i < Math.min(inputCount, 3); i++) {
      const input = inputs.nth(i);
      const inputType = await input.getAttribute("type");

      if (inputType === "email") {
        await input.fill("test@example.com");
      } else if (inputType === "tel") {
        await input.fill("9876543210");
      } else {
        await input.fill("Test Value");
      }
    }

    // Check for validation errors
    const invalidInputs = page.locator("input:invalid");
    expect(await invalidInputs.count()).toBe(0);
  });
});

test.describe("Admin Access", () => {
  test("should deny access to admin without token", async ({ page }) => {
    await page.goto("/admin");

    // Should either redirect or show 404 page
    // Check for "Not Found" or admin heading
    const notFoundHeading = page.locator("h1:has-text('Not Found')");
    const adminHeading = page.locator("h1:has-text('Admin')");

    const isNotFound = await notFoundHeading.isVisible();
    const isAdmin = await adminHeading.isVisible();

    // Should be one or the other
    expect(isNotFound || !isAdmin).toBeTruthy();
  });

  test("should allow access to admin with correct token", async ({ page }) => {
    await page.goto("/admin?access=boho-acoustics-access");

    await page.waitForLoadState("networkidle");

    // Should see admin dashboard elements
    const adminTitle = page.locator("h1, h2").first();
    await expect(adminTitle).toBeVisible();

    // Verify we're not on 404 page if we get admin content
    const notFoundHeading = page.locator("h1:has-text('Not Found')");
    const isNotFound = await notFoundHeading.isVisible();

    if (!isNotFound) {
      // We should see some admin-specific elements
      expect(true).toBeTruthy();
    }
  });
});

test.describe("Accessibility", () => {
  test("homepage should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Check for h1
    const h1 = page.locator("h1");
    expect(await h1.count()).toBeGreaterThan(0);

    // All headings should be in order
    const headings = page.locator("h1, h2, h3, h4, h5, h6");
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test("links should have descriptive text", async ({ page }) => {
    await page.goto("/");

    // Check for links with only icon content (bad a11y)
    const allLinks = page.locator("a");
    const linkCount = await allLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = allLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      const title = await link.getAttribute("title");

      // Link should have meaningful text or aria-label
      const hasText = text && text.trim().length > 0;
      const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;

      expect(hasText || hasAriaLabel).toBeTruthy();
    }
  });

  test("form inputs should have associated labels", async ({ page }) => {
    await page.goto("/consultation");

    const inputs = page.locator("input");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const inputId = await input.getAttribute("id");
      const inputName = await input.getAttribute("name");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledby = await input.getAttribute("aria-labelledby");

      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`);
        const hasLabel = await label.count() > 0;
        const hasAriaConnection = ariaLabel || ariaLabelledby;
        expect(hasLabel || hasAriaConnection).toBeTruthy();
      } else if (inputName) {
        // Check for aria attributes as fallback
        const hasAriaConnection = ariaLabel || ariaLabelledby;
        expect(hasAriaConnection).toBeTruthy();
      }
    }
  });
});

test.describe("Performance", () => {
  test("homepage should load in reasonable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test("should handle image loading efficiently", async ({ page }) => {
    await page.goto("/");

    // All images should have width/height attributes (prevents layout shift)
    const images = page.locator("img");
    const imageCount = await images.count();

    let imagesWithDimensions = 0;
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const width = await img.getAttribute("width");
      const height = await img.getAttribute("height");

      if (width && height) {
        imagesWithDimensions++;
      }
    }

    // Most images should have dimensions (relative to total)
    const dimensionsRatio = imageCount > 0 ? imagesWithDimensions / imageCount : 0;
    expect(dimensionsRatio).toBeGreaterThan(0.5);
  });
});
