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
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section style={{ padding: '120px 20px 80px', background: '#ffffff', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(124,58,237,0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(236,72,153,0.05)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        
        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 99, padding: '6px 18px', marginBottom: 28, boxShadow: '0 4px 12px rgba(124,58,237,0.05)' }}>
            <span style={{ fontSize: 15 }}>👋</span>
            <span style={{ color: '#6d28d9', fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Our Story</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Transforming How Sri Lanka <br />
            <span style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Maintains Its Homes
            </span>
          </h1>
          
          <p style={{ color: '#475569', fontSize: 19, maxWidth: 650, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            SourceTradesman is Sri Lanka's most trusted home services marketplace. We connect homeowners with verified professionals to guarantee quality services, fair prices, and total peace of mind.
          </p>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section style={{ padding: '100px 20px', position: 'relative' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ color: '#ec4899', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Our Mission</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#0f172a', marginBottom: 24, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Making Home Repairs Simple, Safe & Reliable
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 20, fontWeight: 500 }}>
                We believe finding reliable home services shouldn't be a game of chance. Our platform empowers homeowners to connect directly with highly skilled, fully verified professionals in their local area.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', fontWeight: 500 }}>
                Whether you need a quick plumbing fix, a complete electrical rewiring, or custom carpentry, we've engineered a seamless experience to help you compare options, read genuine reviews, and hire with absolute confidence.
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #ffffff, #fdf2f8)',
              border: '1px solid rgba(236,72,153,0.15)',
              borderRadius: 32, padding: 56, textAlign: 'center',
              boxShadow: '0 24px 48px -12px rgba(236,72,153,0.15)',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 80, marginBottom: 24, filter: 'drop-shadow(0 12px 24px rgba(236,72,153,0.3))' }}>🌟</div>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>
                Trusted by over <span style={{ color: '#ec4899' }}>50,000+</span> homeowners across Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section style={{ padding: '100px 20px', background: '#ffffff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Why Choose SourceTradesman?
            </h2>
            <p style={{ color: '#64748b', fontSize: 18, maxWidth: 500, margin: '0 auto', fontWeight: 500 }}>
              We've engineered the ultimate platform that both homeowners and professionals absolutely trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1px solid rgba(226,232,240,0.8)',
                borderRadius: 24,
                padding: '32px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 24px 48px -12px ${f.color}20, 0 8px 16px -4px ${f.color}10`;
                e.currentTarget.style.borderColor = `${f.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: f.bg, color: f.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 24,
                  boxShadow: `0 8px 16px ${f.color}15`,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 19, color: '#0f172a', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section style={{ padding: '100px 20px', background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} style={{
                background: '#ffffff', border: '1px solid rgba(226,232,240,0.8)',
                borderRadius: 24, padding: '40px 20px', textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${s.color}15`; e.currentTarget.style.borderColor = `${s.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)'; }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 12, letterSpacing: '-0.04em' }}>{s.value}</div>
                <p style={{ fontSize: 15, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(124,58,237,0.15) 0%, transparent 60%)' }} />
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