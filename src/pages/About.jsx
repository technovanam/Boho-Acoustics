import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Target, Users, Zap } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function About() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white pb-24">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/70 to-[#0A0A0A]/40" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-amber-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-500/80">Our Vision</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.88] max-w-4xl mt-6">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">The Science</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Of Silence.</motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mt-10 leading-relaxed">
            Founded by elite audio engineers and architects, Boho Acoustics bridges the gap between stunning aesthetic design and flawless sonic performance.
          </motion.p>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 mt-12 bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[2px] bg-amber-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-500">The Manifesto</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8">
              Design is nothing without <span className="text-amber-500">invisible architecture.</span>
            </h2>
            <div className="space-y-6 text-white/50 text-base md:text-lg leading-relaxed mix-blend-lighten">
              <p>For decades, interior design has focused purely on optics. We realized that the most beautiful room in the world is profoundly broken if the audio reverberates wildly.</p>
              <p>We approach every space as an instrument. We calculate exactly how sound waves travel, bounce, and decay. Then we install elegant solutions to control them.</p>
            </div>
          </div>
          <div className="relative aspect-square border border-white/10 p-4">
            <div className="w-full h-full bg-[#111] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000" alt="Engineers" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-black border border-white/10 p-8 w-64 shadow-2xl">
              <span className="block text-amber-500 font-black text-5xl mb-2">100%</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Performance Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
