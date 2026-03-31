import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Consultation from "./pages/Consultation";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import FloatingDbMeter from "./components/FloatingDbMeter";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";

import { useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const AppContent = () => {
  const { pathname } = useLocation();

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      
      {/* Premium Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen"
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/about" element={<About />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

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
      if (lenis) {
        lenis.destroy();
      }
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
