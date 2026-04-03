import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import WhatsAppContactChooser from "@/components/WhatsAppContactChooser";

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
              <h2 className="font-display text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tighter uppercase whitespace-nowrap">
                Predictable <br />
                <span className="text-primary">Acoustic</span> <br />
                <span className="text-primary">Performance.</span>
              </h2>
            </div>
            
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
              No guesswork. No jargon. Get a custom acoustic plan designed specifically for your space. Let us measure your success.
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full lg:max-w-sm ml-auto">
            <Link to="/consultation" className="w-full">
              <Button 
                size="lg" 
                className="w-full h-14 sm:h-16 px-6 sm:px-8 gradient-gold text-primary-foreground font-black tracking-[0.18em] text-[10px] sm:text-xs uppercase rounded-none hover:opacity-90 transition-all hover:translate-x-2"
              >
                REQUEST DESIGN PLAN
                <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </Link>
            
            <WhatsAppContactChooser
              triggerLabel="WHATSAPP EXPERT"
              triggerClassName="w-full h-full sm:h-16 px-6 sm:px-8 border-white/10 text-white font-bold tracking-[0.16em] text-[10px] sm:text-xs uppercase rounded-none hover:bg-white/5 hover:text-white transition-all hover:translate-x-2 [&>svg]:h-5 [&>svg]:w-5 lg:[&>svg]:h-6 lg:[&>svg]:w-6"
              iconClassName="h-10 w-10 scale-[1.12] lg:scale-[1.18]"
              icon
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>

    {/* Section Footer Line */}
    <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
  </section>
);

export default CTASection;
