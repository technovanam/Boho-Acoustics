import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Shield, 
  Settings, 
  Zap, 
  Star,
  VolumeX,
  Home as HomeIcon,
  EarOff,
  Building,
  AlertTriangle,
  PenTool,
  Calculator,
  Layout,
  BarChart,
  Check,
  Tv,
  Briefcase,
  Mic,
  ArrowLeftRight,
  Ear,
  MessageCircle,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const staggerContainer = { show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };

const SectionLabel = ({ children }) => (
  <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 mb-6">
    <div className="w-12 h-[2px] bg-amber-500" />
    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-500/80">{children}</span>
  </motion.div>
);

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden group cursor-ew-resize">
      {/* After Image (Background) */}
      <img src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2000" alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-2 bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] md:text-xs z-10 shadow-lg">After Treatment</div>

      {/* Before Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" alt="Before" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 bg-red-500 text-white font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg">Before Treatment</div>
      </div>

      {/* Slider Line */}
      <div className="absolute top-0 bottom-0 w-1 bg-amber-500 z-20" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.8)] pointer-events-none">
          <ArrowLeftRight className="w-5 h-5 text-black" />
        </div>
      </div>

      {/* Invisible Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize m-0 p-0"
      />
    </div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-white">
      
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.9)' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#0A0A0A]/40" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <SectionLabel>Boho Acoustics – Where Sound Meets Science & Design</SectionLabel>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 text-center sm:text-left">
            Struggling with echo, poor clarity, or sound leakage?
          </motion.p>

          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] max-w-5xl mt-2 mb-8 text-white text-center sm:text-left">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Perfect Sound,</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-amber-500">Designed For</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="block">Your Space.</motion.span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mb-12 space-y-4 text-center sm:text-left mx-auto sm:mx-0">
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              We design, supply, and execute custom acoustic solutions for homes, offices, and commercial spaces.
            </p>
            <p className="text-amber-500/80 text-sm md:text-base font-bold">
              We handle everything—from acoustic design to final execution.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 justify-center sm:justify-start">
            <Link to="/consultation"
              className="group flex justify-center items-center gap-3 px-10 py-5 font-black uppercase tracking-widest text-[11px] md:text-xs text-black bg-amber-500 transition-all hover:bg-amber-400 w-full sm:w-auto">
              Book Free Consultation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link to="/solutions"
              className="group flex justify-center items-center gap-3 px-10 py-5 font-bold uppercase tracking-widest text-[11px] md:text-xs border border-white/20 hover:border-amber-500 hover:text-amber-500 transition-all text-white w-full sm:w-auto bg-black/20 backdrop-blur-sm">
              Get Acoustic Plan
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">Trusted by Architects</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">50+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">Science-Based Solutions</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION SECTION ─────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 border-b border-white/10 pb-16">
            <div className="max-w-2xl text-center sm:text-left mx-auto lg:mx-0">
              <SectionLabel>The Problem</SectionLabel>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
                className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white mt-4">
                Is Your Space <br className="hidden md:block" /> <span className="text-amber-500">Sounding Like This?</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-md bg-white/5 p-6 border-l-4 border-white/20 mx-auto lg:mx-0">
              <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed italic">
                "Most spaces are designed visually—but sound is completely ignored."
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
              {[
                { title: "Echo and reverb ruining clarity", icon: VolumeX },
                { title: "Poor sound quality in home theatres", icon: HomeIcon },
                { title: "Noise leakage between rooms", icon: EarOff },
                { title: "Uncomfortable office acoustics", icon: Building },
                { title: "Lack of proper acoustic planning", icon: AlertTriangle }
              ].map((prob, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-6 p-6 border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-colors group">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white/5 group-hover:bg-red-500/10 transition-colors">
                    <prob.icon className="w-5 h-5 text-white/40 group-hover:text-red-400 transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-white/80 font-bold uppercase tracking-widest text-xs md:text-[13px]">{prob.title}</span>
                </motion.div>
              ))}
              
              <motion.div variants={fadeUp} className="mt-8 aspect-[16/9] relative overflow-hidden border border-white/10 group transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" alt="Empty Room Echo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-700 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Before</span>
                  <span className="text-white text-xl font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">Untreated Space</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} 
              className="relative bg-[#0A0A0A] border border-amber-500/20 p-8 md:p-12 lg:sticky top-32">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="mb-12 relative z-10">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
                  That's where <br className="hidden md:block"/><span className="text-amber-500">we come in.</span>
                </h3>
                <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed border-l-4 border-amber-500 pl-6 py-2 bg-gradient-to-r from-amber-500/10 to-transparent">
                  We design, supply, and execute end-to-end acoustic solutions tailored to your space.
                </p>
              </div>

              <div className="space-y-8 mb-12 relative z-10">
                {[
                  { title: "Custom Acoustic Design", desc: "No generic solutions. Engineered for your room.", icon: PenTool },
                  { title: "Science-Backed", desc: "Calculations & materials optimized for precise RT60.", icon: Calculator },
                  { title: "Seamless Integration", desc: "Flawless matching with your existing interiors.", icon: Layout },
                  { title: "Measurable Improvement", desc: "Guaranteed sonic performance, proven by testing.", icon: BarChart }
                ].map((sol, idx) => (
                  <div key={idx} className="flex gap-6 group cursor-pointer items-start">
                    <div className="w-12 h-12 mt-1 flex-shrink-0 flex items-center justify-center rounded-sm bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <sol.icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2 group-hover:text-amber-500 transition-colors">{sol.title}</h4>
                      <p className="text-[11px] md:text-xs font-bold text-white/40 leading-relaxed uppercase tracking-widest">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="aspect-[16/9] relative border border-white/10 overflow-hidden mb-10 group">
                <img src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1200" alt="Treated Space" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-between p-6">
                  <div className="flex flex-col">
                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-1">After</span>
                    <span className="text-white font-bold uppercase tracking-widest text-sm">Engineered Perfection</span>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-amber-500 flex items-center justify-center text-black">
                    <Check className="w-5 h-5" strokeWidth={3} />
                  </div>
                </div>
              </div>

              <Link to="/consultation"
                className="group flex justify-center items-center gap-3 w-full py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all">
                Book Acoustic Consultation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS BY SPACE ───────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col mb-20 text-center items-center">
            <SectionLabel>Solutions by Space</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white mt-4 max-w-3xl">
              Acoustic Solutions <br/><span className="text-amber-500">Tailored for Every Space</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg md:text-xl font-medium mt-6 max-w-2xl leading-relaxed">
              Whether it’s your home or a commercial project, we design sound that performs perfectly.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Home Theatre Acoustics", 
                icon: Tv, 
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200", 
                problem: "Poor clarity, uneven bass, echo", 
                solution: "Precision acoustic treatment for cinematic experience", 
                outcome: "Immersive, theatre-quality sound" 
              },
              { 
                title: "Office Acoustics", 
                icon: Briefcase, 
                image: "https://images.unsplash.com/photo-1497366858526-0766f4a40d8a?q=80&w=1200", 
                problem: "Noise distractions, poor speech clarity", 
                solution: "Acoustic panels and sound control systems", 
                outcome: "Better productivity and communication" 
              },
              { 
                title: "Auditorium Acoustics", 
                icon: Mic, 
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200", 
                problem: "Sound distortion, uneven coverage", 
                solution: "Engineered acoustic design for large spaces", 
                outcome: "Clear, balanced sound across the hall" 
              },
              { 
                title: "Home / Residential", 
                icon: HomeIcon, 
                image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200", 
                problem: "Noise leakage, uncomfortable sound environment", 
                solution: "Integrated acoustic treatments for daily comfort", 
                outcome: "Peaceful and controlled living spaces" 
              }
            ].map((space, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden border border-white/10 bg-[#0A0A0A] flex flex-col h-full cursor-pointer hover:border-amber-500/50 transition-colors">
                
                <div className="relative h-64 overflow-hidden border-b border-white/10">
                  <img src={space.image} alt={space.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent pointer-events-none" />
                  <div className="absolute top-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-colors z-10">
                    <space.icon className="w-5 h-5 text-white group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-8 group-hover:text-amber-500 transition-colors">{space.title}</h3>
                  <div className="flex-1 space-y-5 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4444] mb-1">Problem</span>
                      <p className="text-sm font-medium text-white/50">{space.problem}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Solution</span>
                      <p className="text-sm font-medium text-white/70">{space.solution}</p>
                    </div>
                    <div className="flex flex-col pt-5 mt-5 border-t border-white/10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF88] mb-1">Outcome</span>
                      <p className="text-sm font-bold text-white uppercase tracking-wider">{space.outcome}</p>
                    </div>
                  </div>

                  <Link to="/solutions" className="mt-auto group/btn flex items-center justify-between py-5 border-t border-white/10 text-white/50 hover:text-amber-500 transition-colors">
                    <span className="text-xs font-black uppercase tracking-widest group-hover/btn:text-amber-500 transition-colors">Get Plan</span>
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover/btn:rotate-0 group-hover/btn:translate-x-1 transition-all text-white/50 group-hover/btn:text-amber-500" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER SHOWCASE ──────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col text-center items-center mb-16">
            <SectionLabel>Experience the Difference</SectionLabel>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white mt-4 max-w-4xl">
              From echo-filled spaces to <br/><span className="text-amber-500">perfectly tuned environments.</span>
            </motion.h2>
          </div>

          {/* Interactive Slider */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} 
            className="mb-16 border border-white/10 rounded-md overflow-hidden bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <BeforeAfterSlider />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Reduced Echo & Reverb", icon: VolumeX },
                { title: "Clear Speech & Clarity", icon: Mic },
                { title: "Balanced Frequency Response", icon: BarChart },
                { title: "Improved Listening Comfort", icon: Ear }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-[#0A0A0A] border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 bg-amber-500/10 flex flex-shrink-0 items-center justify-center text-amber-500 rounded-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-white/80">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start bg-white/5 p-8 border-l-4 border-amber-500 shadow-2xl">
              <p className="text-xl md:text-2xl font-medium text-white italic mb-4">
                "Not just better sound — a completely transformed experience."
              </p>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-8 leading-relaxed font-bold">
                Our designs deliver measurable acoustic performance, not guesswork.
              </p>
              <Link to="/solutions" className="group flex items-center justify-center gap-3 px-8 py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-400 w-full transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                Get Your Acoustic Plan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS & TRUST ──────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col text-center items-center mb-16">
            <SectionLabel>What Our Clients Say</SectionLabel>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white mt-4 leading-none">
              Real spaces. <span className="text-amber-500">Real results.</span><br className="hidden md:block"/> Real satisfaction.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20 lg:mb-24">
            {[
              { 
                text: "The difference in sound clarity is unbelievable. Boho handled everything perfectly from design to execution in our home theatre.", 
                name: "Rahul M.", type: "Homeowner", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" 
              },
              { 
                text: "As an architect, I need partners who understand both aesthetics and performance. Boho Acoustics delivered beautifully on both fronts for our latest corporate project.", 
                name: "Priyanka S.", type: "Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" 
              },
              { 
                text: "Our open office was a nightmare for focus. Post-treatment, the ambient noise dropped completely. The team's productivity has skyrocketed.", 
                name: "Vikram K.", type: "Commercial Client", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" 
              }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#0A0A0A] border border-white/5 p-8 md:p-10 hover:border-amber-500/30 transition-colors group relative overflow-hidden flex flex-col h-full rounded-sm shadow-2xl">
                
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
                  </div>
                </div>

                <div className="flex gap-1 mb-6 text-amber-500">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>

                <p className="text-white/70 italic leading-relaxed text-sm flex-1 mb-8 relative z-10">"{t.text}"</p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/10 transition-transform duration-500 group-hover:scale-110" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">{t.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500 mt-[2px]">{t.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 border-t border-white/10 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-5xl font-black text-white mb-3">50+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Projects Completed</span>
            </div>
            <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-white/10 py-10 sm:py-0">
              <span className="text-white mb-3"><Shield className="w-10 h-10 text-amber-500" strokeWidth={1.5} /></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Trusted by Architects</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white mb-3"><Check className="w-10 h-10 text-amber-500" strokeWidth={1.5} /></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">End-to-End Experts</span>
            </div>
          </div>

          <div className="mt-24 overflow-hidden relative opacity-30 hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
            <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }} className="flex gap-20 min-w-max items-center h-16">
              {['LUMINA STUDIOS', 'OAK ARCHITECTS', 'ECHO DESIGNS', 'URBAN HOMES', 'VANGUARD CORP', 'LUMINA STUDIOS', 'OAK ARCHITECTS', 'ECHO DESIGNS', 'URBAN HOMES', 'VANGUARD CORP'].map((client, i) => (
                <div key={i} className="text-white/40 font-black text-2xl uppercase tracking-widest flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                  {client}
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* ── FINAL CTA & LEAD CAPTURE ─────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#0A0A0A]/80 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Text & Urgency */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col">
              <SectionLabel>Final Step</SectionLabel>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mt-4 mb-8">
                Ready to Transform Your <br /><span className="text-amber-500">Sound Experience?</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-10">
                Get a custom acoustic plan designed specifically for your space.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link to="/consultation" className="group flex justify-center items-center py-5 px-10 bg-amber-500 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all">
                  Book Free Consultation
                </Link>
                <Link to="/solutions" className="group flex justify-center items-center py-5 px-10 border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:border-amber-500 hover:text-amber-500 transition-colors bg-white/5 backdrop-blur-sm">
                  Get Acoustic Plan
                </Link>
              </div>

              <div className="space-y-6 border-t border-white/10 pt-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/50">Limited consultation slots available each week</span>
                </div>
                
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 p-4 bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 transition-colors group/wa w-fit">
                  <MessageCircle className="w-5 h-5 text-green-500 group-hover/wa:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest leading-none mb-1">Prefer quick help?</span>
                    <span className="text-xs uppercase font-black text-white tracking-widest leading-none">Chat with us on WhatsApp</span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right: Lead Capture Form */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0A0A0B] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-900" />
              
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-black border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full bg-black border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Project Type</label>
                  <select className="w-full bg-black border border-white/10 p-4 text-white/70 text-sm focus:outline-none focus:border-amber-500 transition-colors appearance-none outline-none">
                    <option value="">Select Space Type</option>
                    <option value="home-theatre">Home Theatre</option>
                    <option value="office">Office / Commercial</option>
                    <option value="auditorium">Auditorium</option>
                    <option value="residential">Residential Setup</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Area (Sq. Ft.)</label>
                    <input type="number" placeholder="e.g. 500" className="w-full bg-black border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Location</label>
                    <input type="text" placeholder="City, State" className="w-full bg-black border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex justify-between pr-2">
                    Budget <span>(Optional)</span>
                  </label>
                  <input type="text" placeholder="Approximate budget in INR" className="w-full bg-black border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex justify-between pr-2">
                    Floor Plans / Drawings <span>(Optional)</span>
                  </label>
                  <label className="w-full bg-black border border-white/10 border-dashed p-6 text-center cursor-pointer hover:border-amber-500 transition-colors flex flex-col items-center justify-center gap-3">
                    <Upload className="w-5 h-5 text-white/40" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Click to upload file</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <button type="button" onClick={(e) => e.preventDefault()} className="w-full py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-400 mt-4 transition-colors flex items-center justify-center gap-3">
                  Submit Request <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center flex items-center justify-center gap-2 mt-2">
                  <Shield className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">No obligation. Tailored solutions.</span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
