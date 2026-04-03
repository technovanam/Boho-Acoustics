import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://bohoacoustic.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
const DIST_DIR = path.resolve("dist");
const INDEX_PATH = path.join(DIST_DIR, "index.html");
const SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");
const BLOG_POSTS_PATH = path.resolve("src/content/blogPosts.ts");

const STATIC_SEO = {
  "/": {
    title: "Boho Acoustics | Acoustic Design & Soundproofing Solutions",
    description:
      "End-to-end acoustic solutions for home theatres, offices, auditoriums and residential spaces. Science-backed design and execution across India.",
    robots: "index, follow, max-image-preview:large",
  },
  "/services": {
    title: "Acoustic Services In India (2026 Expert Guide) | Boho Acoustics",
    description:
      "Explore acoustic consulting, soundproofing, and performance-driven room treatment services for homes, offices, and commercial spaces across India.",
    robots: "index, follow, max-image-preview:large",
  },
  "/solutions": {
    title: "Acoustic Solutions By Space (2026 Expert Guide) | Boho Acoustics",
    description:
      "Discover outcome-focused acoustic solutions for home theatres, offices, auditoriums, studios, and residential environments.",
    robots: "index, follow, max-image-preview:large",
  },
  "/about": {
    title: "About Boho Acoustics | Science-Driven Acoustic Engineering",
    description:
      "Learn how Boho Acoustics combines data-backed engineering with design integration for predictable acoustic outcomes.",
    robots: "index, follow, max-image-preview:large",
  },
  "/consultation": {
    title: "Book Acoustic Consultation In India (2026) | Boho Acoustics",
    description:
      "Book a consultation with Boho Acoustics to get a measurable acoustic plan for your home, office, studio, or commercial project.",
    robots: "index, follow, max-image-preview:large",
  },
  "/blog": {
    title: "Acoustic Blog India (2026 Expert Guides) | Boho Acoustics",
    description:
      "Read high-intent acoustic guides on soundproofing, home theatre acoustics, office noise control, and consultant-led treatment planning in India.",
    robots: "index, follow, max-image-preview:large",
  },
  "/admin": {
    title: "Admin Portal | Boho Acoustics",
    description: "Internal admin portal.",
    robots: "noindex, nofollow",
  },
};

const readSitemapRoutes = async () => {
  try {
    const xml = await fs.readFile(SITEMAP_PATH, "utf8");
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((entry) => entry[1]);
    return matches
      .map((url) => {
        try {
          return new URL(url).pathname;
        } catch {
          return null;
        }
      })
      .filter((pathname) => pathname && pathname.startsWith("/"));
  } catch {
    return [];
  }
};

const readBlogSeo = async () => {
  const source = await fs.readFile(BLOG_POSTS_PATH, "utf8");
  const entries = {};
  const matcher = /slug:\s*"([^"]+)"[\s\S]*?seoTitle:\s*"([^"]+)"[\s\S]*?seoDescription:\s*"([^"]+)"/g;

  for (const match of source.matchAll(matcher)) {
    const slug = match[1];
    entries[`/blog/${slug}`] = {
      title: match[2],
      description: match[3],
      robots: "index, follow, max-image-preview:large",
    };
  }

  return entries;
};

const toTitleCase = (value) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getLocationRouteSeo = (pathname) => {
  if (pathname === "/acoustic-consultant-india") {
    return {
      title: "Best Acoustic Consultant in India (2026 Expert Guide) | Boho Acoustics",
      description:
        "Looking for acoustic consultant in India? Get measurable acoustic performance, faster execution, and expert guidance from Boho Acoustics. Book a consultation today.",
      robots: "index, follow, max-image-preview:large",
    };
  }

  const match = pathname.match(/^\/(acoustic-consultant|soundproofing|home-theatre-acoustics)-(.+)$/);
  if (!match) {
    return null;
  }

  const serviceNameMap = {
    "acoustic-consultant": "Acoustic Consultant",
    soundproofing: "Soundproofing Services",
    "home-theatre-acoustics": "Home Theatre Acoustics",
  };

  const service = serviceNameMap[match[1]];
  const city = toTitleCase(match[2]);

  return {
    title: `Best ${service} in ${city} (2026 Expert Guide) | Boho Acoustics`,
    description: `Looking for ${service.toLowerCase()} in ${city}? Get measurable acoustic performance, faster execution, and expert guidance from Boho Acoustics. Book a consultation today.`,
    robots: "index, follow, max-image-preview:large",
  };
};

const replaceOrInsert = (html, regex, value) => {
  if (regex.test(html)) {
    return html.replace(regex, value);
  }

  return html;
};

const buildHtml = (template, pathname, seo) => {
  const canonical = `${SITE_URL}${pathname}`;
  let html = template;

  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
  html = replaceOrInsert(html, /<meta name="description" content="[^"]*"\s*\/?\s*>/i, `<meta name="description" content="${seo.description}" />`);
  html = replaceOrInsert(html, /<meta name="robots" content="[^"]*"\s*\/?\s*>/i, `<meta name="robots" content="${seo.robots}" />`);
  html = replaceOrInsert(html, /<link rel="canonical" href="[^"]*"\s*\/?\s*>/i, `<link rel="canonical" href="${canonical}" />`);

  html = replaceOrInsert(html, /<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${seo.title}" />`);
  html = replaceOrInsert(html, /<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${seo.description}" />`);
  html = replaceOrInsert(html, /<meta property="og:url" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:url" content="${canonical}" />`);
  html = replaceOrInsert(html, /<meta property="og:image" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);

  html = replaceOrInsert(html, /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${seo.title}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${seo.description}" />`);
  html = replaceOrInsert(html, /<meta name="twitter:image" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);

  return html;
};

const writeRouteFile = async (pathname, html) => {
  const routeDir = pathname === "/" ? DIST_DIR : path.join(DIST_DIR, pathname.slice(1));
  const outputFile = pathname === "/" ? path.join(DIST_DIR, "index.html") : path.join(routeDir, "index.html");
  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(outputFile, html, "utf8");
};

const run = async () => {
  const [template, sitemapRoutes, blogSeo] = await Promise.all([
    fs.readFile(INDEX_PATH, "utf8"),
    readSitemapRoutes(),
    readBlogSeo(),
  ]);

  const routes = new Set(["/", ...Object.keys(STATIC_SEO), ...Object.keys(blogSeo), ...sitemapRoutes]);

  for (const pathname of routes) {
    const seo = STATIC_SEO[pathname] || blogSeo[pathname] || getLocationRouteSeo(pathname);
    if (!seo) {
      continue;
    }

    const html = buildHtml(template, pathname, seo);
    await writeRouteFile(pathname, html);
  }

  console.log(`prerendered ${routes.size} route files`);
};

run().catch((error) => {
  console.error("prerender-seo failed", error);
  process.exit(1);
});
