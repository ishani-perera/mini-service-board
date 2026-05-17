'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0A0510]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-gradient-to-b from-[#0A0510]/80 to-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-[76px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              <div
                style={{
                  width: 36, height: 36, borderRadius: 10,
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

            {/* ── Mobile Menu Toggle Button ── */}
            <button
              className="lg:hidden text-white z-50 p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-8">
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

              <Link
                href="/jobs/new"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-[14px] tracking-wide shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Join Now
              </Link>

              {user ? (
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14, color: '#fff',
                    }}
                  >
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Signed in</p>
                    <p style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{user.name}</p>
                  </div>
                  <button onClick={logout} className="ml-4 text-white/60 hover:text-red-400 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                  </button>
                </div>
              ) : (
                <div className="pl-6 border-l border-white/10 flex items-center">
                  <Link href="/login" className="text-[14px] font-bold text-white/70 hover:text-white transition-colors">
                    Login
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── Mobile Nav Menu (Dropdown) ── */}
        <div
          className={`lg:hidden absolute top-[76px] left-0 w-full bg-[#0A0510]/98 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
        >
          <div className="flex flex-col items-center gap-6 px-6">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold w-full text-center ${pathname === href ? 'text-white' : 'text-white/60 hover:text-[#A855F7]'}`}>
                {label}
              </Link>
            ))}

            <div className="w-full h-px bg-white/10 my-2"></div>

            <Link href="/jobs/new" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
              Join Now
            </Link>

            {user ? (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-center py-3.5 rounded-full border border-red-500/30 text-red-400 font-bold bg-red-500/10">
                Logout ({user.name})
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3.5 rounded-full border border-white/20 text-white font-bold bg-white/5">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}