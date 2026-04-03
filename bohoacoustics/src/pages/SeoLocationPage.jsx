import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, MapPin, Building2, IndianRupee } from "lucide-react";
import heroImage from "@/assets/office-acoustics.jpg";

const SITE_URL = "https://bohoacoustic.com";

const regionCopy = {
  Maharashtra:
    "Maharashtra projects demand a balance between compact urban floor plans, mixed-use neighborhoods, and premium interior expectations. Our planning is tuned for these constraints.",
  "South India":
    "South Indian projects often combine modern open layouts with hard finishes and high AV usage, which requires a precise acoustic strategy rather than generic panel placement.",
  "North India":
    "North Indian projects often include mixed commercial-residential clusters where speech privacy and noise isolation both need deliberate acoustic zoning.",
  "West India":
    "West India projects commonly involve high-rise and premium mixed-use development where predictable acoustic outcomes are essential for long-term comfort.",
  "East India":
    "East India projects frequently require retrofit-friendly treatment plans that improve usability without interrupting ongoing operations.",
  "Central India":
    "Central India projects are increasingly adopting performance-led interiors, where acoustics must support both comfort and functional clarity.",
  "Pan India":
    "Pan-India service delivery needs repeatable technical standards so projects in multiple cities maintain the same quality outcomes.",
};

const getServiceAngle = (service) => {
  const key = service.toLowerCase();
  if (key.includes("soundproof")) {
    return {
      why: "For soundproofing projects, we identify leak paths first, then design boundary upgrades to reduce transfer without overbuilding.",
      benefits: "You get quieter interiors, better privacy, and lower fatigue from persistent external and internal noise.",
    };
  }
  if (key.includes("home theatre")) {
    return {
      why: "For home theatre acoustics, we tune room behavior for clarity, imaging, bass control, and immersive comfort.",
      benefits: "You get cinematic playback that feels balanced across seats, with clear dialogue and controlled low-end energy.",
    };
  }
  return {
    why: "For acoustic consulting, we map room intent, material behavior, and usage constraints before recommending any treatment.",
    benefits: "You get a measurable, phased roadmap that aligns technical goals with budget and timeline realities.",
  };
};

const getProjectHighlights = (city, service, nearbyAreas) => {
  const serviceKey = service.toLowerCase();

  if (serviceKey.includes("home theatre")) {
    return [
      `High-immersion theatre planning in ${city} with reflection control, bass management, and AV alignment for consistent seating performance.`,
      `Premium media room upgrades in ${nearbyAreas[0]} and ${nearbyAreas[1]} where aesthetics and technical outcomes were both non-negotiable.`,
      `Post-install tuning and optimization to maintain long-session listening comfort without sacrificing impact.`,
    ];
  }

  if (serviceKey.includes("soundproof")) {
    return [
      `Leak-path diagnostics and isolation correction in ${city} properties affected by traffic, corridor, and adjacent occupancy noise.`,
      `Boundary reinforcement programs in ${nearbyAreas[2]} and ${nearbyAreas[3]} to improve room privacy and reduce complaint cycles.`,
      `Phased deployment strategy to deliver measurable quieting without full-site disruption.`,
    ];
  }

  return [
    `Consulting-led design support in ${city} for homes, offices, and media spaces where predictable acoustic outcomes were required.`,
    `Pre-construction acoustic planning in ${nearbyAreas[1]} and ${nearbyAreas[4]} to avoid expensive retrofit corrections later.`,
    `Execution QA and validation to ensure real-world performance matched project intent.`,
  ];
};

