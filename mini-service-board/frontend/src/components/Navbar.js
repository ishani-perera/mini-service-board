'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/',         label: 'Home' },
    { href: '/about',    label: 'About' },
    { href: '/services', label: 'Services' },
  ];

  return (
    <>
      <nav
        className="sticky top-0 z-50 nav-gradient nav-shadow"
        style={{
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="site-container">
          <div className="flex justify-between items-center h-[72px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'linear-gradient(135deg, #facc15, #f97316)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                className="group-hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 9 8l6 6-4 6" />
                </svg>
              </div>
              <span className="logo-text">
                Source<span className="logo-accent">Tradesman</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-7">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${pathname === href ? 'active' : ''}`}
                >
                  {label}
                </Link>
              ))}

              <Link href="/jobs/new" className="nav-cta btn-touch">
                Join Now
              </Link>

              {user ? (
                <div
                  className="flex items-center gap-3"
                  style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 20 }}
                >
                  <div
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 13, color: '#fff',
                      boxShadow: '0 2px 10px rgba(167,139,250,0.4)',
                    }}
                  >
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1 }}>Signed in</p>
                    <p style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginTop: 2 }}>{user.name}</p>
                  </div>
                  <button
                    onClick={logout}
                    title="Logout"
                    style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#fca5a5'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  style={{
                    fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                >
                  Login
                </Link>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="lg:hidden btn-touch"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                cursor: 'pointer', transition: 'background 0.2s ease',
              }}
            >
              <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s ease', transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s ease', opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s ease', transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div style={{
          maxHeight: mobileOpen ? 400 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(.2,.8,.2,1)',
          borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}>
          <div className="site-container" style={{ paddingTop: 16, paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '10px 14px', borderRadius: 10,
                  color: pathname === href ? '#facc15' : 'rgba(255,255,255,0.85)',
                  fontWeight: 600, fontSize: 15,
                  background: pathname === href ? 'rgba(255,255,255,0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                  display: 'block',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/jobs/new"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: 8,
                background: 'linear-gradient(90deg, #f97316, #facc15)',
                color: '#1a0a00', fontWeight: 800, fontSize: 15,
                padding: '12px 20px', borderRadius: 99,
                textAlign: 'center', display: 'block',
                boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
              }}
            >
              Join Now
            </Link>
            {!user && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: 14,
                  padding: '10px 14px', display: 'block', textAlign: 'center',
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}