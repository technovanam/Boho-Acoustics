import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Briefcase, Frame, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };

export default function Solutions() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const solutions = [
    { title: "Home Theatre", desc: "THX-grade isolation mapping and deadening for cinematic immersion without disturbing the house.", icon: Home, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=900" },
    { title: "Office & Corporate", desc: "STI optimization in open-plan setups to increase focus and secure privacy in boardrooms.", icon: Briefcase, image: "https://images.unsplash.com/photo-1497366858526-0766f4a40d8a?q=80&w=900" },
    { title: "Recording Studios", desc: "Flawless frequency response design with custom bass traps and diffusion scattering panels.", icon: Mic, image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=900" },
    { title: "Auditoriums", desc: "Long-throw projection arrays matched with massive acoustic tiling for uniform sound pressure.", icon: Frame, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900" }
  ];

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/70 to-[#0A0A0A]/40" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-amber-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-500/80">Environments</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.88] max-w-4xl mt-6">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Tailored</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Acoustic</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="block">Solutions.</motion.span>
          </h1>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ───────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {solutions.map((sol, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.8 }}
              className="group cursor-pointer">
              <div className="overflow-hidden border border-white/10 aspect-[4/3] relative mb-6">
                <img src={sol.image} alt={sol.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-full text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500">
                  <sol.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-amber-500 transition-colors">{sol.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">{sol.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ENGINEERING TOOLS CTA ──────────────────────────── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Engineering Standard</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
              Precision Acoustic <span className="text-amber-500">Calculators</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Acoustics is a game of logarithms and inverse square laws. We've built professional-grade tools for architects and engineers to calculate sound power levels and distance attenuation instantly.
            </p>
            <Link 
              to="/tools/db-calculator" 
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-amber-500 hover:-translate-y-1 transition-all duration-500 group"
            >
              <span>Launch dB Calculator</span>
              <div className="w-8 h-[1px] bg-black/20 group-hover:bg-black transition-colors" />
            </Link>
          </div>
          
          <div className="relative w-full md:w-1/3 aspect-square border border-white/5 bg-black overflow-hidden group">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2)_0%,transparent_70%)]" />
               <div className="grid grid-cols-10 grid-rows-10 h-full w-full opacity-10">
                 {[...Array(100)].map((_, i) => (
                   <div key={i} className="border-[0.5px] border-white/20" />
                 ))}
               </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
               <span className="text-amber-500 font-black text-6xl tracking-tighter mb-2">94.0</span>
               <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Decibels (dB)</span>
               <div className="w-full h-1 bg-white/5 mt-8 relative overflow-hidden">
                 <motion.div 
                   animate={{ x: ['-100%', '100%'] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                   className="absolute inset-0 bg-amber-500/50 w-1/2" 
                 />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
