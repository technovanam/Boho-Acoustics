import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, ShieldCheck } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-[#050505]">
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">OUR STORY</p>
          <h1 className="font-display text-[10vw] sm:text-5xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter mb-8">
            The Science Of <br />
            <span className="text-primary italic font-light">Sound & Space</span>
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            Boho Acoustics was founded on a simple principle: <strong>Acoustics is not an add-on. It's a fundamental necessity for human performance.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[1fr_400px] gap-12 xl:gap-20 items-start border-t border-white/10 pt-20">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-[10px] tracking-widest font-black text-primary uppercase">OUR PHILOSOPHY</h2>
              <blockquote className="text-[7vw] sm:text-4xl font-display font-medium tracking-tight text-white leading-[1.1]">
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
                <div className="w-8 h-8 border border-primary lg:border-white/10 flex items-center justify-center lg:group-hover:border-primary transition-colors">
                  <Target className="w-4 h-4 text-primary lg:text-white/30 lg:group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white">Our Philosophy</h3>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  Noise affects how we think, feel, and perform. Every Boho design balances silence and style, creating spaces where people focus, relax, and thrive.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="w-8 h-8 border border-primary lg:border-white/10 flex items-center justify-center lg:group-hover:border-primary transition-colors">
                  <ShieldCheck className="w-4 h-4 text-primary lg:text-white/30 lg:group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white">Our Vision</h3>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  To redefine interior comfort by making acoustics an essential part of modern design — helping people live, work, and create in spaces that feel as good as they sound.
                </p>
              </div>
            </div>

            <div className="space-y-16 pt-16 border-t border-white/5">
              <h2 className="text-[10px] tracking-widest font-black text-primary uppercase">FOUNDERS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
                <div className="space-y-8">
                  <div className="aspect-[4/5] bg-white/[0.03] border border-white/5 relative group overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                    <picture>
                      <source srcSet="/Founder-1.webp" type="image/webp" />
                      <img
                        src="/Founder-1.jpeg"
                        alt="Aadipt Kedia"
                        width={640}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-primary/15 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white mb-2">Aadipt Kedia</h3>
                    <p className="text-primary text-[10px] font-black tracking-widest uppercase mb-6">Founder</p>
                    <p className="text-sm font-light text-white/65 leading-relaxed">
                      The creative spark behind Boho Acoustics, Adipta brings a bold eye for presentation and a constant drive to learn, refine, and reimagine what a space can feel like. He pushes boundaries with fresh ideas and purposeful execution, turning every project into a memorable experience.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="aspect-[4/5] bg-white/[0.03] border border-white/5 relative group overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                    <picture>
                      <source srcSet="/Founder-2.webp" type="image/webp" />
                      <img
                        src="/Founder-2.jpeg"
                        alt="Dissha K Kedia"
                        width={640}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-primary/15 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white mb-2">Dissha K Kedia</h3>
                    <p className="text-primary text-[10px] font-black tracking-widest uppercase mb-6">Founder</p>
                    <p className="text-sm font-light text-white/65 leading-relaxed">
                      The heartbeat of Boho Acoustics, Dissha is focused on transforming transactions into experiences and products into stories. Guided by innovation and a relentless commitment to customer delight, she brings warmth, clarity, and intention to every interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 lg:sticky lg:top-40">
            <div className="border border-white/10 p-7 sm:p-10 space-y-8 bg-white/[0.01]">
              <h4 className="text-[10px] tracking-widest font-black text-primary uppercase">TECHNICAL STATS</h4>
              <div className="space-y-6">
                <div>
                  <span className="text-3xl font-display font-black text-white block">100%</span>
                  <span className="text-[9px] text-white/50 uppercase tracking-widest">Performance Guarantee</span>
                </div>
                <div>
                  <span className="text-3xl font-display font-black text-white block">40%</span>
                  <span className="text-[9px] text-white/50 uppercase tracking-widest">Avg. Productivity Increase</span>
                </div>
                <div>
                  <span className="text-3xl font-display font-black text-white block">PAN-INDIA</span>
                  <span className="text-[9px] text-white/50 uppercase tracking-widest">Service Delivery Network</span>
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
  </div>
);

export default About;
