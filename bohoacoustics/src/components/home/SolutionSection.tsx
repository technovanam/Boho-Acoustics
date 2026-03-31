import { motion } from "framer-motion";
import { ClipboardCheck, Pencil, Package, Hammer, ArrowRight } from "lucide-react";

const steps = [
  { 
    icon: ClipboardCheck, 
    title: "CONSULTING", 
    number: "01",
    desc: "Scientific assessment of your space and acoustic goals." 
  },
  { 
    icon: Pencil, 
    title: "DESIGNING", 
    number: "02",
    desc: "Simulation-backed acoustic design for predictable performance." 
  },
  { 
    icon: Package, 
    title: "SUPPLYING", 
    number: "03",
    desc: "Sourcing premium, lab-tested acoustic materials." 
  },
  { 
    icon: Hammer, 
    title: "EXECUTING", 
    number: "04",
    desc: "On-site installation and final performance measurement." 
  },
];

const SolutionSection = () => (
  <section className="py-10 lg:py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div className="max-w-2xl">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">Methodology</p>
          <h2 className="font-display text-4xl lg:text-7xl font-bold leading-tight tracking-tighter">
            Our <span className="text-white/20">Process</span>
          </h2>
        </div>
        <div className="max-w-xs">
          <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed">
            A scientific, four-step framework refined over 200+ successful acoustic projects. No guesswork, only results.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-white/10">
        {steps.map((s, i) => (
          <div 
            key={s.title} 
            className="group relative p-10 border-r border-b lg:border-b-0 border-white/10 transition-colors duration-500 hover:bg-white/[0.02]"
          >
            {/* Minimal Square Accent */}
            <div className="absolute top-0 left-0 w-8 h-px bg-primary/0 group-hover:bg-primary transition-all duration-500" />
            <div className="absolute top-0 left-0 w-px h-8 bg-primary/0 group-hover:bg-primary transition-all duration-500" />

            <div className="flex flex-col h-full uppercase">
              <div className="flex items-center justify-between mb-16">
                <span className="font-display text-4xl font-black text-white/5 group-hover:text-primary/20 transition-colors duration-500">
                  {s.number}
                </span>
                <s.icon className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors duration-500" />
              </div>

              <h3 className="font-display text-xl font-bold mb-4 tracking-wider group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              
              <p className="text-muted-foreground text-sm font-light leading-relaxed normal-case mb-12 group-hover:text-white/70 transition-colors">
                {s.desc}
              </p>

              <div className="mt-auto overflow-hidden h-6">
                <div className="flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 text-[10px] font-bold tracking-widest text-primary">
                  LEARN MORE <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Industrial grid lines decoration */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02] -z-10" />
      <div className="absolute top-0 left-2/4 w-px h-full bg-white/[0.02] -z-10" />
      <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.02] -z-10" />
    </div>
  </section>
);

export default SolutionSection;
