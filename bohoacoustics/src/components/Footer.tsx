import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border/30 py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="font-display text-xl font-bold mb-3">
            <span className="gradient-gold-text">Boho</span> Acoustics
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Where Sound Meets Science & Design.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4">Solutions</h4>
          <div className="flex flex-col gap-2">
            {["Home Theatre", "Office", "Auditorium", "Residential"].map((s) => (
              <Link key={s} to="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">{s}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "About Us", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Blog", to: "/blog" },
              { label: "Consultation", to: "/consultation" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4">Get in Touch</h4>
          <p className="text-sm text-muted-foreground">info@bohoacoustics.com</p>
          <p className="text-sm text-muted-foreground mt-1">India</p>
          <Link to="/consultation" className="inline-block mt-4 text-sm text-primary font-medium hover:underline">
            Book Free Consultation →
          </Link>
        </div>
      </div>
      <div className="border-t border-border/30 mt-12 pt-8 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Boho Acoustics. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
