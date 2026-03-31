import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    title: "Why Your Home Theatre Sounds Bad",
    excerpt: "Most home theatres suffer from untreated reflections and standing waves. Here's the science behind fixing it.",
    date: "Mar 15, 2026",
    readTime: "5 min",
    category: "Home Theatre",
  },
  {
    title: "Echo Problems in Offices — The Hidden Productivity Killer",
    excerpt: "Studies show poor office acoustics reduce productivity by up to 66%. Learn how to solve it.",
    date: "Mar 8, 2026",
    readTime: "4 min",
    category: "Office",
  },
  {
    title: "Acoustic Panels vs Foam: What Actually Works?",
    excerpt: "Cheap foam is everywhere, but does it actually work? We break down the science.",
    date: "Feb 28, 2026",
    readTime: "6 min",
    category: "Education",
  },
  {
    title: "How to Achieve NRC 1 Panels",
    excerpt: "Understanding Noise Reduction Coefficient and what it takes to reach maximum absorption.",
    date: "Feb 20, 2026",
    readTime: "7 min",
    category: "Technical",
  },
];

const Blog = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionReveal>
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Insights</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-center mb-6">
            The Acoustics <span className="gradient-gold-text">Blog</span>
          </h1>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            Expert insights on acoustic design, materials, and sound science.
          </p>
        </SectionReveal>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <SectionReveal key={post.title} delay={i * 0.08}>
              <article className="glass-card rounded-xl p-6 lg:p-8 group hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-3">{post.date}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Blog;
