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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 relative flex items-center justify-center p-6">
        {/* Soft Blurred Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 blur-md grayscale-[0.2]"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000)',
          }}
        />
        
        {/* Soft Overlay */}
        <div className="absolute inset-0 z-10 bg-white/60" />

        {/* Compact Login Card */}
        <div className="relative z-20 w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Tradesman Login</h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Management Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
               <div className="inline-block bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Demo Access</p>
                  <p className="text-xs font-bold text-slate-600">admin@example.com / 123456</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
