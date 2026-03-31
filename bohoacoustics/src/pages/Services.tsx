import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Pencil, Package, Hammer, ArrowRight } from "lucide-react";

const services = [
  {
    icon: ClipboardCheck,
    title: "Acoustic Consulting",
    solves: "Unidentified sound problems in your space",
    forWho: "Anyone planning a new build or renovation",
    outcome: "Complete acoustic assessment with actionable recommendations",
  },
  {
    icon: Pencil,
    title: "Acoustic Design",
    solves: "Lack of professional acoustic planning",
    forWho: "Architects, designers, and homeowners",
    outcome: "Custom acoustic blueprints that blend with your interior design",
  },
  {
    icon: Package,
    title: "Material Supply",
    solves: "Difficulty sourcing quality acoustic materials",
    forWho: "Contractors, designers, and DIY enthusiasts",
    outcome: "Premium, certified acoustic materials delivered to your site",
  },
  {
    icon: Hammer,
    title: "Installation & Execution",
    solves: "Improper acoustic treatment installation",
    forWho: "Anyone who needs professional-grade results",
    outcome: "Flawless installation with measured performance verification",
  },
];

const Services = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionReveal>
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">What We Do</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-center mb-6">
            Our <span className="gradient-gold-text">Services</span>
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-20">
            From consultation to execution — we provide everything you need for perfect acoustics.
          </p>
        </SectionReveal>

        <div className="space-y-8">
          {services.map((s, i) => (
            <SectionReveal key={s.title} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">{s.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">What it solves</p>
                      <p className="text-muted-foreground text-sm">{s.solves}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">Who it's for</p>
                      <p className="text-muted-foreground text-sm">{s.forWho}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">Expected outcome</p>
                      <p className="text-muted-foreground text-sm">{s.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="text-center mt-16">
            <Link to="/consultation">
              <Button size="lg" className="gradient-gold text-primary-foreground font-semibold px-10">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
    <Footer />
  </div>
);

export default Services;
