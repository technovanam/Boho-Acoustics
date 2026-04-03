import { motion } from "framer-motion";

const metrics = [
  { label: "Reverberation Time", before: "2.8s", after: "0.6s", improvement: "79%" },
  { label: "Speech Clarity (STI)", before: "0.35", after: "0.82", improvement: "134%" },
  { label: "Background Noise", before: "55 dB", after: "32 dB", improvement: "42%" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any },
  },
  hover: {
    scale: 1.01,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as any }
  }
};

const BeforeAfterSection = () => (
  <section className="py-10 lg:py-20 bg-[#050505] border-t border-white/5 relative">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mb-24 text-left">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">MEASURABLE IMPACT</p>
        <h2 className="font-display text-[10vw] sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter mb-6">
          Quantified <span className="text-primary italic font-light">Performance</span>
        </h2>
        <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed max-w-xl">
          We don't guess — we measure. Every project is backed by scientific data with verified performance results.
        </p>
      </div>

      <motion.div
        className="max-w-5xl mx-auto border-t border-white/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={rowVariants}
            whileHover="hover"
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-10 md:p-14 border-b border-white/10 gap-8 cursor-default overflow-hidden rounded-sm bg-transparent"
          >
            {/* Liquid Wave Background Fill */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ y: "120%", opacity: 0 }}
              variants={{
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
            >
              {/* Wave Layer 1 (Back) */}
              <motion.div 
                className="absolute top-0 left-0 w-[200%] h-full text-white/[0.02]"
                variants={{
                  hover: { 
                    x: ["-50%", "0%"],
                    transition: { duration: 3, repeat: Infinity, ease: "linear" }
                  }
                }}
              >
                <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute -top-[40px] left-0 w-full h-[40px] fill-current">
                  <path d="M0,50 C200,0 300,100 500,50 C700,0 800,100 1000,50 L1000,100 L0,100 Z" />
                </svg>
                <div className="w-full h-full bg-current" />
              </motion.div>

              {/* Wave Layer 2 (Front) */}
              <motion.div 
                className="absolute top-0 left-0 w-[200%] h-full text-white/[0.04]"
                variants={{
                  hover: { 
                    x: ["0%", "-50%"],
                    transition: { duration: 2.2, repeat: Infinity, ease: "linear" }
                  }
                }}
              >
                <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute -top-[30px] left-0 w-full h-[30px] fill-current opacity-60">
                  <path d="M0,50 C250,100 350,0 500,50 C650,100 750,0 1000,50 L1000,100 L0,100 Z" />
                </svg>
                <div className="w-full h-full bg-current" />
              </motion.div>
            </motion.div>

            {/* Gold shimmer top accent — always subtle, glows on hover */}
            <div className="absolute top-0 left-0 h-px w-12 bg-primary/20 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-primary/40 group-hover:via-primary/10 group-hover:to-transparent z-10 transition-all duration-700 ease-out" />

            {/* Left: Label */}
            <div className="flex-1 relative z-10">
              <h3 className="font-display text-2xl font-black text-white/90 group-hover:text-white transition-colors duration-300 mb-2">
                {m.label}
              </h3>
              <p className="text-white/35 text-[10px] tracking-widest font-bold group-hover:text-primary/50 transition-colors duration-500 uppercase">VERIFIED METRIC</p>
            </div>

            {/* Right: Numbers */}
            <div className="flex items-center gap-12 lg:gap-20 relative z-10">
              <div className="text-center md:text-left">
                <p className="text-[10px] text-white/50 tracking-widest font-bold mb-3 uppercase">Before Treatment</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white/60 group-hover:text-white/80 transition-colors duration-400">
                    {m.before}
                  </span>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-white/10 group-hover:bg-primary/30 transition-colors duration-500" />

              <div className="text-center md:text-left">
                <p className="text-[10px] text-primary tracking-widest font-bold mb-3 uppercase">After Treatment</p>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className="text-4xl font-bold text-primary"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {m.after}
                  </motion.span>
                </div>
              </div>

              {/* Improvement badge — expands and brightens on hover */}
              <div className="hidden lg:flex flex-col items-end">
                <p className="text-[9px] text-white/45 tracking-[0.2em] font-bold mb-2 uppercase group-hover:text-primary/60 transition-colors duration-400">Improvement</p>
                <motion.div
                  className="text-2xl font-black text-white/70 group-hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  +{m.improvement}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BeforeAfterSection;
