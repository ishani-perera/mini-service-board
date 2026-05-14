'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    if (success) {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-900 animate-gradient-slow" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 z-10 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Login Card */}
        <div className="relative z-20 w-full max-w-[460px] animate-in fade-in zoom-in duration-700">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[3rem] border border-white/40 p-10 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-purple-500/40 rotate-3 hover:rotate-0 transition-transform duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em]">Service Portal Login</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] pl-12 pr-4 py-4 text-sm outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-700"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] pl-12 pr-4 py-4 text-sm outline-none focus:bg-white focus:border-purple-500/20 focus:ring-4 focus:ring-purple-500/5 transition-all font-bold text-slate-700"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-[1.5rem] font-black text-sm hover:shadow-2xl hover:shadow-purple-500/40 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
              >
                {loading ? 'Verifying...' : 'Sign In Now'}
                {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
              </button>
            </form>
...

            <div className="mt-10 pt-8 border-t border-slate-200/50 text-center">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Demo Credentials</p>
               <div className="inline-flex flex-col items-center gap-1 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                  <p className="text-xs font-black text-slate-600">admin@example.com</p>
                  <p className="text-[10px] font-bold text-slate-400">Password: 123456</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
