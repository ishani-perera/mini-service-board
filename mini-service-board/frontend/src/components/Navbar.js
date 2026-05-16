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
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
  ];

  return (
    <>
      {/* ── Navbar Wrapper ── */}
      {/* fixed, top-0, w-full දාලා තියෙන්නේ Hero Image එක උඩින් ලස්සනට පාවෙන්න */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-[#0A0510]/80 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-gradient-to-b from-[#0A0510]/70 to-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-[76px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  // Logo icon background updated to match the new theme (Blue to Purple)
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(139,92,246,0.4)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                className="group-hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 9 8l6 6-4 6" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Source<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Tradesman</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-8">

              {/* Menu Links (Clean White with Light Purple Hover) */}
              <div className="flex items-center gap-6">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-[15px] font-semibold transition-all duration-200 ${pathname === href
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'text-white/70 hover:text-[#A855F7]'
                      }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Join Now Button (Modern Pill-shaped Blue/Purple Gradient) */}
              <Link
                href="/jobs/new"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-[14px] tracking-wide shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Join Now
              </Link>

              {/* ── User/Auth Section ── */}
              {user ? (
                <div
                  className="flex items-center gap-3 pl-6"
                  style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14, color: '#fff',
                      boxShadow: '0 2px 10px rgba(139,92,246,0.4)',
                    }}
                  >
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1 }}>Signed in</p>
                    <p style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginTop: 2 }}>{user.name}</p>
                  </div>
                  <button
                    onClick={logout}
                    title="Logout"
                    style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginLeft: 4
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="pl-6 border-l border-white/10 flex items-center">
                  <Link
                    href="/login"
                    style={{
                      fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}