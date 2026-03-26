import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin, ArrowUpRight, MessageCircle, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Run the preloader for 1.5 seconds initially
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const footerLinks = {
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Our Services', path: '/services' },
      { name: 'Solutions', path: '/solutions' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Blog', path: '/blog' },
    ],
    'Solutions': [
      { name: 'Home Theatre', path: '/solutions' },
      { name: 'Office Acoustics', path: '/solutions' },
      { name: 'Auditorium', path: '/solutions' },
      { name: 'Residential', path: '/solutions' },
      { name: 'Recording Studio', path: '/solutions' },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen font-body selection:bg-white selection:text-black relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left"
            >
              <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center bg-amber-500 text-black font-black text-6xl md:text-8xl">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-7xl md:text-[130px] font-black tracking-tighter text-white leading-[0.85]">BOHO</span>
                <span className="text-sm md:text-2xl uppercase tracking-[0.5em] text-amber-500 leading-none mt-2 md:mt-4">ACOUSTICS</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* Page Content */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {children}
      </motion.main>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform duration-300 group bg-amber-500 text-black"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={2} />
        <span className="text-xs font-black tracking-widest uppercase hidden sm:block">WhatsApp</span>
      </a>

      {/* Footer */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* CTA Strip */}
        <div className="px-6 md:px-12 py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, transparent 60%)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.4em] font-black text-amber-500">Ready to Transform Your Space?</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white">Let's Engineer Your<br className="hidden md:block" /> Perfect Acoustic Environment</h2>
            </div>
            <Link
              to="/consultation"
              className="group flex items-center gap-3 px-8 py-4 font-black uppercase tracking-wider text-sm text-black bg-amber-500 hover:bg-amber-400 transition-colors"
            >
              Get Free Acoustic Plan
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-amber-500">
                  <span className="text-black font-black text-base">B</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black tracking-tighter text-white text-lg leading-none">BOHO</span>
                  <span className="text-[7px] uppercase tracking-[0.4em] text-amber-500">ACOUSTICS</span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                India's premier acoustic solutions provider. Science-backed design for every space.
              </p>
              <div className="space-y-3 mt-6">
                <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-white/50 hover:text-amber-500 transition-colors group">
                  <Phone className="w-4 h-4" />
                  +91 99999 99999
                </a>
                <a href="mailto:hello@bohoacoustics.com" className="flex items-center gap-3 text-sm text-white/50 hover:text-amber-500 transition-colors group">
                  <Mail className="w-4 h-4" />
                  hello@bohoacoustics.com
                </a>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <MapPin className="w-4 h-4" />
                  Mumbai, India
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                {[
                  { Icon: Instagram, href: '#' },
                  { Icon: Linkedin, href: '#' },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href}
                    className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-amber-500 hover:text-amber-500 transition-all duration-300 text-white/50">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-5">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500/50">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path}
                        className="text-sm text-white/50 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group">
                        <span className="w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-3" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="space-y-5">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500/50">Stay Updated</h4>
              <p className="text-sm text-white/40 leading-relaxed">Get acoustic tips & project showcases in your inbox.</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm font-bold uppercase text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-black uppercase tracking-widest text-black bg-amber-500 hover:bg-amber-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20 border-t border-white/10">
            <span>© {new Date().getFullYear()} Boho Acoustics. All Rights Reserved.</span>
            <span>Sound Meets Science &amp; Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
