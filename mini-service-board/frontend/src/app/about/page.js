'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';

const FEATURES = [
  { icon: '✅', title: 'Verified Professionals', desc: 'All tradespeople are verified and background checked for your safety.', grad: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#065f46' },
  { icon: '⭐', title: 'Quality Guaranteed', desc: 'Rated professionals with proven track records and customer reviews.', grad: 'linear-gradient(135deg,#fef9c3,#fde68a)', color: '#854d0e' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges — get fair quotes from multiple professionals.', grad: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1d4ed8' },
  { icon: '⏱️', title: 'Quick Response', desc: 'Get multiple job bids within 24 hours from available professionals.', grad: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', color: '#5b21b6' },
  { icon: '🛡️', title: 'Secure & Safe', desc: 'Secure payment processing and protection for both parties.', grad: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#9d174d' },
  { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer support to resolve any issues fast.', grad: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#166534' },
];

const STATS = [
  { value: '50K+', label: 'Jobs Completed',       color: '#7c3aed' },
  { value: '10K+', label: 'Verified Professionals', color: '#ec4899' },
  { value: '95%',  label: 'Customer Satisfaction', color: '#2dd4bf' },
  { value: '24/7', label: 'Customer Support',      color: '#f97316' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e0a4a 0%, #2d1282 45%, #7c3aed 100%)',
        padding: '80px 0 100px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '10%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '5%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, transparent, var(--bg-page))', pointerEvents: 'none' }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Our Story
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
            About{' '}
            <span style={{ background: 'linear-gradient(90deg, #facc15, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SourceTradesman
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, maxWidth: 580, lineHeight: 1.7 }}>
            Sri Lanka's most trusted home services marketplace connecting homeowners with verified professionals. Quality services, fair prices, peace of mind.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 18, lineHeight: 1.2 }}>
                Making Home Repairs Simple & Reliable
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-body)', marginBottom: 16 }}>
                We believe finding reliable home services shouldn't be complicated or risky. Our platform empowers homeowners to connect directly with skilled, verified professionals in their area.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-body)' }}>
                Whether you need an electrician, plumber, carpenter, or any other tradesperson, we've made it easy to compare options, read reviews, and hire with confidence.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f5f0ff, #fdf0fa)',
              border: '1.5px solid rgba(124,58,237,0.1)',
              borderRadius: 24, padding: 48, textAlign: 'center',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(124,58,237,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏠</div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.35 }}>
                Trusted by 50,000+ homeowners across Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f5f0ff 0%, #faf8ff 100%)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-tag">Why Choose Us</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 12 }}>
              Why Choose SourceTradesman?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 420, margin: '0 auto' }}>
              We've built the platform homeowners and professionals trust
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card-clean" style={{ padding: 28 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: f.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16, transition: 'transform 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--text-heading)', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '72px 0' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                background: '#fff', border: '1.5px solid rgba(124,58,237,0.08)',
                borderRadius: 20, padding: '32px 20px', textAlign: 'center',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,0.12)'; e.currentTarget.style.borderColor = `${s.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.08)'; }}
              >
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.6rem', fontWeight: 800, color: s.color, lineHeight: 1.1, marginBottom: 8 }}>{s.value}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '72px 0 96px' }}>
        <div className="site-container">
          <div style={{
            background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #db2777 80%, #f97316 100%)',
            borderRadius: 28, padding: 'clamp(36px, 6vw, 60px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-40%', left: '-10%', width: '50%', height: '180%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
                Ready to Get Started?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, maxWidth: 440, margin: '0 auto 30px', lineHeight: 1.65 }}>
                Whether you need a professional or want to offer your services, join thousands of satisfied users today.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/"
                  style={{ background: '#fff', color: '#4c1d95', padding: '13px 28px', borderRadius: 99, fontWeight: 800, fontFamily: "'Syne', sans-serif", fontSize: 15, textDecoration: 'none', transition: 'all 0.2s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >Browse Jobs</Link>
                <Link href="/jobs/new"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)', padding: '12px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >Post a Job</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}