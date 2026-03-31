import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-theatre.jpg";
import officeImg from "@/assets/office-acoustics.jpg";
import auditoriumImg from "@/assets/auditorium-acoustics.jpg";
import residentialImg from "@/assets/residential-acoustics.jpg";

const solutions = [
  {
    title: "Home Theatre Acoustics",
    emoji: "🎬",
    img: heroImg,
    problems: ["Muddy dialogue", "Uneven bass response", "Sound reflections ruining immersion"],
    solutions: ["Custom absorption & diffusion panels", "Bass trap positioning", "Surround sound calibration"],
    improvement: "Achieve reference-level cinema audio in your home",
  },
  {
    title: "Office Acoustics",
    emoji: "🏢",
    img: officeImg,
    problems: ["Distracting noise", "Poor conference call quality", "Lack of speech privacy"],
    solutions: ["Ceiling baffles & desk dividers", "Meeting room isolation", "Open-plan acoustic zoning"],
    improvement: "Boost productivity with 40% noise reduction",
  },
  {
    title: "Auditorium Acoustics",
    emoji: "🎭",
    img: auditoriumImg,
    problems: ["Uneven sound distribution", "Feedback issues", "Poor clarity in back rows"],
    solutions: ["Reflector panel design", "Stage acoustic treatment", "Audience area optimization"],
    improvement: "Crystal-clear audio for every seat in the house",
  },
  {
    title: "Residential Comfort",
    emoji: "🏠",
    img: residentialImg,
    problems: ["Street noise intrusion", "Room-to-room sound transfer", "Echoing living spaces"],
    solutions: ["Soundproofing walls & windows", "Aesthetic acoustic panels", "Floor-ceiling isolation"],
    improvement: "Peaceful, quiet living in any environment",
  },
];

const Solutions = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionReveal>
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Solutions by Space</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-center mb-6">
            Acoustic Solutions for <span className="gradient-gold-text">Every Space</span>
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-20">
            Each space has unique acoustic challenges. We design custom solutions that deliver measurable results.
          </p>
        </SectionReveal>

        <div className="space-y-16">
          {solutions.map((s, i) => (
            <SectionReveal key={s.title}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                <div className={`rounded-xl overflow-hidden aspect-[4/3] ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                </div>
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <h2 className="font-display text-3xl font-bold mb-6">{s.emoji} {s.title}</h2>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs text-destructive/80 font-medium uppercase tracking-wider mb-2">Problems</p>
                      <ul className="space-y-1">
                        {s.problems.map((p) => (
                          <li key={p} className="text-muted-foreground text-sm">• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">Our Solutions</p>
                      <ul className="space-y-1">
                        {s.solutions.map((sol) => (
                          <li key={sol} className="text-muted-foreground text-sm">✓ {sol}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="glass-card rounded-lg p-4 inline-block">
                    <p className="text-sm font-medium gradient-gold-text">{s.improvement}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="text-center mt-20">
            <Link to="/consultation">
              <Button size="lg" className="gradient-gold text-primary-foreground font-semibold px-10">
                Get Custom Acoustic Plan <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
    <Footer />
  </div>
);

export default Solutions;
