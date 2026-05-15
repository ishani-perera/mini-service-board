'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { lang, changeLang, t } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-blue-600">
               {/* Simplified Wrench Icon */}
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.83 0l.3.3a2 2 0 0 1 0 2.83l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l-10 10a1 1 0 0 1-1.4 0l-1.6-1.6a1 1 0 0 1 0-1.4l10-10z"/></svg>
            </div>
            <span className="font-black text-2xl tracking-tight text-[#5B63B1]">
              Source<span className="text-[#5B63B1]">Tradesman</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">About</Link>
            <Link href="/services" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Services</Link>
            
            <Link 
              href="/jobs/new" 
              className="bg-gradient-to-r from-[#7B81D8] to-[#5B63B1] text-white px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              Join Now
            </Link>

            {user ? (
               <div className="flex items-center gap-4 border-l border-slate-100 pl-8">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Logged in as</p>
                    <p className="text-xs font-black text-slate-800">{user.name}</p>
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

            {/* Language Dropdown Style */}
            <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
               <span className="text-[10px] font-black text-slate-400 uppercase">us</span>
               <select 
                value={lang} 
                onChange={(e) => changeLang(e.target.value)}
                className="text-sm font-bold bg-transparent outline-none cursor-pointer text-slate-700"
               >
                 <option value="en">English ▼</option>
                 <option value="si">සිංහල</option>
                 <option value="ta">தமிழ்</option>
               </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
