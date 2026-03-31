import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const CTASection = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <SectionReveal>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-6">
            Ready for <span className="gradient-gold-text">Predictable Acoustic Performance</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Get a custom acoustic plan designed specifically for your space. No obligation, no jargon — just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation">
              <Button size="lg" className="gradient-gold text-primary-foreground font-semibold px-10 text-base glow-gold hover:opacity-90 transition-opacity">
                Get Custom Acoustic Plan
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary px-10 text-base">
                Talk to Expert on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
);

export default CTASection;
