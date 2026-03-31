import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionReveal>
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">About Us</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-center mb-16">
            The Story Behind <span className="gradient-gold-text">Boho Acoustics</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="glass-card rounded-xl p-8 lg:p-12 mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">Our Philosophy</h2>
            <blockquote className="text-xl lg:text-2xl font-display italic text-primary/90 mb-6 border-l-2 border-primary/30 pl-6">
              "Acoustics is not an add-on. It's a necessity."
            </blockquote>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most people don't think about acoustics until something sounds wrong. We believe acoustic design should be integral to every space from day one — not an afterthought.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded by a professional who transitioned from finance to acoustics, Boho Acoustics brings analytical rigour and scientific methodology to a field often driven by guesswork. We measure, calculate, and validate — because your space deserves predictable performance.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glass-card rounded-xl p-8">
              <h3 className="font-display text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To become India's most trusted acoustic solution brand — known for scientific excellence and design-forward thinking.
              </p>
            </div>
            <div className="glass-card rounded-xl p-8">
              <h3 className="font-display text-xl font-bold mb-3">Our Promise</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Predictable acoustic performance. Every project. Every time. Measured, verified, and guaranteed.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="text-center">
            <Link to="/consultation">
              <Button size="lg" className="gradient-gold text-primary-foreground font-semibold px-10">
                Work With Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
