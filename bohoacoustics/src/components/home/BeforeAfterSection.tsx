import SectionReveal from "@/components/SectionReveal";
import { motion } from "framer-motion";

const metrics = [
  { label: "Reverberation Time", before: "2.8s", after: "0.6s", improvement: "79%" },
  { label: "Speech Clarity (STI)", before: "0.35", after: "0.82", improvement: "134%" },
  { label: "Background Noise", before: "55 dB", after: "32 dB", improvement: "42%" },
];

const BeforeAfterSection = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionReveal>
        <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Measurable Impact</p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-center mb-4">
          Before & After: <span className="gradient-gold-text">The Science Speaks</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          We don't guess — we measure. Every project delivers quantified acoustic improvement.
        </p>
      </SectionReveal>

      <div className="max-w-3xl mx-auto space-y-6">
        {metrics.map((m, i) => (
          <SectionReveal key={m.label} delay={i * 0.1}>
            <div className="glass-card rounded-xl p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold mb-3">{m.label}</h3>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Before</p>
                      <p className="text-xl font-body font-semibold text-destructive/80">{m.before}</p>
                    </div>
                    <div className="text-muted-foreground">→</div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">After</p>
                      <p className="text-xl font-body font-semibold text-primary">{m.after}</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                >
                  <span className="gradient-gold-text font-display text-xl font-bold">↑{m.improvement}</span>
                </motion.div>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;
