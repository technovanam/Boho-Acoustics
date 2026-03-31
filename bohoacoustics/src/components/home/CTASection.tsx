import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

const CTASection = () => (
  <section className="py-10 lg:py-20 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
    {/* Minimal static background accents */}
    <div className="absolute top-0 right-[20%] w-px h-full bg-white/[0.03] -z-0" />
    <div className="absolute top-0 left-[20%] w-px h-full bg-white/[0.03] -z-0" />

    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <div className="max-w-6xl mx-auto border border-white/10 p-12 lg:p-24 relative group bg-black/40">
        {/* Accent Markers (Sharp) */}
        <div className="absolute top-0 left-0 w-16 h-1 bg-primary" />
        <div className="absolute top-0 left-0 w-1 h-16 bg-primary" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8">
            <div>
              <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4">NEXT STEPS</p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter uppercase">
                Predictable <br />
                <span className="text-white/20">Acoustic</span> <br />
                <span className="text-primary">Performance.</span>
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-md">
              No guesswork. No jargon. Get a custom acoustic plan designed specifically for your space. Let us measure your success.
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full lg:max-w-sm ml-auto">
            <Link to="/consultation" className="w-full">
              <Button 
                size="lg" 
                className="w-full h-20 gradient-gold text-primary-foreground font-black tracking-widest text-sm uppercase rounded-none hover:opacity-90 transition-all hover:translate-x-2"
              >
                REQUEST DESIGN PLAN
                <ArrowRight className="ml-4 w-5 h-5" />
              </Button>
            </Link>
            
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full h-20 border-white/10 text-white font-bold tracking-widest text-xs uppercase rounded-none hover:bg-white/5 hover:text-white transition-all hover:translate-x-2"
              >
                WHATSAPP EXPERT
                <MessageSquare className="ml-4 w-4 h-4 opacity-40 group-hover:opacity-100" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Section Footer Line */}
    <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
  </section>
);

export default CTASection;
