import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Consultation() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white pb-32">
      <section className="relative h-[80vh] flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[#050505]" />
          <motion.div animate={{ opacity: [0.3, 0.4, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
             className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.15), transparent 50%)" }} />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.88] max-w-4xl">
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Book Your</motion.span>
            <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Acoustic Audit.</motion.span>
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 relative -mt-32 z-20">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#0A0A0B] border border-white/10 p-8 md:p-16 shadow-2xl">
          
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-8">
                <ArrowUpRight className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Signal Received</h2>
              <p className="text-white/50 text-base">Our acoustic engineers will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-500">Full Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-white/20 p-4 font-bold text-white uppercase focus:outline-none focus:border-amber-500 transition-colors" placeholder="JOHN DOE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-500">Email Address</label>
                  <input required type="email" className="w-full bg-transparent border-b border-white/20 p-4 font-bold text-white uppercase focus:outline-none focus:border-amber-500 transition-colors" placeholder="JOHN@COMPANY.COM" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-500">Project Type</label>
                <select className="w-full bg-black border border-white/20 p-4 font-bold text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer">
                   <option value="home-theatre">Luxury Home Theatre</option>
                   <option value="office">Corporate Office Focus</option>
                   <option value="studio">Recording Studio</option>
                   <option value="other">Other Commercial</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-500">Project Details</label>
                <textarea required rows="4" className="w-full bg-transparent border-b border-white/20 p-4 font-bold text-white uppercase focus:outline-none focus:border-amber-500 transition-colors" placeholder="TELL US ABOUT THE SPACE AND THE NOISE PROBLEM..." />
              </div>

              <button type="submit" className="group w-full flex justify-center items-center gap-4 bg-amber-500 text-black py-6 font-black uppercase tracking-[0.3em] hover:bg-amber-400 transition-all text-xs">
                Submit Request <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
