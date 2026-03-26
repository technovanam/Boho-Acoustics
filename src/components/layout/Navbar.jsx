import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[101] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          padding: scrolled ? '1rem 0' : '1.5rem 0',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Left Section: Brand & Tagline */}
          <Link to="/" className="flex flex-col justify-center group">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none group-hover:text-amber-500 transition-colors duration-300">
              BOHO ACOUSTICS
            </span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/50 leading-none mt-1.5 hidden md:block">
              Where Sound Meets Science & Design
            </span>
          </Link>

          {/* Center Section: Navigation Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path} className="relative group flex items-center h-full">
                  <span className={`text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${isActive ? 'text-amber-500' : 'text-white/60 group-hover:text-white'}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: CTA & WhatsApp */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-amber-500 transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to Expert</span>
            </a>

            <Link
              to="/consultation"
              className="px-6 py-3 bg-amber-500 text-black text-xs font-black uppercase tracking-[0.1em] rounded-sm hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-4">
            <Link
              to="/consultation"
              className="px-4 py-2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-300"
            >
              Book Audit
            </Link>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity z-50 relative"
            >
              <motion.div animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className={`w-6 h-[2px] ${isOpen ? 'bg-amber-500' : 'bg-white'} transition-transform`} />
              <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className={`w-6 h-[2px] bg-white transition-opacity`} />
              <motion.div animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className={`w-6 h-[2px] ${isOpen ? 'bg-amber-500' : 'bg-white'} transition-transform`} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col pt-32 px-6 pb-12"
          >
            <div className="flex-1 flex flex-col justify-center gap-6">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className="block text-4xl font-black uppercase tracking-tighter text-white/50 hover:text-amber-500 hover:translate-x-4 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-auto flex flex-col gap-6"
            >
              <a
                href="https://wa.me/919999999999"
                className="flex items-center justify-center gap-3 w-full py-4 border border-white/10 text-white/60 hover:text-amber-500 hover:border-amber-500 transition-colors uppercase font-bold text-xs tracking-widest"
              >
                <MessageCircle className="w-5 h-5" />
                Talk to Expert
              </a>
              <Link
                to="/consultation"
                className="flex items-center justify-center w-full py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors"
              >
                Book Full Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
