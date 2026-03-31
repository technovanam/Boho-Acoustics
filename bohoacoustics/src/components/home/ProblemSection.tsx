import { AlertCircle, Volume2, Ear, ShieldOff } from "lucide-react";

const problems = [
  { 
    icon: Volume2, 
    title: "ECHO & REVERBERATION", 
    desc: "Sound bouncing off hard surfaces creates muddy, unclear audio that ruins the experience of your expensive gear.",
    tag: "DISTORTION"
  },
  { 
    icon: Ear, 
    title: "SPEECH CLARITY", 
    desc: "Conversations and presentations become fatiguing and difficult to follow in acoustically untreated rooms.",
    tag: "FATIGUE"
  },
  { 
    icon: ShieldOff, 
    title: "SOUND LEAKAGE", 
    desc: "Confidentiality is lost and focus is disrupted when noise bleeds between rooms or from outside.",
    tag: "PRIVACY"
  },
];

const ProblemSection = () => (
  <section className="py-10 lg:py-20 relative overflow-hidden bg-[#050505]">
    {/* Minimal static background accents */}
    <div className="absolute top-0 right-0 w-px h-full bg-white/[0.03] -z-10" />
    <div className="absolute top-0 left-0 w-px h-full bg-white/[0.03] -z-10" />

    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <div className="max-w-4xl mb-24 text-left">
          <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">THE INVISIBLE BARRIER</span>
        <h2 className="font-display text-[10vw] sm:text-5xl md:text-6xl lg:text-[5rem] font-bold mb-8 leading-[1.05] tracking-tighter">
          Spaces built for <br /> 
          <span className="text-white/20">eyes, </span> 
          not for <span className="text-primary italic">ears.</span>
        </h2>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-light">
          Echo, noise bleed, and muddy audio aren't just annoyances — they're design failures that impact health, productivity, and privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
        {problems.map((p) => (
          <div
            key={p.title}
            className="group relative p-12 border-r border-b lg:border-b-0 border-white/10 transition-colors duration-500 hover:bg-white/[0.01]"
          >
            {/* Top Indicator Line */}
            <div className="absolute top-0 left-0 w-12 h-px bg-primary/20 group-hover:bg-primary transition-colors" />

            <div className="flex flex-col h-full uppercase">
              <div className="flex items-center justify-between mb-12">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <p.icon className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-white/20 group-hover:text-primary/60 transition-colors">
                  {p.tag}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold mb-6 tracking-wide group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              
              <p className="text-muted-foreground lowercase leading-relaxed font-light text-sm mb-10 group-hover:text-white/80 transition-colors">
                {p.desc}
              </p>

              <div className="mt-auto flex items-center gap-2">
                <div className="h-[1px] w-4 bg-white/20 group-hover:w-8 group-hover:bg-primary transition-all underline-offset-4" />
                <span className="text-[9px] tracking-widest font-black text-white/20 group-hover:text-primary">ACT NOW</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Section Divider */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </section>
);

export default ProblemSection;
