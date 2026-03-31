import { Link } from "react-router-dom";
import SectionReveal from "@/components/SectionReveal";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-theatre.jpg";
import officeImg from "@/assets/office-acoustics.jpg";
import auditoriumImg from "@/assets/auditorium-acoustics.jpg";
import residentialImg from "@/assets/residential-acoustics.jpg";

const categories = [
  { title: "Home Theatre", img: heroImg, desc: "Cinematic sound in your personal space." },
  { title: "Office", img: officeImg, desc: "Focus-enhancing acoustic environments." },
  { title: "Auditorium", img: auditoriumImg, desc: "Crystal-clear audio for every seat." },
  { title: "Residential", img: residentialImg, desc: "Peaceful, comfortable living spaces." },
];

const CategoriesSection = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionReveal>
        <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Solutions by Space</p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-center mb-16">
          Acoustic Excellence, <span className="gradient-gold-text">Every Space</span>
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <SectionReveal key={cat.title} delay={i * 0.1}>
            <Link to="/solutions" className="group relative block rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={cat.img}
                alt={`${cat.title} acoustic solutions`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-1">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm">{cat.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
