import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-theatre.jpg";
import officeImg from "@/assets/office-acoustics.jpg";
import auditoriumImg from "@/assets/auditorium-acoustics.jpg";
import residentialImg from "@/assets/residential-acoustics.jpg";

const categories = [
  { title: "Home Theatre", img: heroImg, desc: "Personal cinematic precision." },
  { title: "Office Spaces", img: officeImg, desc: "Acoustic focus for efficiency." },
  { title: "Auditoriums", img: auditoriumImg, desc: "Scale-ready sound clarity." },
  { title: "Residential", img: residentialImg, desc: "Crafting silent sanctuaries." },
];

const CategoriesSection = () => (
  <section className="py-10 lg:py-20 bg-zinc-950">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mb-14 md:mb-20 text-left">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">SOLUTIONS BY SPACE</p>
        <h2 className="font-display text-[10vw] sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter mb-6">
          Tailored <span className="text-primary italic font-light">Performance</span>
        </h2>
        <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed max-w-xl">
          We bring scientific acoustic engineering to every environment. Whether it's a private theatre or a corporate headquarters, our performance is guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        {categories.map((cat) => (
          <Link 
            key={cat.title} 
            to="/solutions" 
            className="group relative block aspect-[16/10] overflow-hidden"
          >
            {/* Background Image */}
            <img
              src={cat.img}
              alt={`${cat.title} acoustic solutions`}
              width={1200}
              height={750}
              loading={cat.title === "Home Theatre" ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover transition-all duration-700 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
            
            {/* Accent Border (Sharp) */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-primary/40 transition-colors duration-500" />

            {/* Content Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex items-end justify-between gap-4">
              <div className="space-y-3">
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-white/60 text-xs tracking-wider font-medium group-hover:text-white/90 transition-colors">
                  {cat.desc}
                </p>
              </div>
              
              <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-sm">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
