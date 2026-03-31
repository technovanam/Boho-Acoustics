import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";

const posts = [
  {
    id: "01",
    title: "Why Your Home Theatre Sounds Bad",
    category: "HOME THEATRE",
    date: "Mar 15, 2026",
    readTime: "5 MIN",
    author: "Prasanna",
    content: `
      <p>Most home theatres suffer from untreated reflections and standing waves. Here's the science behind fixing it. It's a common misconception that getting the most expensive speakers is enough. In reality, the room is the most important component of your sound system.</p>
      
      <h3>The Problem: Standing Waves</h3>
      <p>When sound waves reflect off parallel walls, they can reinforce or cancel each other out at specific frequencies. This results in "boomy" bass in some seats and no bass at all in others. We solve this using technical bass traps and strategic absorption.</p>
      
      <h3>The Solution: Strategic Diffusion</h3>
      <p>You don't want a "dead" room. You want a room that sounds natural and immersive. By using quadratic residue diffusers (QRD), we can scatter mid and high-frequency sound waves, creating a wide soundstage without losing the energy of the recording.</p>
      
      <h3>Predictable Results</h3>
      <p>At Boho Acoustics, we don't just put up panels. We use 3D acoustic modeling software to predict how your room will respond before a single nail is driven. We then verify the final performance with high-precision measurement microphones.</p>
    `
  },
  {
    id: "02",
    title: "Echo Problems in Offices — The Hidden Productivity Killer",
    category: "OFFICE",
    date: "Mar 8, 2026",
    readTime: "4 MIN",
    author: "Prasanna",
    content: `
      <p>Studies show poor office acoustics reduce productivity by up to 66%. Learn how to solve it. Excessive noise and lack of speech privacy are among the top complaints in modern open-plan offices.</p>
      
      <h3>The Speech Intelligibility Index</h3>
      <p>In an office, you need high speech intelligibility for conference calls but low intelligibility between workstations for privacy. Achieving this requires a delicate balance of ceiling baffles and localized acoustic zoning.</p>
      
      <h3>Concentration vs Collaboration</h3>
      <p>By engineering specific "Quiet Zones" using high-NRC materials, we can provide employees with the silence they need for deep work, while allowing for vibrant collaboration in communal areas without the noise bleeding through.</p>
    `
  },
  {
    id: "03",
    title: "Acoustic Panels vs Foam: What Actually Works?",
    category: "EDUCATION",
    date: "Feb 28, 2026",
    readTime: "6 MIN",
    author: "Prasanna",
    content: `
      <p>Cheap foam is everywhere, but does it actually work? We break down the science. If you've ever seen "egg carton" foam, you've seen one of the biggest myths in acoustics.</p>
      
      <h3>Mass and Density</h3>
      <p>Sound is energy. To stop it or absorb it, you need mass and density. Lightweight foam only affects the very highest frequencies, leaving the muddy low-mids untouched. Professional acoustic panels use high-density mineral wool or specialized fiberglass to provide broadband absorption.</p>
      
      <h3>The NRC Myth</h3>
      <p>Not all NRC (Noise Reduction Coefficient) ratings are created equal. We look at the specific absorption coefficients across the frequency spectrum—ensuring the treatment works exactly where your room needs it most.</p>
    `
  },
  {
    id: "04",
    title: "How to Achieve NRC 1 Panels",
    category: "TECHNICAL",
    date: "Feb 20, 2026",
    readTime: "7 MIN",
    author: "Prasanna",
    content: `
      <p>Understanding Noise Reduction Coefficient and what it takes to reach maximum absorption. An NRC of 1 means the material is theoretically absorbing 100% of the sound that hits it.</p>
      
      <h3>Engineering the Air Gap</h3>
      <p>By mounting panels with a specific air gap from the wall, we can significantly increase their effectiveness at lower frequencies without increasing materials cost. This is physics in action.</p>
      
      <h3>Frame Design</h3>
      <p>Our frames are engineered to be acoustically transparent on the sides, allowing sound to enter the core from multiple angles, maximizing the total surface area for absorption. No compromises, just performance.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black text-white mb-6 uppercase">Document Not Found</h1>
          <Link to="/blog">
            <Button className="rounded-none gradient-gold text-primary-foreground font-black px-12">BACK TO ARCHIVE</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <article className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16 lg:mb-24">
            <div className="flex items-center gap-6 mb-8">
              <Link 
                to="/blog" 
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-primary transition-colors text-white/40 hover:text-primary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">{post.category}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white/30 text-[10px] tracking-widest uppercase font-bold">{post.date}</span>
              </div>
            </div>

            <h1 className="font-display text-4xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] uppercase mb-12">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-white/5">
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="text-[9px] text-white/30 tracking-[0.2em] font-bold uppercase mb-1">Author</p>
                    <p className="text-sm font-medium text-white">{post.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-4 h-4 text-white/20" />
                  <div>
                    <p className="text-[9px] text-white/30 tracking-[0.2em] font-bold uppercase mb-1">Read Time</p>
                    <p className="text-sm font-medium text-white">{post.readTime}</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-3 text-white/30 hover:text-primary transition-colors py-2 group">
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover:tracking-[0.3em] transition-all">Share Insight</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-primary max-w-none 
              prose-h3:font-display prose-h3:text-2xl prose-h3:font-black prose-h3:uppercase prose-h3:tracking-tight prose-h3:mt-16 prose-h3:mb-6 prose-h3:text-white
              prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-p:text-white/60 prose-p:mb-8
              prose-blockquote:border-l-primary prose-blockquote:bg-white/[0.02] prose-blockquote:p-8 prose-blockquote:not-italic prose-blockquote:text-xl
            ">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Support Box */}
            <div className="mt-24 border border-white/10 p-10 lg:p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1">
                  <h4 className="font-display text-3xl font-black tracking-tighter uppercase mb-4 leading-[1.1]">
                    Applied Science <br />
                    <span className="text-primary italic">In Your Space</span>
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                    Don't just read about acoustics—experience perfect sound. Our team is ready to analyze your space.
                  </p>
                </div>
                <Link to="/consultation" className="w-full md:w-auto">
                  <Button className="h-20 px-12 gradient-gold text-primary-foreground font-black text-sm tracking-widest uppercase rounded-none w-full md:w-auto hover:translate-x-2 transition-transform">
                    GET DIAGNOSTIC
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
