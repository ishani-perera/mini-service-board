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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=80&w=2000)',
          }}
        />
        <div className="absolute inset-0 z-10 bg-slate-900/40 backdrop-blur-[2px]" />

        {/* Login Card */}
        <div className="relative z-20 w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-10 shadow-2xl shadow-black/20">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-600/30">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tradesman Login</h1>
              <p className="text-slate-500 mt-2 font-medium">Access your professional dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[13px] font-black text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[13px] font-black text-slate-700 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Signing in...
                  </span>
                ) : 'Sign In to Portal'}
              </button>
            </form>

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
