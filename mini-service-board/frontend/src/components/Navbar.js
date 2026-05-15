'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 nav-gradient" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="site-container nav-shadow">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div style={{ color: 'var(--white)' }} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 9 8l6 6-4 6" /></svg>
            </div>
            <span className="logo-gradient text-2xl tracking-tight">
              Source<span style={{ color: 'rgba(255,255,255,0.95)', marginLeft: 6 }}>Tradesman</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/services" className="nav-link">Services</Link>
            
            <Link
              href="/jobs/new"
              className="nav-cta"
            >
              Join Now
            </Link>

            {user ? (
              <div className="flex items-center gap-4" style={{ borderLeft: '0.5px solid var(--border)', paddingLeft: 20 }}>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold" style={{color: 'var(--nav-text)', textTransform: 'uppercase'}}>Logged in as</p>
                        <p className="text-xs font-semibold" style={{color: 'var(--nav-text)'}}>{user.name}</p>
                    </div>
                 <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                 </button>
               </div>
            ) : (
              <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                Login
              </Link>
            )}

            {/* language selector removed */}
          </div>
        </div>
      </div>
    </nav>
  );
}
