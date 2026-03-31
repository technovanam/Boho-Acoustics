import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-theatre.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="Premium home theatre with acoustic treatment" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
    </div>

    <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-24">
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6"
        >
          Where Sound Meets Science & Design
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6"
        >
          Perfect Sound,{" "}
          <span className="gradient-gold-text">Designed</span> for Your Space
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg lg:text-xl max-w-lg mb-8 leading-relaxed"
        >
          We design, supply & execute acoustic solutions — so you don't have to understand acoustics. We handle everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/consultation">
            <Button size="lg" className="gradient-gold text-primary-foreground font-semibold px-8 text-base glow-gold hover:opacity-90 transition-opacity">
              Book Free Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/solutions">
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-medium px-8 text-base">
              Explore Solutions
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-10 mt-16"
        >
          {[
            { value: "200+", label: "Projects" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "50+", label: "Cities" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl lg:text-3xl font-bold gradient-gold-text">{stat.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* Sound wave decoration */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </section>
);

export default HeroSection;
