import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const posts = [
  { title: "The Science of RT60 Measurement", date: "MAR 26, 2026", category: "Engineering" },
  { title: "Why Egg Cartons Don't Stop Sound", date: "MAR 10, 2026", category: "Myths" },
  { title: "Designing the Perfect Home Theatre Trap", date: "FEB 15, 2026", category: "Guides" }
];

export default function Blog() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white min-h-screen">
      <section className="relative h-[70vh] flex flex-col justify-end overflow-hidden pb-24">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[#050505]" />
          <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }}
             className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, rgba(245, 158, 11, 0.1), transparent)" }} />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500/80 font-black">Knowledge Base</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.88] max-w-4xl">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Acoustics</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Journal.</motion.span>
          </h1>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col gap-8">
          {posts.map((post, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group cursor-pointer border-b border-white/10 pb-8 hover:border-amber-500 transition-colors duration-500 flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 mb-4 block">{post.category}</span>
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase group-hover:text-amber-500 transition-colors duration-500">{post.title}</h2>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{post.date}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
