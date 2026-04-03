import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kapoor",
    role: "HOMEOWNER, MUMBAI",
    text: "Boho Acoustics transformed our home theatre. The sound clarity is unbelievable — it's like being in a cinema but better.",
  },
  {
    name: "Priya Mehta",
    role: "ARCHITECT, BANGALORE",
    text: "Their scientific approach to acoustics and beautiful design integration makes them our go-to partner for every premium project.",
  },
  {
    name: "Vikram Singh",
    role: "OFFICE MANAGER, DELHI",
    text: "Our conference room echo problem is completely solved. Meetings are productive and clear now. Highly recommended.",
  },
];

const TestimonialsSection = () => (
  <section className="py-10 lg:py-20 bg-card border-t border-white/5 relative">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mb-24 text-left">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">TESTIMONIALS</p>
        <h2 className="font-display text-[10vw] sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter mb-6">
          Client <span className="text-primary italic font-light">Experiences</span>
        </h2>
        <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed max-w-xl">
          We pride ourselves on measurable satisfaction. Here is what leading architects and private homeowners have to say about our acoustic engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
        {testimonials.map((t) => (
          <div 
            key={t.name} 
            className="group relative p-12 border-r border-b lg:border-b-0 border-white/10 transition-colors duration-500 hover:bg-white/[0.01]"
          >
            {/* Minimal Indicator (Sharp) */}
            <div className="absolute top-0 left-0 w-12 h-px bg-primary/20 group-hover:bg-primary transition-colors" />
            
            <div className="flex flex-col h-full">
              <div className="flex gap-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-xl font-display font-light leading-relaxed mb-12 flex-1 text-white/80 transition-colors group-hover:text-white">
                "{t.text}"
              </blockquote>

              <div className="mt-auto flex flex-col space-y-4">
                <div className="h-[1px] w-8 bg-primary/40 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                <div>
                  <p className="font-display font-black text-lg tracking-tight group-hover:text-primary transition-colors">
                    {t.name}
                  </p>
                  <p className="text-white/45 text-[9px] tracking-[0.2em] font-bold uppercase transition-colors group-hover:text-white/70">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
