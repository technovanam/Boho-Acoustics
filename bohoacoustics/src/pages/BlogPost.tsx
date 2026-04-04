import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Share2, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/content/blogPosts";

const BlogPost = () => {
  const siteUrl = "https://www.bohoacoustic.com";
  const socialImage = `${siteUrl}/og-default.png`;
  const { id } = useParams();
  const post = useMemo(() => BLOG_POSTS.find((item) => item.slug === id), [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black text-white mb-6 uppercase">Document Not Found</h1>
          <Link to="/blog" className="inline-flex h-12 items-center rounded-none gradient-gold text-primary-foreground font-black px-12">
            BACK TO ARCHIVE
          </Link>
        </div>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    author: {
      "@type": "Organization",
      name: "Boho Acoustics",
    },
    publisher: {
      "@type": "Organization",
      name: "Boho Acoustics",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <link rel="canonical" href={`${siteUrl}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:url" content={`${siteUrl}/blog/${post.slug}`} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle} />
        <meta name="twitter:description" content={post.seoDescription} />
        <meta name="twitter:image" content={socialImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <article className="pt-32 pb-24 lg:pt-44 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="mb-14 lg:mb-20">
            <div className="flex items-center gap-6 mb-8">
              <Link to="/blog" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-primary transition-colors text-white/40 hover:text-primary" aria-label="Back to blog">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">{post.category}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white/50 text-[10px] tracking-widest uppercase font-bold">{post.date}</span>
              </div>
            </div>

            <h1 className="font-display text-4xl lg:text-6xl font-black tracking-tighter text-white leading-[1.05] uppercase mb-8">
              {post.heroTitle}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/5">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">{post.readTime}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/50 tracking-widest uppercase font-bold">
                  {post.keywords[0]}
                </div>
              </div>
              <button type="button" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] tracking-widest uppercase font-bold">Share</span>
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <p className="text-lg font-light leading-relaxed text-white/75">{post.intro}</p>

            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-5">
                <h2 className="font-display text-3xl font-black tracking-tight uppercase text-white">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)} className="text-base lg:text-lg font-light leading-relaxed text-white/70">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className="space-y-4 pt-2">
              <h2 className="font-display text-3xl font-black tracking-tight uppercase text-white">Frequently Asked Questions</h2>
              {post.faq.map((item) => (
                <article key={item.question} className="border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-lg font-bold text-white mb-2">{item.question}</h3>
                  <p className="text-white/70 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </section>

            <section className="border border-white/10 p-8 lg:p-10 bg-black">
              <h3 className="font-display text-3xl font-black tracking-tight uppercase mb-3 text-white">Continue Your Research</h3>
              <p className="text-white/65 mb-6 leading-relaxed">
                Move from education to implementation with technical service guidance, solution pathways, and consultation support.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/services" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  Services <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/solutions" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  Solutions <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/about" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white/85 hover:text-white hover:border-primary/50 transition-colors">
                  About <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/consultation" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-4 py-3 text-xs uppercase tracking-widest font-black hover:opacity-90 transition-opacity">
                  Consultation <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