const SeoLocationPage = ({ city, state, service, keyword, nearbyAreas = [], region = "Pan India" }) => {
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const serviceSlug = service.toLowerCase().replace(/\s+/g, "-");
  const canonicalPath = city.toLowerCase() === "india" ? "/acoustic-consultant-india" : `/${serviceSlug}-${citySlug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const title = `Best ${service} in ${city} (2026 Expert Guide) | Boho Acoustics`;
  const description = `Looking for ${service.toLowerCase()} in ${city}? Get measurable acoustic performance, faster execution, and expert guidance from Boho Acoustics. Book a consultation today.`;

  const nearby = nearbyAreas.length > 0 ? nearbyAreas : ["Major business districts", "Residential zones", "Commercial corridors"];
  const serviceAngle = getServiceAngle(service);
  const highlights = getProjectHighlights(city, service, nearby);

  const faqItems = [
    {
      question: `What is the cost of ${service.toLowerCase()} in ${city}?`,
      answer:
        `The cost depends on room size, target performance, material scope, and implementation complexity. For most ${city} projects, we recommend a phased plan so you can prioritize high-impact upgrades first and scale based on budget.`,
    },
    {
      question: "Do you provide services across India?",
      answer:
        "Yes. We deliver consultation, planning, and execution support across India, with strong on-ground capability in Maharashtra and major metros like Mumbai, Pune, Bangalore, Chennai, Hyderabad, and Delhi.",
    },
    {
      question: "How long does acoustic treatment take?",
      answer:
        "Timelines range from a few days for corrective interventions to a few weeks for complete treatment and calibration. Duration depends on project size, site readiness, and finish integration requirements.",
    },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Boho Acoustics",
    url: SITE_URL,
    email: "hello@bohoacoustic.com",
    telephone: "+91-8433900692",
    areaServed: city.toLowerCase() === "india" ? "IN" : [city, state, "India"],
    image: `${SITE_URL}/logo.png`,
    description,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service,
    provider: {
      "@type": "Organization",
      name: "Boho Acoustics",
      url: SITE_URL,
    },
    areaServed: city.toLowerCase() === "india" ? "India" : `${city}, ${state}, India`,
    description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.png`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#050505] text-white">
        <section className="pt-32 pb-24 lg:pt-44 lg:pb-28 border-b border-white/10">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-5">LOCAL SEO GUIDE</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight max-w-5xl mb-8">
              {service} In {city}
            </h1>
            <p className="text-base lg:text-lg text-white/75 leading-relaxed max-w-4xl">
              If you are searching for <strong>{keyword || `${service.toLowerCase()} ${city.toLowerCase()}`}</strong>, this guide helps you evaluate options with a performance-first lens. Boho Acoustics delivers data-backed design and execution support for homes, offices, studios, and commercial spaces in {city}, {state}, and across India.
            </p>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-center border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold">Why this page ranks for local intent</p>
                <p className="text-white/70 leading-relaxed">
                  We combine city-level service relevance, technical project context, and conversion-oriented guidance so users searching for {keyword || `${service.toLowerCase()} ${city.toLowerCase()}`} can move from confusion to action.
                </p>
                <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-wider font-bold text-white/70">
                  <span className="border border-white/15 px-3 py-2">acoustic consultant Mumbai</span>
                  <span className="border border-white/15 px-3 py-2">soundproofing services India</span>
                  <span className="border border-white/15 px-3 py-2">home theatre acoustics Maharashtra</span>
                </div>
              </div>
              <img src={heroImage} alt={`${service} project in ${city}`} width={1280} height={800} loading="lazy" decoding="async" className="w-full h-64 lg:h-72 object-cover border border-white/10" />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl space-y-16">
            <section>
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-6 tracking-tight">Why Choose Us In {city}</h2>
              <p className="text-white/70 leading-relaxed mb-5">
                {serviceAngle.why} Our method starts with room intent, user behavior, geometry, and constraints, then converts those variables into a practical implementation roadmap.
              </p>
              <p className="text-white/70 leading-relaxed mb-5">
                {regionCopy[region] || regionCopy["Pan India"]} This is why clients across {city} choose a consulting-led approach instead of trial-and-error purchasing.
              </p>
              <p className="text-white/70 leading-relaxed">
                We also support distributed teams and builders with India-wide delivery capability, so your quality standards can remain consistent across multiple locations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-6 tracking-tight">Our Services In {city}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  `${service} strategy and site diagnostics`,
                  "Acoustic treatment design and placement planning",
                  "Soundproofing and leakage-path correction",
                  "Speech intelligibility and reverberation control",
                  "Execution supervision and quality checks",
                  "Post-install performance validation",
                ].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-primary shrink-0" />
                    <p className="text-white/80 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mt-6">
                Nearby coverage includes {nearby.slice(0, 6).join(", ")}. We also work across India for clients who need standardized acoustic outcomes beyond a single city.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-6 tracking-tight">Projects Completed In {city}</h2>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <article key={item} className="border-l border-primary/40 pl-4">
                    <p className="text-white/75 leading-relaxed">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-6 tracking-tight">Benefits Of Acoustic Treatment</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                {serviceAngle.benefits} Beyond comfort, acoustic quality impacts productivity, communication confidence, media immersion, and user satisfaction.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                In residential projects, treatment improves sleep quality, dialogue clarity, and day-to-day livability. In offices and commercial spaces, it reduces fatigue and supports more effective collaboration.
              </p>
              <p className="text-white/70 leading-relaxed">
                Early-stage acoustic planning usually reduces rework costs because decisions are made before expensive finishes lock in technical limitations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-6 tracking-tight">Cost Of {service} In {city}</h2>
              <div className="border border-white/10 bg-white/[0.02] p-6 lg:p-8">
                <p className="text-white/75 leading-relaxed mb-4">
                  Cost depends on room size, target acoustic performance, current construction quality, treatment depth, and execution complexity. Premium outcomes need tighter control, but phased planning can keep investment efficient.
                </p>
                <p className="text-white/75 leading-relaxed mb-4">
                  We typically recommend a staged rollout: critical corrections first, performance upgrades second, aesthetic and refinement layers third.
                </p>
                <p className="text-white/75 leading-relaxed">
                  This approach gives clients in {city} flexibility while maintaining technical integrity and measurable improvement.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 border border-primary/30 text-primary px-3 py-2 text-xs uppercase tracking-wider font-bold">
                  <IndianRupee className="w-3 h-3" />
                  Get a custom estimate via consultation
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-6 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((faq) => (
                  <article key={faq.question} className="border border-white/10 bg-white/[0.02] p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border border-white/10 bg-black p-6 lg:p-8">
              <h2 className="font-display text-3xl lg:text-5xl font-black mb-4 tracking-tight">Start Your {service} Project In {city}</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Whether you need immediate corrective treatment or a full acoustic roadmap, our team can help you move quickly with technical clarity and execution confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/services" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  Services
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/consultation" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-4 py-3 text-xs uppercase tracking-widest font-black hover:opacity-90 transition-opacity">
                  Book Consultation
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/blog" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  Blog
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/solutions" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  Solutions
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/about" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  About
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-white/50">
                <span className="inline-flex items-center gap-1 border border-white/10 px-2 py-1">
                  <MapPin className="w-3 h-3 text-primary" />
                  {city}, {state}
                </span>
                <span className="inline-flex items-center gap-1 border border-white/10 px-2 py-1">
                  <Building2 className="w-3 h-3 text-primary" />
                  Pan-India service delivery
                </span>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default SeoLocationPage;
