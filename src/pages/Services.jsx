import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Services() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const servicesList = [
    { num: '01', title: 'Consultation & Audit', desc: 'Comprehensive site visits including drone mapping, RT60 checks, and resonance profiling to identify the exact acoustic flaws of the raw space.' },
    { num: '02', title: 'Acoustic Calculation', desc: 'Data modeling to determine exact thicknesses and material densities required. We do not guess; we run your space through fluid dynamic software.' },
    { num: '03', title: 'Bespoke Fabrication', desc: 'Custom CNC-milled diffusers and absorbers designed to match your interior vision seamlessly. Available in exotic woods and custom Kvadrat fabrics.' },
    { num: '04', title: 'Precision Audio Installation', desc: 'Flawless execution by our master craftsmen, ensuring zero gaps, perfect mounting, and final on-site verification testing.' },
  ];

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white pb-24">
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'hue-rotate(340deg)' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/80 to-[#0A0A0A]/40" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-amber-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-500/80">Capabilities</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.88] max-w-4xl mt-6">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Acoustic</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Engineering</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="block">Services.</motion.span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-32 z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 bg-[#0A0A0B] border border-white/10 shadow-2xl">
          {servicesList.map((service, idx) => (
             <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }}
               className="p-6 bg-black border border-white/5 hover:border-amber-500/50 transition-colors group">
               <span className="text-5xl font-black text-amber-500 mb-6 block group-hover:text-amber-400">{service.num}</span>
               <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">{service.title}</h3>
               <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
             </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
