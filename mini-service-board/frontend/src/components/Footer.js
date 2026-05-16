"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#18103a',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* Colourful glow orbs */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-120px', left: '-60px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: '-40px', right: '5%', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '30%', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 65%)' }} />
      </div>

      {/* Rainbow top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,#a78bfa,#ec4899,#2dd4bf,#fb923c,#a78bfa)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 32px', position: 'relative', zIndex: 1 }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '44px',
          marginBottom: '52px',
        }}>

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '16px', textDecoration: 'none' }}>
              <span style={{ fontWeight: 900, fontSize: '21px', letterSpacing: '-0.03em', fontFamily: 'Georgia, serif', color: '#fff' }}>
                Source<span style={{ background: 'linear-gradient(90deg,#a78bfa,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Tradesman</span>
              </span>
            </Link>
            <p style={{ fontSize: '13.5px', lineHeight: '1.75', color: 'rgba(255,255,255,0.52)', marginBottom: '22px', maxWidth: '220px' }}>
              Connecting Sri Lanka's finest tradespeople with homeowners who value quality and reliable service.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '9px' }}>
              {[
                {
                  label: 'Twitter',
                  bg: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                      <path d="M23 3s-1 .5-2 1c-1 .5-2 .5-3 0 0 0-1 2-3 3-1 1-3 1-4 0 0 0-1 2-3 2-2 0-3-1-3-2 0 0 0-1 0-2 0-1 .5-2 1-2C3 3 2 4 2 6c0 2 1 5 4 7-1 0-2 0-2 1 0 2 2 3 4 3-1 1-2 1-3 1 2 1 4 1 7 1 8 0 12-6 12-11v-1c0-1 0-2-1-2z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  bg: 'linear-gradient(135deg,#ec4899,#be185d)',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  bg: 'linear-gradient(135deg,#2dd4bf,#0d9488)',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: 'YouTube',
                  bg: 'linear-gradient(135deg,#fb923c,#ea580c)',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" stroke="none" />
                    </svg>
                  ),
                },
              ].map(({ label, bg, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, opacity 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.opacity = '0.85';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '18px' }}>
              Platform
            </h4>
            <div style={{ borderLeft: '2px solid rgba(167,139,250,0.35)', paddingLeft: '14px' }}>
              {[
                { label: 'Browse Services', href: '/' },
                { label: 'Post a Job', href: '/jobs/new' },
                { label: 'Tradesman Login', href: '/login' },
                { label: 'How It Works', href: '#' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'block', padding: '4px 0', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#a78bfa'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: '18px' }}>
              Support
            </h4>
            <div style={{ borderLeft: '2px solid rgba(45,212,191,0.35)', paddingLeft: '14px' }}>
              {[
                { label: 'Help Center', href: '#' },
                { label: 'Safety & Security', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'Dispute Resolution', href: '#' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'block', padding: '4px 0', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#2dd4bf'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#ec4899', marginBottom: '18px' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '14px', lineHeight: '1.65' }}>
              Home tips & exclusive offers delivered to you.
            </p>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '11px 14px', borderRadius: '10px',
                border: '1.5px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff', fontSize: '13.5px', outline: 'none',
                marginBottom: '10px', boxSizing: 'border-box',
              }}
            />
            <button
              aria-label="Subscribe to newsletter"
              style={{
                width: '100%', padding: '11px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(90deg,#a78bfa,#ec4899)',
                color: '#fff', fontWeight: 700, fontSize: '14px',
                cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.86'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Subscribe →
            </button>

            {/* Trust badges */}
            <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2dd4bf', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)' }}>50K+ homeowners trust us</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fb923c', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)' }}>95% satisfaction rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rainbow divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.35), rgba(45,212,191,0.35), rgba(251,146,60,0.35), transparent)',
          marginBottom: '24px',
        }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['#a78bfa', '#ec4899', '#2dd4bf', '#fb923c'].map(c => (
                <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              © 2026 SourceTradesman · Made with love in Sri Lanka
            </p>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(label => (
              <Link
                key={label}
                href="#"
                style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}