import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, FileText, Lightbulb, PenSquare, BarChart3 } from "lucide-react";

const Resources = () => {
  const guestPostTopics = [
    "How Acoustic Treatment Improves Office Productivity In India",
    "Architectural Acoustics For Premium Residential Projects",
    "Soundproofing Myths In Indian Apartments",
    "Meeting Room Speech Clarity: Technical Checklist",
    "Home Theatre Acoustics Planning For Urban Homes",
  ];

  const caseStudyIdeas = [
    "Mumbai Premium Home Theatre Optimization",
    "Pune Office Noise Zoning And Speech Privacy",
    "Bangalore Studio Monitoring Correction",
    "Chennai Residential Noise Reduction Retrofit",
    "Hyderabad Multi-Team Workspace Acoustic Upgrade",
  ];

  const insightTracks = [
    "Acoustic ROI benchmarks for commercial projects",
    "Material performance comparisons in Indian conditions",
    "Urban noise control strategy playbooks",
    "Pre-construction acoustic planning guides",
    "Multi-city rollout standards for enterprise teams",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Acoustic Resources, Guest Posts & Industry Insights | Boho Acoustics</title>
        <meta
          name="description"
          content="Explore guest post topics, case study resources, and acoustic industry insights from Boho Acoustics for projects across India."
        />
        <link rel="canonical" href="https://bohoacoustic.com/resources" />
      </Helmet>

      <section className="pt-32 pb-24 lg:pt-44 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-5">RESOURCES HUB</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-7">
            Growth Resources For
            <span className="text-primary italic font-light"> Acoustic Projects</span>
          </h1>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-4xl">
            This page supports collaboration, backlinks, and authority building for Boho Acoustics through curated guest post themes,
            case study formats, and practical industry insight tracks. Use it as a knowledge base for partnerships, editorial outreach,
            and client education.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            <article className="border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <PenSquare className="w-5 h-5" />
                <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Guest Post Topics</h2>
              </div>
              <ul className="space-y-3">
                {guestPostTopics.map((topic) => (
                  <li key={topic} className="text-white/75 text-sm leading-relaxed border-l border-primary/40 pl-3">
                    {topic}
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <FileText className="w-5 h-5" />
                <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Case Study Tracks</h2>
              </div>
              <ul className="space-y-3">
                {caseStudyIdeas.map((topic) => (
                  <li key={topic} className="text-white/75 text-sm leading-relaxed border-l border-primary/40 pl-3">
                    {topic}
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <BarChart3 className="w-5 h-5" />
                <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Industry Insights</h2>
              </div>
              <ul className="space-y-3">
                {insightTracks.map((topic) => (
                  <li key={topic} className="text-white/75 text-sm leading-relaxed border-l border-primary/40 pl-3">
                    {topic}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <section className="mt-14 border border-white/10 bg-black p-7 lg:p-10">
            <div className="flex items-center gap-3 text-primary mb-4">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight">How To Use This Resource Page</h3>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              Use these topics to pitch editorial collaborations, build industry backlinks, and publish authority content around high-value search intents
              like acoustic consultant Mumbai, soundproofing services India, and home theatre acoustics Maharashtra.
            </p>
            <p className="text-white/70 leading-relaxed">
              Every article or case study should point readers to relevant services, consultation, and supporting blog content to create a strong internal
              linking graph and improved conversion flow.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                Services <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/consultation" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-4 py-3 text-xs uppercase tracking-widest font-black hover:opacity-90 transition-opacity">
                Consultation <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/blog" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                Blog <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/case-studies" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                Case Studies <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Resources;
