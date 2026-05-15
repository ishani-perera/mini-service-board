import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-soft)', color: 'var(--text-body)' }} className="pt-20 pb-10">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <span className="font-semibold text-lg tracking-tight" style={{color: 'var(--text-heading)'}}>
                Source<span style={{color: 'var(--accent-2)', marginLeft: 6}}>Tradesman</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{color: 'var(--text-body)'}}>
              Connecting Sri Lanka's finest tradespeople with homeowners who value quality, reliability, and professional service.
            </p>
            <div className="flex gap-4">
               <a className="w-8 h-8 rounded-full" style={{background: 'var(--accent-3)', color: 'white'}} href="#" aria-hidden>🔗</a>
               <a className="w-8 h-8 rounded-full" style={{background: 'var(--primary)', color: 'white'}} href="#" aria-hidden>🔗</a>
               <a className="w-8 h-8 rounded-full" style={{background: 'var(--accent)', color: 'white'}} href="#" aria-hidden>🔗</a>
            </div>
          </div>

          <div>
            <h4 className="uppercase mb-6" style={{color: 'var(--text-heading)', fontSize: 12, letterSpacing: '0.08em'}}>Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm" style={{color: 'var(--text-body)'}}>Browse Services</Link></li>
              <li><Link href="/jobs/new" className="text-sm" style={{color: 'var(--text-body)'}}>Post a Job</Link></li>
              <li><Link href="/login" className="text-sm" style={{color: 'var(--text-body)'}}>Tradesman Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase mb-6" style={{color: 'var(--text-heading)', fontSize: 12, letterSpacing: '0.08em'}}>Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm" style={{color: 'var(--text-body)'}}>Help Center</Link></li>
              <li><Link href="#" className="text-sm" style={{color: 'var(--text-body)'}}>Safety & Security</Link></li>
              <li><Link href="#" className="text-sm" style={{color: 'var(--text-body)'}}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase mb-6" style={{color: 'var(--text-heading)', fontSize: 12, letterSpacing: '0.08em'}}>Newsletter</h4>
            <p className="text-sm mb-4" style={{color: 'var(--text-body)'}}>Get the latest home maintenance tips.</p>
            <div className="flex gap-2">
               <input type="text" placeholder="Email" className="flex-1 px-4 py-3 rounded-lg" style={{background: 'white', border: '1px solid var(--border)', color: 'var(--text-body)'}} />
               <button className="px-4 py-3 rounded-lg" style={{background: 'linear-gradient(90deg,var(--accent),var(--accent-2))', color: 'white'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
               </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{borderTop: '1px solid var(--border)'}}>
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>© 2026 SourceTradesman. All rights reserved.</p>
          <div className="flex gap-8">
             <Link href="#" className="text-xs" style={{color: 'var(--text-body)'}}>Privacy Policy</Link>
             <Link href="#" className="text-xs" style={{color: 'var(--text-body)'}}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
