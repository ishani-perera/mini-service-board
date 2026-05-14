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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="font-black text-xl tracking-tight text-slate-800">
              Service<span className="text-blue-600">Board</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
               <button 
                onClick={() => changeLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 EN
               </button>
               <button 
                onClick={() => changeLang('si')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'si' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 සිං
               </button>
               <button 
                onClick={() => changeLang('ta')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'ta' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 தம
               </button>
            </div>

            <Link 
              href="/" 
              className={`text-sm font-bold transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {t.latestRequests}
            </Link>
            <Link 
              href="/jobs/new" 
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.95]"
            >
              {t.postJob}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-100 pl-8">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Logged in as</p>
                    <p className="text-xs font-black text-slate-800">{user.name}</p>
                 </div>
                 <button 
                  onClick={logout}
                  className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Logout"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                 </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"
              >
                {t.login}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
