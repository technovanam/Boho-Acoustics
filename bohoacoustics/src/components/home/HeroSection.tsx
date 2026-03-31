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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow — Animated Cross-Fade & Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            transition={{ duration: 2, ease: "easeOut" }}
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
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content — Vertically centered at 100vh */}
      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col items-center text-center pt-32 md:pt-40 pb-20">

        {/* Label — Animated Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-primary font-semibold text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
        >
          Specializing in {backgroundImages[currentBg].label}
        </motion.p>

        {/* Main headline — Animated Fluid Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[1.05] mb-8
                     text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] tracking-tight text-balance"
        >
          Perfect Sound,{" "}
          <span className="gradient-gold-text">Designed</span>
          <br /> for Your Space
        </motion.h1>

        {/* Subtitle — Animated Fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light text-balance px-4"
        >
          We design, supply &amp; execute acoustic solutions — so you don't have to
          understand acoustics. We handle everything from diagnostics to final measurement.
        </motion.p>

        {/* CTA — Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-20 w-full px-6"
        >
          <Link to="/consultation" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto gradient-gold text-primary-foreground font-bold px-12 py-7 text-lg rounded-none glow-gold hover:scale-105 transition-all duration-300"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/solutions" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border/40 text-foreground hover:bg-white/5 hover:text-white font-medium px-12 py-7 text-lg rounded-none backdrop-blur-[10px] transition-all duration-300"
            >
              Explore Solutions
            </Button>
          </Link>
        </motion.div>

        {/* Stats — Final Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          className="flex items-center gap-8 md:gap-12 flex-wrap justify-center overflow-x-auto max-w-full no-scrollbar pb-4"
        >
          {[
            { value: "200+", label: "Projects" },
            { value: "98%", label: "Satisfaction" },
            { value: "50+", label: "Cities" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-12 shrink-0">
              <div className="text-center group">
                <p className="font-display text-3xl md:text-5xl font-bold gradient-gold-text mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                  {stat.label}
                </p>
              </div>
              {i < 2 && (
                <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Elegant bottom accent line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" 
      />
    </section>
  );
};

export default HeroSection;
