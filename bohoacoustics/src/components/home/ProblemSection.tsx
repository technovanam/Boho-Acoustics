import SectionReveal from "@/components/SectionReveal";
import { Volume2, Ear, ShieldOff } from "lucide-react";

const problems = [
  { icon: Volume2, title: "Echo & Reverberation", desc: "Sound bouncing off hard surfaces creating muddy, unclear audio in your space." },
  { icon: Ear, title: "Poor Speech Clarity", desc: "Conversations and presentations become difficult to follow in untreated rooms." },
  { icon: ShieldOff, title: "Sound Leakage", desc: "Noise escaping or entering your space, disrupting privacy and focus." },
];

const ProblemSection = () => (
  <section className="py-24 lg:py-32 relative noise-overlay">
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <SectionReveal>
        <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">The Problem</p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-center mb-4">
          Sound Issues Are <span className="gradient-gold-text">Invisible</span>, But Impactful
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Most spaces are designed for looks, not acoustics. The result? Echo, noise bleed, and frustrating audio quality.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <SectionReveal key={p.title} delay={i * 0.15}>
            <div className="glass-card rounded-xl p-8 hover:border-primary/30 transition-all duration-300 group h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
