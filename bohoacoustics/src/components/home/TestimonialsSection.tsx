import SectionReveal from "@/components/SectionReveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kapoor",
    role: "Homeowner, Mumbai",
    text: "Boho Acoustics transformed our home theatre. The sound clarity is unbelievable — it's like being in a cinema but better.",
  },
  {
    name: "Priya Mehta",
    role: "Architect, Bangalore",
    text: "Their scientific approach to acoustics and beautiful design integration makes them our go-to partner for every premium project.",
  },
  {
    name: "Vikram Singh",
    role: "Office Manager, Delhi",
    text: "Our conference room echo problem is completely solved. Meetings are productive and clear now. Highly recommended.",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 lg:py-32 bg-card">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionReveal>
        <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Testimonials</p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-center mb-16">
          Trusted by <span className="gradient-gold-text">Clients</span> Across India
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <SectionReveal key={t.name} delay={i * 0.12}>
            <div className="glass-card rounded-xl p-8 h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
              <div className="mt-6 pt-4 border-t border-border/30">
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
