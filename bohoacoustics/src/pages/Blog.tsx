import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const posts = [
  {
    title: "Why Your Home Theatre Sounds Bad",
    excerpt: "Most home theatres suffer from untreated reflections and standing waves. Here's the science behind fixing it.",
    date: "Mar 15, 2026",
    readTime: "5 MIN",
    category: "HOME THEATRE",
    id: "01"
  },
  {
    title: "Echo Problems in Offices — The Hidden Productivity Killer",
    excerpt: "Studies show poor office acoustics reduce productivity by up to 66%. Learn how to solve it.",
    date: "Mar 8, 2026",
    readTime: "4 MIN",
    category: "OFFICE",
    id: "02"
  },
  {
    title: "Acoustic Panels vs Foam: What Actually Works?",
    excerpt: "Cheap foam is everywhere, but does it actually work? We break down the science.",
    date: "Feb 28, 2026",
    readTime: "6 MIN",
    category: "EDUCATION",
    id: "03"
  },
  {
    title: "How to Achieve NRC 1 Panels",
    excerpt: "Understanding Noise Reduction Coefficient and what it takes to reach maximum absorption.",
    date: "Feb 20, 2026",
    readTime: "7 MIN",
    category: "TECHNICAL",
    id: "04"
  },
];

const Blog = () => (
  <div className="min-h-screen bg-[#050505]">
    <Navbar />
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">INSIGHTS & DATA</p>
          <h1 className="font-display text-4xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tighter mb-8">
            The Science <br />
            <span className="text-white/20 italic font-light">Of Acoustics</span>
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            Deep dives into architectural physics, material science, and the engineering of perfect sound environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {posts.map((post) => (
            <Link 
              key={post.title} 
              to={`/blog/${post.id}`} 
              className="bg-black p-10 lg:p-16 group relative transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-primary tracking-[0.2em]">{post.category}</span>
                    <span className="text-[10px] font-black text-white/20 tracking-widest">{post.id}</span>
                  </div>
                  
                  <h2 className="font-display text-2xl lg:text-3xl font-black uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-12 flex items-center justify-between border-t border-white/5 mt-12">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-white/20" />
                      <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-white/20" />
                      <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">{post.date}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="mt-24 border border-white/10 p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between group">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-[80px]" />
          <div>
            <h3 className="font-display text-4xl font-black tracking-tighter uppercase mb-4 leading-tight">
              Request Technical <br />
              <span className="text-primary italic">Papers</span>
            </h3>
            <p className="text-white/40 text-sm max-w-sm">
              Detailed case studies and technical performance documentation for architects and engineering firms.
            </p>
          </div>
          <Link to="/consultation" className="mt-10 md:mt-0">
            <Button size="lg" className="h-20 px-12 gradient-gold text-primary-foreground font-black text-sm tracking-widest uppercase rounded-none hover:translate-x-2 transition-all">
              DOWNLOAD SPECS <ArrowRight className="ml-4 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Blog;
