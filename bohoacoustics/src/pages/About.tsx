import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, ShieldCheck } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-[#050505]">
    <Navbar />
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">OUR STORY</p>
          <h1 className="font-display text-4xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tighter mb-8">
            The Science Of <br />
            <span className="text-white/20 italic font-light">Sound & Space</span>
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            Boho Acoustics was founded on a simple principle: **Acoustics is not an add-on. It's a fundamental necessity for human performance.**
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start border-t border-white/10 pt-20">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-[10px] tracking-widest font-black text-primary uppercase">OUR PHILOSOPHY</h2>
              <blockquote className="text-3xl lg:text-4xl font-display font-medium tracking-tight text-white leading-tight">
                "We calculate, we measure, <span className="text-primary italic">then we treat.</span> Guesswork has no place in acoustic engineering."
              </blockquote>
              <div className="space-y-6 text-muted-foreground font-light leading-relaxed max-w-2xl">
                <p>
                  Most people don't think about acoustics until something sounds wrong. We believe acoustic design should be integral to every space from day one — not an afterthought.
                </p>
                <p>
                  Founded by a professional who transitioned from finance to acoustics, Boho Acoustics brings analytical rigour and scientific methodology to a field often driven by artistic intuition. We measure, calculate, and validate — because your space deserves predictable performance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
              <div className="space-y-4 group">
                <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <Target className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white">Our Vision</h3>
                <p className="text-sm font-light text-white/40 leading-relaxed">
                  To become India's most trusted acoustic solution brand — known for scientific excellence and design-forward thinking.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <ShieldCheck className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white">Our Promise</h3>
                <p className="text-sm font-light text-white/40 leading-relaxed">
                  Predictable acoustic performance. Every project. Every time. Measured, verified, and guaranteed.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12 lg:sticky lg:top-40">
            <div className="border border-white/10 p-10 space-y-8 bg-white/[0.01]">
              <h4 className="text-[10px] tracking-widest font-black text-primary uppercase">TECHNICAL STATS</h4>
              <div className="space-y-6">
                <div>
                  <span className="text-3xl font-display font-black text-white block">100%</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest">Performance Guarantee</span>
                </div>
                <div>
                  <span className="text-3xl font-display font-black text-white block">40%</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest">Avg. Productivity Increase</span>
                </div>
                <div>
                  <span className="text-3xl font-display font-black text-white block">PAN-INDIA</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest">Service Delivery Network</span>
                </div>
              </div>
            </div>

            <Link to="/consultation" className="block group">
              <div className="bg-primary p-8 transition-all hover:bg-primary/90 flex items-center justify-between">
                <span className="font-black text-sm tracking-widest uppercase text-primary-foreground">CONSULT NOW</span>
                <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
