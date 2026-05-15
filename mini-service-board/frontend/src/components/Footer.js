"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1a1654 0%, #130f3f 60%, #0d0a2e 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative top edge */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(251,146,60,0.4), transparent)',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', right: '10%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 32px' }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '56px',
        }}>

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <span style={{
                fontWeight: 800, fontSize: '22px', letterSpacing: '-0.03em',
                color: '#ffffff', fontFamily: 'Georgia, serif',
              }}>
                Source<span style={{
                  background: 'linear-gradient(90deg, #fb923c, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Tradesman</span>
              </span>
            </Link>

            <p style={{
              fontSize: '14px', lineHeight: '1.7',
              color: 'rgba(255,255,255,0.5)', marginBottom: '24px', maxWidth: '240px',
            }}>
              Connecting Sri Lanka's finest tradespeople with homeowners who value quality and reliable service.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                {
                  label: 'Twitter',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3s-1 .5-2 1c-1 .5-2 .5-3 0 0 0-1 2-3 3-1 1-3 1-4 0 0 0-1 2-3 2-2 0-3-1-3-2 0 0 0-1 0-2 0-1 .5-2 1-2C3 3 2 4 2 6c0 2 1 5 4 7-1 0-2 0-2 1 0 2 2 3 4 3-1 1-2 1-3 1 2 1 4 1 7 1 8 0 12-6 12-11v-1c0-1 0-2-1-2z"/></svg>,
                },
                {
                  label: 'Instagram',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
                },
                {
                  label: 'Facebook',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(251,146,60,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(251,146,60,0.5)';
                    e.currentTarget.style.color = '#fb923c';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '20px',
            }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Browse Services', href: '/' },
                { label: 'Post a Job', href: '/jobs/new' },
                { label: 'Tradesman Login', href: '/login' },
                { label: 'How It Works', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fb923c'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '20px',
            }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Help Center', href: '#' },
                { label: 'Safety & Security', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'Dispute Resolution', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fb923c'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '20px',
            }}>Newsletter</h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', lineHeight: '1.6' }}>
              Home tips & exclusive offers, straight to your inbox.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                style={{
                  width: '100%', padding: '11px 16px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.07)',
                  color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                }}
              />
              <button
                aria-label="Subscribe to newsletter"
                style={{
                  padding: '11px 20px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(90deg, #fb923c, #f472b6)',
                  color: '#fff', fontWeight: 700, fontSize: '14px',
                  cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          marginBottom: '28px',
        }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2026 SourceTradesman. All rights reserved. Made with ♥ in Sri Lanka.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(label => (
              <Link
                key={label}
                href="#"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >{label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}