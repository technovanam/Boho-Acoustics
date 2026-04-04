import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const socials = [
    { Icon: Instagram, href: "https://www.instagram.com/bohoacoustics/" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/shipofboho/" },
    { Icon: Youtube, href: "https://youtube.com/@bohoacoustics?si=EtwdbeDysECFv9hD" },
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-16 lg:gap-12">
          <div className="space-y-10">
            <div>
              <img 
                src="/logo.png" 
                alt="Boho Acoustics Logo" 
                width={160}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain mb-6 grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all"
              />
              <p className="text-white/60 text-sm">
                Science. Sound. Style.
              </p>
            </div>
            <div className="flex gap-4">
              {socials.map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Open ${href.includes("instagram") ? "Instagram" : href.includes("linkedin") ? "LinkedIn" : "YouTube"} in a new tab`}
                  className="w-11 h-11 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors group/icon"
                >
                  <Icon className="w-4 h-4 text-white/60 group-hover/icon:text-primary transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

        <div className="space-y-12">
          <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-primary">PROJECT TYPES</h4>
          <div className="flex flex-col gap-5">
            {["Home Theatre", "Office Spaces", "Auditorium", "Residential"].map((s) => (
              <Link 
                key={s} 
                to="/solutions" 
                className="text-sm text-white/70 hover:text-white transition-all hover:translate-x-1 inline-flex items-center group gap-2"
              >
                {s}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-primary">LINKS</h4>
          <div className="flex flex-col gap-5">
            {[
              { label: "About Our Story", to: "/about" },
              { label: "Specialized Services", to: "/services" },
              { label: "Acoustic Insights (Blog)", to: "/blog" },
              { label: "Book Consultation", to: "/consultation" },
            ].map((l) => (
              <Link 
                key={l.to} 
                to={l.to} 
                className="text-sm text-white/70 hover:text-white transition-all hover:translate-x-1"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

          <div className="space-y-12">
            <h4 className="text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-black uppercase text-primary">DIRECT CONTACT</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-primary mt-1" aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-white/50 tracking-widest uppercase font-bold mb-1">Email Us</p>
                  <a href="mailto:hello@bohoacoustic.com" className="text-sm font-medium hover:text-primary transition-colors">hello@bohoacoustic.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-primary mt-1" aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-white/50 tracking-widest uppercase font-bold mb-1">Call Support</p>
                  <a href="tel:+918433900692" className="block text-sm font-body font-medium hover:text-primary transition-colors">8433900692</a>
                  <a href="tel:+919731150599" className="block text-sm font-body font-medium hover:text-primary transition-colors">9731150599</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-primary mt-1" aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-white/50 tracking-widest uppercase font-bold mb-1">Region</p>
                  <span className="text-sm font-medium">Pan India Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[11px] text-white/40 tracking-wider sm:tracking-widest uppercase font-medium">
            © 2026 Boho Acoustics. Scientific Acoustic Engineering.
          </p>
          <div className="flex items-center justify-center md:justify-end">
            <p className="text-[11px] text-white/40 tracking-wider sm:tracking-widest uppercase font-medium">
              Developed by <a href="https://www.technovanam.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">Techno Vanam</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
