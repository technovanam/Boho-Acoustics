import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Assets
import heroTheatre from "@/assets/hero-theatre.jpg";
import auditoriumImg from "@/assets/auditorium-acoustics.jpg";
import officeImg from "@/assets/office-acoustics.jpg";
import residentialImg from "@/assets/residential-acoustics.jpg";

const backgroundImages = [
  {
    src: heroTheatre,
    alt: "Premium home theatre with acoustic treatment",
    label: "Home Theatres",
  },
  {
    src: auditoriumImg,
    alt: "Professional auditorium acoustic solution",
    label: "Auditoriums",
  },
  {
    src: officeImg,
    alt: "Modern office with acoustic panels",
    label: "Corporate Spaces",
  },
  {
    src: residentialImg,
    alt: "Sleek living room with acoustic design",
    label: "Residential",
  },
];

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const marqueeStats = [
    "Home Theatre Calibration",
    "Office Noise Control",
    "Studio Acoustic Treatment",
    "Conference Room Clarity",
    "Residential Soundproofing",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slideshow — Animated Cross-Fade & Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1, transition: { duration: 2 } }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentBg].src}
              alt={backgroundImages[currentBg].alt}
              fetchPriority={currentBg === 0 ? "high" : "auto"}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays — Refined Vignette and Atmospheric Gradients */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)] opacity-30" />

        {/* Subtle Noise/Grain Overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none mix-blend-soft-light opacity-20" />
      </div>

      {/* Content — Centered with refined spacing */}
      <div className="relative z-10 h-full w-full max-w-7xl px-6 lg:px-12 pb-20 sm:pb-24 md:pb-20 flex flex-col items-center text-center pt-16 sm:pt-24 md:pt-40 lg:pt-44">

        {/* Label — Premium Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-4"
        >
          <motion.div
            key={`label-left-${currentBg}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-8 origin-right bg-gradient-to-r from-transparent to-[#d4af37]"
          />
          <div className="relative h-4 md:h-5 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={backgroundImages[currentBg].label}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-gold-text font-medium text-[10px] md:text-xs tracking-[0.5em] uppercase whitespace-nowrap"
              >
                {backgroundImages[currentBg].label}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.div
            key={`label-right-${currentBg}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-8 origin-left bg-gradient-to-l from-transparent to-[#d4af37]"
          />
        </motion.div>

        {/* Main headline — Elegant Serif Mix */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium leading-[1.08] mb-8 sm:mb-10
                     text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance max-w-5xl"
        >
          <span className="text-white font-light italic">Perfect</span> Sound, {" "}
          <span className="gradient-gold-text relative">
            Designed
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
              className="absolute -bottom-2 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"
            />
          </span>
          <br />
          <span className="text-white/90">for Your Space</span>
        </motion.h1>

        {/* Subtitle — Muted luxury body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#e5e5e5] text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light tracking-wide text-balance"
        >
          We design, supply & execute acoustic solutions — so you don't have to understand acoustics. We handle everything from diagnostics to final measurement.
        </motion.p>

        {/* CTA — Refined Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-10 sm:mb-14 w-full"
        >
          <Link to="/consultation" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto premium-gold-gradient shine-effect text-black font-semibold px-6 sm:px-10 py-5 sm:py-7 text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase rounded-none hover:opacity-90 transition-all duration-500 shadow-2xl"
            >
              Book Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/solutions" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white/80 hover:bg-white/5 hover:text-white font-medium px-6 sm:px-10 py-5 sm:py-7 text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.2em] normal-case sm:uppercase leading-relaxed text-center whitespace-normal rounded-none backdrop-blur-md transition-all duration-500"
            >
              Get a live acoustic test of your space
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Marquee Stats — Now outside the container for full-width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="absolute z-20 bottom-2 sm:bottom-6 md:bottom-0 left-0 right-0 w-full overflow-hidden pb-4"
      >
        <div className="marquee-track flex w-max items-center gap-6 md:gap-10 whitespace-nowrap px-4 will-change-transform">
          {[...marqueeStats, ...marqueeStats].map((item, i) => (
            <div key={`${item}-${i}`} className="flex flex-none items-center gap-6 md:gap-10 shrink-0">
              <p className="font-display text-base sm:text-lg md:text-3xl font-light text-white/90 tracking-wide whitespace-nowrap shrink-0">
                {item}
              </p>
              <span className="text-primary/70 text-xs sm:text-sm shrink-0">|</span>
            </div>
          ))}
        </div>
      </motion.div>


      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/3 bg-[#d4af37]"
          />
        </div>
      </motion.div> */}

      {/* Elegant bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </section>
  );
};

export default HeroSection;
