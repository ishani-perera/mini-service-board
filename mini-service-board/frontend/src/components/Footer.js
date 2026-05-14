import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <span className="font-black text-2xl tracking-tight text-white">
                Source<span className="text-[#7B81D8]">Tradesman</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Connecting Sri Lanka's finest tradespeople with homeowners who value quality, reliability, and professional service.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"></div>
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"></div>
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"></div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-slate-500">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Browse Services</Link></li>
              <li><Link href="/jobs/new" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Tradesman Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-slate-500">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Safety & Security</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-slate-500">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest home maintenance tips.</p>
            <div className="flex gap-2">
               <input type="text" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-[#7B81D8]" />
               <button className="bg-[#5B63B1] px-4 py-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
               </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-500">© 2026 SourceTradesman. All rights reserved.</p>
          <div className="flex gap-8">
             <Link href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
