import { motion } from "framer-motion";

const metrics = [
  { label: "Reverberation Time", before: "2.8s", after: "0.6s", improvement: "79%" },
  { label: "Speech Clarity (STI)", before: "0.35", after: "0.82", improvement: "134%" },
  { label: "Background Noise", before: "55 dB", after: "32 dB", improvement: "42%" },
];

const BeforeAfterSection = () => (
  <section className="py-10 lg:py-20 bg-[#050505] border-t border-white/5 relative">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mb-24 text-left">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">MEASURABLE IMPACT</p>
        <h2 className="font-display text-[10vw] sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter mb-6">
          Quantified <span className="text-white/20 italic font-light">Performance</span>
        </h2>
        <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed max-w-xl">
          We don't guess — we measure. Every project is backed by scientific data with verified performance results.
        </p>
      </div>

      <div className="max-w-5xl mx-auto border-t border-white/10">
        {metrics.map((m) => (
          <div 
            key={m.label} 
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-10 md:p-14 border-b border-white/10 hover:bg-white/[0.01] transition-colors gap-8"
          >
            {/* Visual Indicator Line (Sharp) */}
            <div className="absolute top-0 left-0 w-12 h-px bg-primary/20 group-hover:bg-primary transition-colors" />
            
            <div className="flex-1">
              <h3 className="font-display text-2xl font-black text-white group-hover:text-primary transition-colors mb-2">
                {m.label}
              </h3>
              <p className="text-white/20 text-[10px] tracking-widest font-bold">VERIFIED METRIC</p>
            </div>

            <div className="flex items-center gap-12 lg:gap-20">
              <div className="text-center md:text-left">
                <p className="text-[10px] text-white/30 tracking-widest font-bold mb-3 uppercase">Before Treatment</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white/40">{m.before}</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-white/10" />

              <div className="text-center md:text-left">
                <p className="text-[10px] text-primary tracking-widest font-bold mb-3 uppercase">After Treatment</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{m.after}</span>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-end">
                <p className="text-[9px] text-white/30 tracking-[0.2em] font-bold mb-2 uppercase">Improvement</p>
                <div className="text-2xl font-black text-white/60 group-hover:text-white transition-colors">
                  +{m.improvement}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;
