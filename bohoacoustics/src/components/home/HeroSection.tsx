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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slideshow — Animated Cross-Fade & Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1.05, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1, transition: { duration: 2 } }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentBg].src}
              alt={backgroundImages[currentBg].alt}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays — Refined Vignette and Atmospheric Gradients */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] opacity-60" />

        {/* Subtle Noise/Grain Overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none mix-blend-soft-light opacity-20" />
      </div>

      {/* Content — Centered with refined spacing */}
      <div className="relative z-10 h-full w-full max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center pt-32">

        {/* Label — Premium Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <p className="gradient-gold-text font-medium text-[10px] md:text-xs tracking-[0.5em] uppercase">
            {backgroundImages[currentBg].label}
          </p>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </motion.div>

        {/* Main headline — Elegant Serif Mix */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium leading-[1.1] mb-10
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-balance max-w-5xl"
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
          className="text-[#cfcfcf] text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-12 leading-relaxed font-light tracking-wide text-balance"
        >
          We design, supply & execute acoustic solutions — so you don't have to understand acoustics. We handle everything from diagnostics to final measurement.
        </motion.p>

        {/* CTA — Refined Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-14 w-full"
        >
          <Link to="/consultation" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto premium-gold-gradient shine-effect text-black font-semibold px-10 py-7 text-xs tracking-[0.2em] uppercase rounded-none hover:opacity-90 transition-all duration-500 shadow-2xl"
            >
              Book Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/solutions" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white/80 hover:bg-white/5 hover:text-white font-medium px-10 py-7 text-xs tracking-[0.2em] uppercase rounded-none backdrop-blur-md transition-all duration-500"
            >
              Discover More
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Marquee Stats — Now outside the container for full-width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pb-4"
      >
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...marqueeStats, ...marqueeStats].map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-10">
              <p className="font-display text-2xl md:text-3xl font-light text-white/90 tracking-wide">
                {item}
              </p>
              <span className="text-primary/70 text-sm">|</span>
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
