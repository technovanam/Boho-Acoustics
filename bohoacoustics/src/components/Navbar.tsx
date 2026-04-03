import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Resources", to: "/resources" },
  { label: "Blog", to: "/blog" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? "bg-black/92 backdrop-blur-xl py-4 border-white/10" 
          : "bg-transparent py-7 border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Boho Acoustics Logo" 
            width={160}
            height={48}
            loading="eager"
            decoding="async"
            className="h-10 w-auto lg:h-12 object-contain group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[10px] font-medium tracking-[0.24em] uppercase transition-all duration-500 hover:text-white relative group ${
                location.pathname === link.to ? "text-[#e6bf77]" : "text-white/45"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-gradient-to-r from-[#f0ce8f] via-[#d6a55a] to-[#b88333] transition-all duration-500 ${
                location.pathname === link.to ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-90"
              }`} />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/consultation">
            <Button 
              className="premium-gold-gradient shine-effect text-black font-semibold text-[10px] tracking-[0.2em] px-10 h-12 rounded-none shadow-2xl hover:opacity-90 transition-all duration-500 uppercase"
            >
              BOOK CONSULTATION
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden text-white/90 p-2 transition-colors duration-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl font-display font-medium tracking-[0.02em] py-2 transition-colors duration-300 ${
                    location.pathname === link.to ? "text-[#e6bf77]" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/consultation" onClick={() => setMobileOpen(false)}>
                <Button className="premium-gold-gradient shine-effect text-black w-full h-14 font-semibold rounded-none uppercase tracking-[0.2em] text-xs">
                  BOOK CONSULTATION
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
