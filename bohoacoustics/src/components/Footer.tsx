import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-black border-t border-white/10 pt-24 pb-12 lg:pt-32 lg:pb-16">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-12">
        <div className="space-y-10">
          <div>
            <img 
              src="/IMG_5751.PNG" 
              alt="Boho Acoustics Logo" 
              className="h-12 w-auto object-contain mb-6 grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-[240px]">
              Where Sound Meets Science & Design. Performance guaranteed, scientifically verified.
            </p>
          </div>
          <div className="flex gap-4">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
                <Icon className="w-4 h-4 text-white/40 hover:text-primary transition-colors" />
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
                className="text-sm text-white/50 hover:text-white transition-all hover:translate-x-1 inline-flex items-center group gap-2"
              >
                {s}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-primary">RESOURCES</h4>
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
                className="text-sm text-white/50 hover:text-white transition-all hover:translate-x-1"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-primary">DIRECT CONTACT</h4>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <Mail className="w-4 h-4 text-primary mt-1" />
              <div>
                <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold mb-1">Email Us</p>
                <a href="mailto:info@bohoacoustics.com" className="text-sm font-medium hover:text-primary transition-colors">info@bohoacoustics.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-4 h-4 text-primary mt-1" />
              <div>
                <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold mb-1">Call Support</p>
                <a href="tel:+91" className="text-sm font-medium hover:text-primary transition-colors">+91 999 999 9999</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-primary mt-1" />
              <div>
                <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold mb-1">Region</p>
                <span className="text-sm font-medium">Pan India Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-white/20 tracking-widest uppercase font-medium">
          © 2026 Boho Acoustics. Scientific Acoustic Engineering.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

);

export default Footer;
