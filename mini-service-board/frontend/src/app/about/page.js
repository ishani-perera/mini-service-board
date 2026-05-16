'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';

const FEATURES = [
  { icon: '🛡️', title: 'Verified Professionals', desc: 'Every tradesperson undergoes strict background checks and identity verification for your ultimate safety and peace of mind.', color: '#10b981', bg: '#ecfdf5' },
  { icon: '⭐', title: 'Quality Guaranteed', desc: 'We only partner with top-rated professionals who have proven track records and consistently positive customer reviews.', color: '#f59e0b', bg: '#fffbeb' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges or surprise fees. Get fair, upfront quotes from multiple professionals before making a decision.', color: '#3b82f6', bg: '#eff6ff' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Get multiple competitive job bids within 24 hours from highly skilled professionals ready to work in your area.', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: '🔒', title: 'Secure & Safe', desc: 'Our platform ensures secure payment processing and offers robust protection policies for both homeowners and tradespeople.', color: '#ec4899', bg: '#fdf2f8' },
  { icon: '🎧', title: '24/7 Support', desc: 'Our dedicated customer success team is available round-the-clock to resolve any issues and answer your questions fast.', color: '#0ea5e9', bg: '#f0f9ff' },
];

const STATS = [
  { value: '50K+', label: 'Jobs Completed', color: '#a855f7' },
  { value: '10K+', label: 'Verified Experts', color: '#ec4899' },
  { value: '98%', label: 'Satisfaction Rate', color: '#0ea5e9' },
  { value: '24/7', label: 'Customer Support', color: '#f59e0b' },
];

export default function AboutPage() {
  return (
    /* ── මෙතන තමයි අලුත් Background වර්ණය තියෙන්නේ (Rich Purple Gradient) ── */
    <div className="bg-gradient-to-br from-[#1E103C] via-[#0F0A1F] to-[#1A0B2E] min-h-screen text-white font-sans overflow-x-hidden">

      {/* ── CUSTOM ANIMATIONS ── */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-reverse {
          0% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.05); /* ටිකක් එළිය වැඩි කළා Glass එකේ */
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7C3AED] opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#EC4899] opacity-30 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-panel rounded-full px-5 py-2 mb-8 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
              <span>✨</span>
              <span className="text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                Our Premium Story
              </span>
            </div>

            <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-black leading-[1.1] tracking-tight mb-6 text-white drop-shadow-md">
              Transforming How <br />
              Sri Lanka <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">
                Maintains Its Homes
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-lg">
              SourceTradesman is Sri Lanka's most trusted home services marketplace. We connect homeowners with verified professionals to guarantee quality services, fair prices, and total peace of mind.
            </p>

            <div className="flex gap-4">
              <Link href="/" className="px-8 py-4 bg-white text-[#1E103C] font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full aspect-[4/3] animate-float">
              <img
                src="/hero-worker.jpg"
                alt="Professional Worker"
                className="w-full h-full object-cover object-top rounded-[2rem] border-2 border-white/20 shadow-[0_20px_50px_rgba(124,58,237,0.4)]"
              />
              <div className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-2xl animate-float-reverse shadow-2xl flex items-center gap-4 border border-white/20">
                <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center text-2xl border border-green-400/40">🛠️</div>
                <div>
                  <p className="font-bold text-white">Expert Tradesmen</p>
                  <p className="text-sm text-gray-300">Verified & Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="py-24 px-6 relative bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1 animate-fade-in-up">
            <img
              src="/mission-home.jpg"
              alt="Beautiful Home"
              className="w-[85%] aspect-[4/3] object-cover rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            />
            <div className="absolute -bottom-8 -right-4 lg:-right-10 glass-panel p-8 rounded-3xl w-[280px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-float border-t border-l border-white/30 group hover:border-purple-400/60 transition-colors duration-500 bg-black/20">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">🌟</div>
              <p className="text-xl font-bold text-white leading-snug">
                Trusted by over <br />
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 block my-2">
                  50,000+
                </span>
                homeowners.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-pink-300 text-sm font-black tracking-[0.2em] uppercase mb-4">Our Mission</div>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-tight mb-8 drop-shadow-md">
              Making Home Repairs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">Simple, Safe & Reliable</span>
            </h2>
            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              We believe finding reliable home services shouldn't be a game of chance. Our platform empowers homeowners to connect directly with highly skilled, fully verified professionals in their local area.
            </p>
            <p className="text-lg text-gray-200 leading-relaxed border-l-4 border-purple-400 pl-6 bg-white/10 py-4 rounded-r-xl shadow-inner">
              Whether you need a quick plumbing fix, a complete electrical rewiring, or custom carpentry, we've engineered a seamless experience to help you compare options and hire with absolute confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-md">Why Choose SourceTradesman?</h2>
            <p className="text-xl text-gray-300">
              We've engineered the ultimate platform that both homeowners and professionals absolutely trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-3xl transition-all duration-500 cursor-default group bg-white/5 hover:bg-white/10"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px -10px ${f.color}50`;
                  e.currentTarget.style.borderColor = `${f.color}90`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `linear-gradient(135deg, ${f.color}30, ${f.color}50)`, color: f.color, boxShadow: `0 10px 20px ${f.color}40` }}
                >
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300" style={{ backgroundImage: `linear-gradient(to right, #fff, ${f.color})` }}>
                  {f.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-20 px-6 relative border-y border-white/10 bg-[#0A0514]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((s, i) => (
              <div key={i} className="text-center group cursor-default p-6 rounded-3xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 border border-transparent hover:border-white/10">
                <div
                  className="text-4xl lg:text-6xl font-black mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: s.color, textShadow: `0 0 40px ${s.color}60` }}
                >
                  {s.value}
                </div>
                <p className="text-sm lg:text-base text-gray-300 font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 glass-panel p-12 lg:p-20 rounded-[3rem] border-t-2 border-purple-400/40 bg-[#160B29]/60">
          <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-md">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Whether you need a professional or want to offer your services, join thousands of satisfied users today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all duration-300 backdrop-blur-md border border-white/30 hover:scale-105">
              Browse Jobs
            </Link>
            <Link href="/jobs/new" className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(236,72,153,0.7)] hover:scale-105">
              Post a Job →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}