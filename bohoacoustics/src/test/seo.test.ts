import { describe, it, expect } from "vitest";

/**
 * Unit tests for SEO metadata generation based on route paths
 */

interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
}

function getSeoForPath(pathname: string): SeoConfig {
  if (pathname === "/services") {
    return {
      title: "Acoustic Services In India (2026 Expert Guide) | Boho Acoustics",
      description: "Explore acoustic consulting, soundproofing, and performance-driven room treatment services for homes, offices, and commercial spaces across India.",
      canonicalPath: "/services",
    };
  }

  if (pathname === "/solutions") {
    return {
      title: "Acoustic Solutions By Space (2026 Expert Guide) | Boho Acoustics",
      description: "Discover outcome-focused acoustic solutions for home theatres, offices, auditoriums, studios, and residential environments.",
      canonicalPath: "/solutions",
    };
  }

  if (pathname === "/about") {
    return {
      title: "About Boho Acoustics | Science-Driven Acoustic Engineering",
      description: "Learn how Boho Acoustics combines data-backed engineering with design integration for predictable acoustic outcomes.",
      canonicalPath: "/about",
    };
  }

  if (pathname === "/consultation") {
    return {
      title: "Book Acoustic Consultation In India (2026) | Boho Acoustics",
      description: "Book a consultation with Boho Acoustics to get a measurable acoustic plan for your home, office, studio, or commercial project.",
      canonicalPath: "/consultation",
    };
  }

  if (pathname === "/blog") {
    return {
      title: "Acoustic Blog India (2026 Expert Guides) | Boho Acoustics",
      description: "Read high-intent acoustic guides on soundproofing, home theatre acoustics, office noise control, and consultant-led treatment planning in India.",
      canonicalPath: "/blog",
    };
  }

  if (pathname.startsWith("/blog/")) {
    return {
      title: "Acoustic Expert Blog Post | Boho Acoustics",
      description: "Read practical acoustic guidance, technical frameworks, and actionable insights from Boho Acoustics.",
      canonicalPath: pathname,
    };
  }

  if (pathname === "/admin") {
    return {
      title: "Admin Portal | Boho Acoustics",
      description: "Internal admin portal.",
      canonicalPath: "/admin",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: "Boho Acoustics | Acoustic Design & Soundproofing Solutions",
    description: "End-to-end acoustic solutions for home theatres, offices, auditoriums and residential spaces. Science-backed design and execution across India.",
    canonicalPath: "/",
  };
}

describe("getSeoForPath", () => {
  describe("Main Routes", () => {
    it("should return correct SEO for homepage", () => {
      const seo = getSeoForPath("/");
      expect(seo.title).toBe("Boho Acoustics | Acoustic Design & Soundproofing Solutions");
      expect(seo.canonicalPath).toBe("/");
      expect(seo.robots).toBeUndefined();
      expect(seo.description).toContain("Science-backed design");
    });

    it("should return correct SEO for services page", () => {
      const seo = getSeoForPath("/services");
      expect(seo.title).toContain("Services");
      expect(seo.title).toContain("2026");
      expect(seo.title).toContain("Boho Acoustics");
      expect(seo.canonicalPath).toBe("/services");
      expect(seo.description).toContain("consulting");
      expect(seo.description).toContain("soundproofing");
    });

    it("should return correct SEO for solutions page", () => {
      const seo = getSeoForPath("/solutions");
      expect(seo.title).toContain("Solutions");
      expect(seo.title).toContain("2026");
      expect(seo.canonicalPath).toBe("/solutions");
      expect(seo.description).toContain("home theatres");
      expect(seo.description).toContain("offices");
    });

    it("should return correct SEO for about page", () => {
      const seo = getSeoForPath("/about");
      expect(seo.title).toContain("About");
      expect(seo.title).toContain("Science-Driven");
      expect(seo.canonicalPath).toBe("/about");
      expect(seo.description).toContain("data-backed engineering");
    });

    it("should return correct SEO for consultation page", () => {
      const seo = getSeoForPath("/consultation");
      expect(seo.title).toContain("Consultation");
      expect(seo.title).toContain("2026");
      expect(seo.canonicalPath).toBe("/consultation");
      expect(seo.description).toContain("measurable acoustic plan");
    });

    it("should return correct SEO for blog listing page", () => {
      const seo = getSeoForPath("/blog");
      expect(seo.title).toBe("Acoustic Blog India (2026 Expert Guides) | Boho Acoustics");
      expect(seo.canonicalPath).toBe("/blog");
      expect(seo.description).toContain("high-intent acoustic guides");
    });
  });

  describe("Blog Posts", () => {
    it("should return SEO for individual blog posts", () => {
      const seo = getSeoForPath("/blog/soundproof-room-india-cheaply");
      expect(seo.title).toBe("Acoustic Expert Blog Post | Boho Acoustics");
      expect(seo.canonicalPath).toBe("/blog/soundproof-room-india-cheaply");
      expect(seo.description).toContain("practical acoustic guidance");
    });

    it("should preserve canonical path for blog posts", () => {
      const paths = [
        "/blog/best-acoustic-panels",
        "/blog/office-noise-solutions",
        "/blog/home-theatre-setup",
      ];

      paths.forEach((path) => {
        const seo = getSeoForPath(path);
        expect(seo.canonicalPath).toBe(path);
      });
    });
  });

  describe("Admin Pages", () => {
    it("should return noindex for admin portal", () => {
      const seo = getSeoForPath("/admin");
      expect(seo.robots).toBe("noindex, nofollow");
      expect(seo.title).toBe("Admin Portal | Boho Acoustics");
    });
  });

  describe("Unknown Routes", () => {
    it("should return default SEO for unmatched routes", () => {
      const unmatchedPaths = [
        "/unknown",
        "/random-page",
        "/404",
        "/settings",
      ];

      unmatchedPaths.forEach((path) => {
        const seo = getSeoForPath(path);
        expect(seo.canonicalPath).toBe("/");
        expect(seo.title).toContain("Boho Acoustics");
      });
    });
  });

  describe("SEO Best Practices", () => {
    it("all non-admin titles should be under 70 characters", () => {
      const routes = ["/", "/services", "/solutions", "/about", "/consultation", "/blog"];
      routes.forEach((path) => {
        const seo = getSeoForPath(path);
        if (seo.robots !== "noindex, nofollow") {
          expect(seo.title.length).toBeLessThanOrEqual(70);
        }
      });
    });

    it("all descriptions should be under 160 characters", () => {
      const routes = ["/", "/services", "/solutions", "/about", "/consultation", "/blog"];
      routes.forEach((path) => {
        const seo = getSeoForPath(path);
        expect(seo.description.length).toBeLessThanOrEqual(160);
      });
    });

    it("all titles should include brand name", () => {
      const routes = ["/", "/services", "/solutions", "/about", "/consultation", "/blog"];
      routes.forEach((path) => {
        const seo = getSeoForPath(path);
        expect(seo.title.toLowerCase()).toContain("boho");
      });
    });

    it("all descriptions should be unique", () => {
      const routes = ["/services", "/solutions", "/about", "/consultation", "/blog"];
      const descriptions = routes.map((path) => getSeoForPath(path).description);
      const uniqueDescriptions = new Set(descriptions);
      expect(uniqueDescriptions.size).toBe(descriptions.length);
    });
  });

  describe("Canonical Paths", () => {
    it("should always return valid canonical paths", () => {
      const routes = ["/", "/services", "/solutions", "/about", "/consultation", "/blog"];
      routes.forEach((path) => {
        const seo = getSeoForPath(path);
        expect(seo.canonicalPath).toMatch(/^\/[a-z-]*$/);
      });
    });
  });
});
