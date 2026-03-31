import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, AlertTriangle } from "lucide-react";
import heroImg from "@/assets/hero-theatre.jpg";
import officeImg from "@/assets/office-acoustics.jpg";
import auditoriumImg from "@/assets/auditorium-acoustics.jpg";
import residentialImg from "@/assets/residential-acoustics.jpg";

const solutions = [
  {
    title: "Home Theatre",
    img: heroImg,
    problems: ["Muddy dialogue", "Uneven bass response", "Sound reflections ruining immersion"],
    solutions: ["Custom absorption & diffusion panels", "Bass trap positioning", "Surround sound calibration"],
    improvement: "Achieve reference-level cinema audio in your home",
    tag: "CINEMATIC"
  },
  {
    title: "Office Spaces",
    img: officeImg,
    problems: ["Distracting noise", "Poor conference call quality", "Lack of speech privacy"],
    solutions: ["Ceiling baffles & desk dividers", "Meeting room isolation", "Open-plan acoustic zoning"],
    improvement: "Boost productivity with 40% noise reduction",
    tag: "EFFICIENCY"
  },
  {
    title: "Auditoriums",
    img: auditoriumImg,
    problems: ["Uneven sound distribution", "Feedback issues", "Poor clarity in back rows"],
    solutions: ["Reflector panel design", "Stage acoustic treatment", "Audience area optimization"],
    improvement: "Crystal-clear audio for every seat in the house",
    tag: "PRECISION"
  },
  {
    title: "Residential",
    img: residentialImg,
    problems: ["Street noise intrusion", "Room-to-room sound transfer", "Echoing living spaces"],
    solutions: ["Soundproofing walls & windows", "Aesthetic acoustic panels", "Floor-ceiling isolation"],
    improvement: "Peaceful, quiet living in any environment",
    tag: "COMFORT"
  },
];

const Solutions = () => (
  <div className="min-h-screen bg-[#050505]">
    <Navbar />
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">SOLUTIONS BY SPACE</p>
          <h1 className="font-display text-[10vw] sm:text-5xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter mb-8">
            Tailored <br />
            <span className="text-white/20 italic font-light">Acoustic Performance</span>
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            Every environment presents unique acoustic variables. We don't use templates — we engineer bespoke systems for measurable results.
          </p>
        </div>

        <div className="space-y-32">
          {solutions.map((s, i) => (
            <div key={s.title} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Image Section - Sharp */}
                <div className={`relative aspect-[16/10] overflow-hidden border border-white/10 ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-0 left-0 bg-primary/90 text-primary-foreground text-[10px] tracking-widest font-black px-4 py-2 uppercase">
                    {s.tag}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`space-y-10 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div>
                    <h2 className="font-display text-4xl lg:text-5xl font-black tracking-tight mb-4 uppercase">
                      {s.title}
                    </h2>
                    <div className="h-1 w-20 bg-primary" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-destructive/60 uppercase text-[9px] tracking-[0.2em] font-black">
                        <AlertTriangle className="w-3 h-3" />
                        Acoustic Challenges
                      </div>
                      <ul className="space-y-3">
                        {s.problems.map((p) => (
                          <li key={p} className="text-sm font-light text-white/40 flex items-start gap-3">
                            <span className="text-destructive/40 mt-1">•</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary uppercase text-[9px] tracking-[0.2em] font-black">
                        <Check className="w-3 h-3" />
                        Engineering Solutions
                      </div>
                      <ul className="space-y-3">
                        {s.solutions.map((sol) => (
                          <li key={sol} className="text-sm font-light text-white/70 flex items-start gap-3">
                            <span className="text-primary/60 mt-1">/</span> {sol}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border border-white/5 p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                    <p className="text-[10px] text-white/30 tracking-[0.2em] font-bold uppercase mb-2">Measured Outcome</p>
                    <p className="text-lg font-display font-medium text-white group-hover:text-primary transition-colors">
                      {s.improvement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 border-t border-white/10 pt-24 text-left flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="max-w-2xl">
            <h3 className="font-display text-[8vw] sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-[1.05]">
              Predictable <span className="text-primary">Performance</span> <br /> 
              Guaranteed.
            </h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-sm">
              Stop guessing and start measuring. Our engineers are ready to solve your space's unique acoustic variables.
            </p>
          </div>
          <Link to="/consultation">
            <Button size="lg" className="h-20 px-16 gradient-gold text-primary-foreground font-black text-sm tracking-widest uppercase rounded-none hover:translate-x-2 transition-all">
              START YOUR PROJECT <ArrowRight className="ml-4 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Solutions;
