import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Pencil, Package, Hammer, ArrowRight } from "lucide-react";

const services = [
  {
    icon: ClipboardCheck,
    title: "ACOUSTIC CONSULTING",
    solves: "Unidentified sound problems in your space",
    forWho: "Anyone planning a new build or renovation",
    outcome: "Complete acoustic assessment with actionable recommendations",
    number: "01"
  },
  {
    icon: Pencil,
    title: "ACOUSTIC DESIGN",
    solves: "Lack of professional acoustic planning",
    forWho: "Architects, designers, and homeowners",
    outcome: "Custom acoustic blueprints that blend with your interior design",
    number: "02"
  },
  {
    icon: Package,
    title: "MATERIAL SUPPLY",
    solves: "Difficulty sourcing quality acoustic materials",
    forWho: "Contractors, designers, and DIY enthusiasts",
    outcome: "Premium, certified acoustic materials delivered to your site",
    number: "03"
  },
  {
    icon: Hammer,
    title: "EXECUTION & INSTALL",
    solves: "Improper acoustic treatment installation",
    forWho: "Anyone who needs professional-grade results",
    outcome: "Flawless installation with measured performance verification",
    number: "04"
  },
];

const Services = () => (
  <div className="min-h-screen bg-[#050505]">
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">OUR SERVICES</p>
          <h1 className="font-display text-[10vw] sm:text-5xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter mb-8">
            Engineering <br />
            <span className="text-white/20 italic font-light">The Perfect Sound</span>
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            From initial consultation to final performance measurements — we provide the end-to-end scientific framework for flawless acoustics.
          </p>
        </div>

        <div className="border-t border-white/10">
          {services.map((s) => (
            <div 
              key={s.title} 
              className="group relative border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.01]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] p-10 lg:p-16 gap-12 lg:gap-20 items-start">
                
                {/* Number & Icon */}
                <div className="space-y-6">
                  <span className="font-display text-4xl font-black text-white/10 group-hover:text-primary/40 transition-colors block leading-none">
                    {s.number}
                  </span>
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                    <s.icon className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* Main Heading */}
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors uppercase">
                    {s.title}
                  </h2>
                  <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed">
                    {s.outcome}
                  </p>
                </div>

                {/* Technical Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                  <div>
                    <span className="text-[10px] tracking-widest font-black text-primary/60 block mb-2 uppercase">PROBLEMS SOLVED</span>
                    <p className="text-sm font-light text-white/60 lowercase">{s.solves}</p>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest font-black text-primary/60 block mb-2 uppercase">OPTIMIZED FOR</span>
                    <p className="text-sm font-light text-white/60 lowercase">{s.forWho}</p>
                  </div>
                </div>

                {/* Absolute Top Marker */}
                <div className="absolute top-0 left-0 w-12 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 border border-white/10 p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px]" />
          <div className="mb-8 md:mb-0">
            <h3 className="font-display text-[8vw] sm:text-5xl font-black tracking-tighter uppercase mb-4 leading-[1.05]">
              Ready to begin <br />
              <span className="text-primary italic">Treatment?</span>
            </h3>
            <p className="text-white/40 text-sm max-w-sm">
              Connect with our lead engineer for a no-obligation technical diagnostic of your space.
            </p>
          </div>
          <Link to="/consultation">
            <Button size="lg" className="h-20 px-12 gradient-gold text-primary-foreground font-black text-sm tracking-widest uppercase rounded-none hover:translate-x-2 transition-all">
              BOOK CONSULTATION <ArrowRight className="ml-4 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Services;
