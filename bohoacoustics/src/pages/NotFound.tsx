import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden px-6 py-24 flex items-center justify-center">
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl border border-white/10 bg-black/70 p-8 sm:p-12 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-primary font-bold mb-4">Boho Acoustics</p>
        <h1 className="font-display text-6xl sm:text-8xl leading-none text-white mb-4">404</h1>
        <h2 className="font-display text-2xl sm:text-4xl text-white mb-5">
          This room was not <span className="text-primary italic font-light">tuned</span>
        </h2>
        <p className="mx-auto max-w-xl text-white/65 text-sm sm:text-base leading-relaxed mb-8">
          The page you are looking for does not exist or may have moved. Let us guide you back to the right acoustic path.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="gradient-gold text-primary-foreground font-black text-xs tracking-widest px-8 h-12 inline-flex items-center justify-center uppercase w-full sm:w-auto"
          >
            Go Home
          </Link>
          <Link
            to="/consultation"
            className="border border-white/20 text-white hover:text-primary hover:border-primary/70 font-bold text-xs tracking-widest px-8 h-12 inline-flex items-center justify-center uppercase transition-colors w-full sm:w-auto"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
