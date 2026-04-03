import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { CASE_STUDIES } from "@/content/caseStudies";

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Acoustic Case Studies In India (2026 Expert Projects) | Boho Acoustics</title>
        <meta
          name="description"
          content="Explore real acoustic case studies from Mumbai, Pune, Bangalore, Chennai, and Hyderabad covering problem-solution-result outcomes."
        />
        <link rel="canonical" href="https://bohoacoustic.com/case-studies" />
      </Helmet>

      <section className="pt-32 pb-24 lg:pt-44 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-5">CASE STUDIES</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-7">
            Real Acoustic Outcomes Across
            <span className="text-primary italic font-light"> Indian Cities</span>
          </h1>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-4xl">
            These project summaries follow a clear framework: problem, solution, and measurable result. They are designed to help clients understand
            what successful acoustic intervention looks like in real-world India projects.
          </p>

          <div className="space-y-8 mt-12">
            {CASE_STUDIES.map((study) => (
              <article key={study.slug} className="border border-white/10 bg-black p-6 lg:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/5 pb-4">
                  <h2 className="font-display text-2xl lg:text-3xl font-black tracking-tight uppercase">{study.title}</h2>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{study.city}, {study.state}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="border border-white/10 bg-white/[0.02] p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Problem</p>
                    <p className="text-white/75 leading-relaxed text-sm">{study.problem}</p>
                  </div>
                  <div className="border border-white/10 bg-white/[0.02] p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Solution</p>
                    <p className="text-white/75 leading-relaxed text-sm">{study.solution}</p>
                  </div>
                  <div className="border border-white/10 bg-white/[0.02] p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Result</p>
                    <p className="text-white/75 leading-relaxed text-sm">{study.result}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div className="border border-white/10 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">Before</p>
                    <ul className="space-y-2">
                      {study.before.map((line) => (
                        <li key={line} className="text-white/70 text-sm leading-relaxed">- {line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-primary/25 bg-primary/5 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-3">After</p>
                    <ul className="space-y-2">
                      {study.after.map((line) => (
                        <li key={line} className="text-white/80 text-sm leading-relaxed flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-12 border border-white/10 bg-black p-7 lg:p-10">
            <div className="flex items-center gap-3 text-primary mb-4">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight">Use Case Studies To Plan Better</h3>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Case studies help you benchmark expectations, validate delivery capability, and understand where your project fits in terms of scope,
              timeline, and treatment depth.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                Services <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/consultation" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-4 py-3 text-xs uppercase tracking-widest font-black hover:opacity-90 transition-opacity">
                Book Consultation <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/resources" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                Resources <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
