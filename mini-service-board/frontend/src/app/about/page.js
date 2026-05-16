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
  { value: '50K+', label: 'Jobs Completed',       color: '#7c3aed' },
  { value: '10K+', label: 'Verified Experts',     color: '#ec4899' },
  { value: '98%',  label: 'Satisfaction Rate',    color: '#0ea5e9' },
  { value: '24/7', label: 'Customer Support',     color: '#f59e0b' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', fontFamily: "'Inter', sans-serif", color: '#ffffff' }}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section style={{ 
        padding: '160px 20px 120px', 
        background: 'linear-gradient(to right, #4C1D95, #7C3AED, #EC4899)', // Requested Hero Gradient
        position: 'relative', 
        overflow: 'hidden',
      }}>
        {/* Background Image Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("/premium_home_services_bg_1778945753748.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          mixBlendMode: 'overlay',
          pointerEvents: 'none'
        }} />

        {/* Aurora Blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '0%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(232,121,249,0.3)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        
        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 99, padding: '8px 20px', marginBottom: 32 }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Premium Story</span>
          </div>
          
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(3rem, 7vw, 5.2rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: 28, letterSpacing: '-0.04em', textShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            Transforming How Sri Lanka <br />
            <span style={{ color: '#FBCFE8' }}>
              Maintains Its Homes
            </span>
          </h1>
          
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 22, maxWidth: 750, margin: '0 auto', lineHeight: 1.6, fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            SourceTradesman is Sri Lanka's most trusted home services marketplace. We connect homeowners with verified professionals to guarantee quality services, fair prices, and total peace of mind.
          </p>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section style={{ 
        padding: '120px 20px', 
        position: 'relative',
        background: 'linear-gradient(to bottom right, #020617, #111827, #312E81)', // Requested Story Section Gradient
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 50%, rgba(124,58,237,0.15), transparent 70%)' }} />
        <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ color: '#F9A8D4', fontSize: 14, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Our Mission</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: 24, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Making Home Repairs <br />Simple, Safe & Reliable
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: 24, fontWeight: 500 }}>
                We believe finding reliable home services shouldn't be a game of chance. Our platform empowers homeowners to connect directly with highly skilled, fully verified professionals in their local area.
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                Whether you need a quick plumbing fix, a complete electrical rewiring, or custom carpentry, we've engineered a seamless experience to help you compare options, hire with absolute confidence.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(30,41,59,0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 40, padding: '60px 40px', textAlign: 'center',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 60px 100px -30px rgba(124,58,237,0.4)'; e.currentTarget.style.border = '1px solid rgba(124,58,237,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(0,0,0,0.5)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'; }}
            >
              <div style={{ fontSize: 90, marginBottom: 24, filter: 'drop-shadow(0 20px 40px rgba(124,58,237,0.4))' }}>🌟</div>
              <p style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', lineHeight: 1.3 }}>
                Trusted by over <br /><span style={{ color: '#E879F9', fontSize: '1.4em' }}>50,000+</span> <br />homeowners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section style={{ 
        padding: '120px 20px', 
        background: 'linear-gradient(to right, #0F172A, #1E1B4B, #581C87)', // Requested Features Section Gradient
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '120%', height: '100%', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: 20, letterSpacing: '-0.02em' }}>
              Why Choose SourceTradesman?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20, maxWidth: 600, margin: '0 auto', fontWeight: 500 }}>
              We've engineered the ultimate platform that both homeowners and professionals absolutely trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(30,41,59,0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 32,
                padding: '40px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = `0 40px 80px -20px ${f.color}40`;
                e.currentTarget.style.borderColor = `${f.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.2)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: `linear-gradient(135deg, ${f.color}20, ${f.color}40)`, color: f.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, marginBottom: 28,
                  boxShadow: `0 12px 24px ${f.color}30`,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 22, color: '#ffffff', marginBottom: 16 }}>{f.title}</h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: 500 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section style={{ 
        padding: '120px 20px', 
        background: 'linear-gradient(to right, #312E81, #6D28D9, #C026D3)' // Requested Stats Section Gradient
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24, padding: '40px 20px', textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${s.color}25`; e.currentTarget.style.borderColor = `${s.color}60`; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 12, letterSpacing: '-0.04em' }}>{s.value}</div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '120px 20px', textAlign: 'center', background: 'linear-gradient(to bottom right, #020617, #111827, #000000)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: 20, letterSpacing: '-0.02em' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 20, marginBottom: 48, fontWeight: 500 }}>
            Whether you need a professional or want to offer your services, join thousands of satisfied users today.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              display: 'inline-flex', background: '#ffffff', color: '#0f172a', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 99, textDecoration: 'none', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Browse Jobs
            </Link>
            <Link href="/jobs/new" style={{
              display: 'inline-flex', background: 'linear-gradient(90deg, #7c3aed, #ec4899)', color: '#fff', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 99, textDecoration: 'none', transition: 'transform 0.2s ease, box-shadow 0.2s ease', boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.3)'; }}
            >
              Post a Job →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}