import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "About", to: "/about" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-black/95 backdrop-blur-md py-4 border-white/10" 
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="../public/logo.png" 
            alt="Boho Acoustics Logo" 
            className="h-10 w-auto lg:h-12 object-contain group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-primary relative group ${
                location.pathname === link.to ? "text-primary" : "text-white/60"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${
                location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <a href="tel:+91" className="text-white/40 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
          </a>
          <Link to="/consultation">
            <Button 
              className="gradient-gold text-primary-foreground font-black text-[10px] tracking-widest px-8 h-12 rounded-none hover:opacity-90 transition-all uppercase"
            >
              BOOK CONSULTATION
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
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
            className="lg:hidden absolute top-full left-0 w-full bg-black border-b border-white/10"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl font-display font-bold tracking-tight py-2 ${
                    location.pathname === link.to ? "text-primary" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/consultation" onClick={() => setMobileOpen(false)}>
                <Button className="gradient-gold text-primary-foreground w-full h-14 font-bold rounded-none uppercase tracking-widest">
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
