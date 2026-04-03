import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/content/blogPosts";

const Blog = () => (
  <div className="min-h-screen bg-[#050505]">
    <Helmet>
      <title>Acoustic Blog India (2026 Expert Guides) | Boho Acoustics</title>
      <meta
        name="description"
        content="Read high-intent acoustic guides on soundproofing, home theatre acoustics, office noise control, and consultant-led treatment planning in India."
      />
      <link rel="canonical" href="https://bohoacoustic.com/blog" />
    </Helmet>

    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-24">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-4 opacity-80">INSIGHTS & DATA</p>
          <h1 className="font-display text-4xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tighter mb-8">
            Acoustic Growth <br />
            <span className="text-primary italic font-light">Knowledge Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            Long-form, conversion-focused guides designed to rank for high-intent acoustic search queries across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {BLOG_POSTS.map((post, index) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="bg-black p-10 lg:p-16 group relative transition-colors duration-500 hover:bg-white/[0.02]">
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-primary tracking-[0.2em]">{post.category}</span>
                    <span className="text-[10px] font-black text-white/40 tracking-widest">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h2 className="font-display text-2xl lg:text-3xl font-black uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="pt-12 flex items-center justify-between border-t border-white/5 mt-12">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-white/40" />
                      <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase">{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-white/40" />
                      <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase">{post.date}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="mt-24 border border-white/10 p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-[80px]" />
          <div>
            <h3 className="font-display text-4xl font-black tracking-tighter uppercase mb-4 leading-tight">
              Explore Resources <br />
              <span className="text-primary italic">And Case Studies</span>
            </h3>
            <p className="text-white/60 text-sm max-w-sm">Use our resource stack and project breakdowns to choose the right acoustic direction faster.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link to="/resources" className="w-full sm:w-auto">
              <button className="w-full h-14 px-8 border border-white/10 text-white text-xs uppercase tracking-widest font-black hover:border-primary/40 hover:text-primary transition-colors">
                RESOURCES
              </button>
            </Link>
            <Link to="/case-studies" className="w-full sm:w-auto">
              <button className="w-full h-14 px-8 gradient-gold text-primary-foreground text-xs uppercase tracking-widest font-black hover:opacity-90 transition-opacity">
                CASE STUDIES
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
