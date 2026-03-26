import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  { title: "Audiophile Lounge", location: "Mumbai", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200" },
  { title: "Neo-Tech HQ", location: "Bangalore", image: "https://images.unsplash.com/photo-1497366858526-0766f4a40d8a?q=80&w=1200" },
  { title: "Grand Symphony", location: "Delhi", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200" },
  { title: "Midnight Studios", location: "Pune", image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1200" }
];

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white">
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/60 to-[#0A0A0A]/40" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500/80 font-black">Archive</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.88] max-w-4xl mt-6">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Featured</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Work.</motion.span>
          </h1>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
        {projects.map((proj, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
            <div className="overflow-hidden mb-6 aspect-[4/5] object-cover relative border border-white/10">
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
            </div>
            <div className="flex justify-between items-end border-b border-white/20 pb-4 group-hover:border-amber-500 transition-colors duration-500">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-2">{proj.location}</span>
                <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter">{proj.title}</h3>
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-white pb-2">View Case</span>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
