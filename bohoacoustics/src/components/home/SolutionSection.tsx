import SectionReveal from "@/components/SectionReveal";
import { ClipboardCheck, Pencil, Package, Hammer } from "lucide-react";

const steps = [
  { icon: ClipboardCheck, title: "Consult", desc: "We assess your space and understand your acoustic goals." },
  { icon: Pencil, title: "Design", desc: "Custom acoustic design backed by science and aesthetics." },
  { icon: Package, title: "Supply", desc: "Premium materials sourced for your specific requirements." },
  { icon: Hammer, title: "Execute", desc: "Professional installation with measurable results." },
];

const SolutionSection = () => (
  <section className="py-24 lg:py-32 bg-card relative">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionReveal>
        <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Our Process</p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-center mb-4">
          End-to-End <span className="gradient-gold-text">Acoustic Solutions</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          You don't need to understand acoustics. We handle everything — from problem identification to flawless execution.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <SectionReveal key={s.title} delay={i * 0.1}>
            <div className="relative p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all group text-center">
              <div className="text-primary/30 font-display text-6xl font-bold absolute top-4 right-4 group-hover:text-primary/10 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
