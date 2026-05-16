'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

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
            </div>
          </div>
        </nav>
      </>
    );
}