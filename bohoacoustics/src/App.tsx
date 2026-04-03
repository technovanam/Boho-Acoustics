import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingDbMeter from "./components/FloatingDbMeter";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Suspense, lazy, useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { SEO_ROUTE_CONFIGS } from "@/content/seoRoutes";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Solutions = lazy(() => import("./pages/Solutions"));
const About = lazy(() => import("./pages/About"));
const Consultation = lazy(() => import("./pages/Consultation"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));
const SeoLocationPage = lazy(() => import("./pages/SeoLocationPage"));
const Resources = lazy(() => import("./pages/Resources"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));

const queryClient = new QueryClient();
const SITE_URL = "https://bohoacoustic.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

type SeoConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
};

const upsertMetaTag = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const getSeoForPath = (pathname: string): SeoConfig => {
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

  if (pathname === "/resources") {
    return {
      title: "Acoustic Resources, Guest Posts & Insights | Boho Acoustics",
      description: "Use Boho Acoustics resources for backlinks, editorial collaboration, and growth-focused acoustic content strategy.",
      canonicalPath: "/resources",
    };
  }

  if (pathname === "/case-studies") {
    return {
      title: "Acoustic Case Studies In India (2026 Expert Projects) | Boho Acoustics",
      description: "Review real project outcomes from Mumbai, Pune, Bangalore, Chennai, and Hyderabad acoustic implementations.",
      canonicalPath: "/case-studies",
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
};

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-primary text-xs tracking-widest uppercase font-bold">
    Loading...
  </div>
);

const AppContent = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const isAdmin = pathname === "/admin";
  const hasAdminAccess = searchParams.get("access") === "boho-acoustics-access";

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    const canonical = `${SITE_URL}${seo.canonicalPath}`;

    document.title = seo.title;
    upsertCanonical(canonical);
    upsertMetaTag('meta[name="description"]', "name", "description", seo.description);
    upsertMetaTag('meta[name="robots"]', "name", "robots", seo.robots || "index, follow, max-image-preview:large");

    upsertMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    upsertMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Boho Acoustics");
    upsertMetaTag('meta[property="og:title"]', "property", "og:title", seo.title);
    upsertMetaTag('meta[property="og:description"]', "property", "og:description", seo.description);
    upsertMetaTag('meta[property="og:url"]', "property", "og:url", canonical);
    upsertMetaTag('meta[property="og:image"]', "property", "og:image", DEFAULT_IMAGE);

    upsertMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMetaTag('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    upsertMetaTag('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
    upsertMetaTag('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_IMAGE);
  }, [pathname]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />

      {!isAdmin && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="min-h-screen bg-background"
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/about" element={<About />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/case-studies" element={<CaseStudy />} />

              {SEO_ROUTE_CONFIGS.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <SeoLocationPage
                      city={route.city}
                      state={route.state}
                      service={route.service}
                      keyword={route.keyword}
                      nearbyAreas={route.nearbyAreas}
                      region={route.region}
                    />
                  }
                />
              ))}

              <Route path="/admin" element={hasAdminAccess ? <Admin /> : <NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {!isAdmin && <Footer />}
      <FloatingDbMeter />
      <FloatingWhatsApp />
    </TooltipProvider>
  );
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
