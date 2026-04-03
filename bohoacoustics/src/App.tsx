import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingDbMeter from "./components/FloatingDbMeter";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Suspense, lazy, useEffect, useState } from "react";
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

const queryClient = new QueryClient();
const SITE_URL = "https://bohoacoustic.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

type SeoConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
};

const getSeoForPath = (pathname: string): SeoConfig | null => {
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

const RouteSeo = ({ pathname }: { pathname: string }) => {
  const seo = getSeoForPath(pathname);

  // Dynamic pages own their metadata (BlogPost and SeoLocationPage) via page-level Helmet.
  if (!seo || pathname.startsWith("/blog/") || SEO_ROUTE_CONFIGS.some((route) => route.path === pathname)) {
    return null;
  }

  const canonical = `${SITE_URL}${seo.canonicalPath}`;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.robots || "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Boho Acoustics" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  );
};

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-primary text-xs tracking-widest uppercase font-bold">
    Loading...
  </div>
);

const AppContent = () => {
  const { pathname } = useLocation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isAdmin = pathname === "/admin";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <TooltipProvider>
      <RouteSeo pathname={pathname} />
      <Toaster />
      <Sonner />
      <ScrollToTop />

      {!isAdmin && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
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

              <Route path="/admin" element={<Admin />} />
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
