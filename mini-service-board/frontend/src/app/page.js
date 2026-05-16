'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';
import JobPreviewModal from '../components/JobPreviewModal';
import FindProfessionalsModal from '../components/FindProfessionalsModal';
import { getJobs } from '../lib/api';

/* ── Service catalogue ───────────────────────────────── */
const SERVICES = [
  { key: 'Plumbing', label: 'Plumbing', icon: '🔧', iconBg: 'rgba(66, 165, 245, 0.2)', color: '#42A5F5' },
  { key: 'Electrical', label: 'Electrical', icon: '⚡', iconBg: 'rgba(250, 204, 21, 0.2)', color: '#facc15' },
  { key: 'Painting', label: 'Painting', icon: '🎨', iconBg: 'rgba(244, 114, 182, 0.2)', color: '#f472b6' },
  { key: 'Joinery', label: 'Joinery', icon: '🪚', iconBg: 'rgba(52, 211, 153, 0.2)', color: '#34d399' },
  { key: 'Roofing', label: 'Roofing', icon: '🏠', iconBg: 'rgba(126, 87, 194, 0.2)', color: '#7E57C2' },
  { key: 'Gardening', label: 'Gardening', icon: '🌿', iconBg: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' },
  { key: 'Cleaning', label: 'Cleaning', icon: '✨', iconBg: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' },
  { key: 'AC Technicians', label: 'AC Tech', icon: '❄️', iconBg: 'rgba(125, 211, 252, 0.2)', color: '#7dd3fc' },
  { key: 'Masons', label: 'Masons', icon: '🧱', iconBg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' },
  { key: 'Pest Control', label: 'Pest Control', icon: '🐛', iconBg: 'rgba(249, 168, 212, 0.2)', color: '#f9a8d4' },
  { key: 'Interior', label: 'Interior', icon: '🛋️', iconBg: 'rgba(106, 27, 154, 0.2)', color: '#6A1B9A' },
  { key: 'Other', label: 'Other', icon: '🔨', iconBg: 'rgba(148, 163, 184, 0.2)', color: '#94a3b8' },
];

const STATS = [
  { value: '50K+', label: 'Jobs Completed', icon: '🏆', color: '#7E57C2' },
  { value: '10K+', label: 'Verified Pros', icon: '🛡️', color: '#42A5F5' },
  { value: '95%', label: 'Satisfaction Rate', icon: '⭐', color: '#facc15' },
  { value: '24/7', label: 'Support', icon: '🎧', color: '#34d399' },
];

const MARKET_RATES = [
  { title: 'Electrical', icon: '⚡', color: '#facc15', items: [['Light Fixture', 'Rs1,000–3,000'], ['House Rewiring', 'Rs80,000+']] },
  { title: 'Plumbing', icon: '🔧', color: '#42A5F5', items: [['Pipe Repair', 'Rs3,000–8,000'], ['Water Tank', 'Rs40,000+']] },
  { title: 'Painting', icon: '🎨', color: '#f472b6', items: [['Per Sq Ft', 'Rs80–150'], ['Full Room', 'Rs10,000+']] },
  { title: 'Joinery', icon: '🪚', color: '#34d399', items: [['Door Hang', 'Rs2,500+'], ['Wardrobe', 'Rs45,000+']] },
  { title: 'Roofing', icon: '🏠', color: '#7E57C2', items: [['Leak Repair', 'Rs5,000+'], ['Tile Replace', 'Rs15,000+']] },
  { title: 'Gardening', icon: '🌿', color: '#4ade80', items: [['Lawn Mowing', 'Rs2,000+'], ['Landscaping', 'Rs20,000+']] },
  { title: 'Cleaning', icon: '✨', color: '#38bdf8', items: [['Deep Clean', 'Rs8,000+'], ['Sofa Wash', 'Rs3,500+']] },
  { title: 'AC Tech', icon: '❄️', color: '#7dd3fc', items: [['AC Service', 'Rs3,500+'], ['Installation', 'Rs8,000+']] },
  { title: 'Masons', icon: '🧱', color: '#fbbf24', items: [['Wall Build', 'Rs250/sqft'], ['Tiling', 'Rs120/sqft']] },
  { title: 'Pest Control', icon: '🐛', color: '#f9a8d4', items: [['General Pest', 'Rs4,000+'], ['Termite', 'Rs12,000+']] },
  { title: 'Interior', icon: '🛋️', color: '#6A1B9A', items: [['Consultation', 'Rs5,000+'], ['3D Design', 'Rs25,000+']] },
  { title: 'Other', icon: '🔨', color: '#94a3b8', items: [['Lock Replace', 'Rs1,500+'], ['Appliance Fix', 'Rs2,500+']] },
];

const FEATURES = [
  { icon: '🛡️', title: 'Verified Pros', desc: 'Every tradesman is background checked and identity verified for your security.', color: '#7E57C2' },
  { icon: '💰', title: 'Fair Pricing', desc: 'Compare multiple quotes and choose the best value for your project budget.', color: '#42A5F5' },
  { icon: '⭐', title: 'Real Reviews', desc: 'Read honest feedback from homeowners who used the service before you hire.', color: '#facc15' },
];

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Closed'];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState('0');
  useEffect(() => {
    if (!start) return;
    if (target === '24/7') { setCount('24/7'); return; }
    const num = parseInt(target.replace(/\D/g, ''), 10);
    const suffix = target.replace(/[\d]/g, '');
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function ServiceCard({ service, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
    >
      <div style={{
        background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        border: isActive ? `1.5px solid ${service.color}` : hovered ? `1.5px solid ${service.color}80` : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 24, padding: '32px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, position: 'relative', overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px -10px ${service.color}40` : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${service.color}, #7E57C2)`,
          opacity: isActive || hovered ? 1 : 0, transition: 'opacity 0.3s ease',
        }} />
        <div style={{
          width: 80, height: 80, borderRadius: 24, background: service.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38,
          transition: 'all 0.4s ease', transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
          boxShadow: hovered ? `0 0 20px ${service.color}40` : 'none', border: `1px solid ${service.color}30`,
        }}>
          {service.icon}
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 17, color: '#ffffff', m: 0 }}>{service.label}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: service.color, opacity: hovered ? 1 : 0.6, transition: 'all 0.3s ease' }}>Explore →</p>
      </div>
    </button>
  );
}

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isFindProOpen, setIsFindProOpen] = useState(false);
  const statsRef = useRef(null);
  const latestRequestsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const params = {};
        if (categoryFilter !== 'All') params.category = categoryFilter;
        const res = await getJobs(params);
        const fetchedData = res.data?.data || res.data;
        setJobs(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) { console.error(err); setJobs([]); }
      finally { setLoading(false); }
    }
    fetchJobs();
  }, [categoryFilter]);

  function handleServiceClick(serviceKey) {
    setCategoryFilter(prev => prev === serviceKey ? 'All' : serviceKey);
    setFilter('All');
    setTimeout(() => latestRequestsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  function scrollToJobs() {
    setCategoryFilter('All');
    setTimeout(() => latestRequestsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  const filteredJobs = jobs.filter(j => {
    const matchStatus = filter === 'All' || (filter === 'Open' && j.status === 'Open') || (filter === 'In Progress' && j.status === 'In Progress') || (filter === 'Closed' && j.status === 'Closed');
    const matchSearch = !search || j.title?.toLowerCase().includes(search.toLowerCase()) || j.category?.toLowerCase().includes(search.toLowerCase()) || j.location?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-[#120524] min-h-screen text-white font-sans overflow-x-hidden relative">
      <style jsx>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        @keyframes float-reverse { 0% { transform: translateY(0px); } 50% { transform: translateY(20px); } 100% { transform: translateY(0px); } }
        @keyframes float-diagonal { 0% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(15px, -20px) scale(1.1); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-float-diagonal { animation: float-diagonal 9s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 5s ease-in-out infinite; }
        
        .glass-panel { background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); }
      `}</style>

      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 px-6 overflow-hidden flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: "url('/home-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#120524]/60 via-[#4527A0]/70 to-[#120524]" />

        <div className="absolute top-[20%] left-[10%] text-5xl animate-float z-10 opacity-80 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hidden md:block">🛠️</div>
        <div className="absolute bottom-[20%] right-[10%] text-6xl animate-float-reverse z-10 opacity-80 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hidden md:block">⚡</div>

        <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 glass-panel rounded-full px-5 py-2 mb-6 shadow-lg border border-[#7E57C2]/50">
            <span>🇱🇰</span>
            <span className="text-sm font-bold tracking-widest uppercase text-[#42A5F5]">Sri Lanka's #1 Home Services</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] tracking-tight mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            Find Trusted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] via-[#7E57C2] to-[#6A1B9A]">Tradespeople</span> Near You
          </h1>
          <p className="text-lg md:text-xl text-purple-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-lg">
            Connect with verified electricians, plumbers, carpenters & more across Sri Lanka, instantly.
          </p>

          <div className="w-full max-w-2xl mx-auto glass-panel rounded-full p-2 flex items-center shadow-[0_15px_50px_rgba(0,0,0,0.6)] focus-within:shadow-[0_0_40px_rgba(66,165,245,0.4)] transition-shadow duration-300 border border-[#7E57C2]/50 mb-10 bg-[#120524]/60">
            <span className="pl-6 text-xl">🔍</span>
            <input type="text" placeholder="What service do you need?" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-[#7E57C2] font-medium text-lg w-full" />
            <button className="px-8 py-3.5 bg-gradient-to-r from-[#42A5F5] to-[#6A1B9A] rounded-full font-bold text-white hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(126,87,194,0.4)] whitespace-nowrap">Search</button>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => setIsFindProOpen(true)} className="px-8 py-3.5 bg-white text-[#4527A0] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">Find Professionals</button>
            <Link href="/jobs/new" className="px-8 py-3.5 bg-black/40 text-white font-bold rounded-full hover:bg-black/60 border border-white/20 transition-all backdrop-blur-md">Join as Professional</Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ── */}
      <section ref={statsRef} className="py-12 border-y border-[#4527A0]/30 bg-[#1A0B2E]/80 backdrop-blur-xl relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => {
              const count = useCountUp(s.value, 1800, statsVisible);
              return (
                <div key={i} className="text-center group">
                  <div className="text-4xl mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6 opacity-90">{s.icon}</div>
                  <div className="text-4xl font-black mb-2 transition-all drop-shadow-md" style={{ color: s.color, textShadow: `0 0 15px ${s.color}60` }}>{count}</div>
                  <div className="text-[#7E57C2] font-bold uppercase tracking-widest text-sm opacity-90">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SERVICES GRID (Sky Violet Mix with Floating Animations) ── */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-[#42A5F5] via-[#7E57C2] to-[#4527A0] overflow-hidden">

        {/* Animated Orbs & Icons for Services Section */}
        <div className="absolute top-[10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-[60px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-[#120524]/30 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="absolute top-[30%] right-[10%] text-6xl text-white/30 animate-float-diagonal hidden lg:block">✨</div>
        <div className="absolute bottom-[20%] left-[10%] text-7xl text-white/20 animate-float-reverse hidden lg:block">⚙️</div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-md text-white">Services We Offer</h2>
            <p className="text-xl text-white/80 font-medium">Browse skilled professionals ready to help</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.key} service={s} isActive={categoryFilter === s.key} onClick={() => handleServiceClick(s.key)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LATEST REQUESTS (Deep Violet + BLURRED BACKGROUND + SIDE ANIMATIONS) ── */}
      <section ref={latestRequestsRef} className="py-24 px-6 relative z-10 overflow-hidden border-t border-[#6A1B9A]/40">

        {/* Blurred Image Background - Reduced Blur to 8px so image is visible! */}
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: "url('/home-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)', transform: 'scale(1.05)' }}
        />

        {/* Deep Violet Gradient Overlay (Lets image show through the middle) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#120524]/95 via-[#4527A0]/60 to-[#120524]/95" />

        {/* Animated Side Orbs & Icons for Latest Requests */}
        <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-[#42A5F5]/30 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-[30%] right-[-10%] w-[400px] h-[400px] bg-[#f472b6]/20 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />

        <div className="absolute top-[15%] left-[5%] text-5xl opacity-40 animate-float hidden lg:block">🚀</div>
        <div className="absolute bottom-[15%] right-[5%] text-5xl opacity-40 animate-float-reverse hidden lg:block">💡</div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#6A1B9A]/60 text-[#42A5F5] border border-[#42A5F5]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#42A5F5] animate-pulse" /> Active Listings
              </div>
              <h2 className="text-4xl md:text-5xl font-black drop-shadow-lg text-white">Latest Requests</h2>
            </div>

            <div className="flex flex-col items-end gap-4">
              {categoryFilter !== 'All' && (
                <div className="flex items-center gap-3">
                  <span className="glass-panel px-4 py-1.5 rounded-full text-sm font-bold text-[#42A5F5] shadow-md border-[#42A5F5]/30 bg-black/40">
                    {SERVICES.find(s => s.key === categoryFilter)?.icon} {SERVICES.find(s => s.key === categoryFilter)?.label}
                  </span>
                  <button onClick={() => setCategoryFilter('All')} className="text-gray-300 hover:text-white text-sm font-bold transition-colors">✕ Clear</button>
                </div>
              )}
              <div className="flex gap-2 glass-panel p-1.5 rounded-full shadow-lg border border-white/20 bg-black/40">
                {STATUS_FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === f ? 'bg-gradient-to-r from-[#42A5F5] to-[#6A1B9A] text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map(n => <SkeletonCard key={n} />)}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-2 border-[#6A1B9A]/50 shadow-lg bg-black/50 backdrop-blur-md">
              <div className="text-6xl mb-6 opacity-50">📋</div>
              <p className="text-xl text-[#7E57C2] font-medium mb-8">No jobs found matching your criteria.</p>
              <Link href="/jobs/new" className="px-8 py-4 bg-white text-[#4527A0] font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
                Post the First Job
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredJobs.map(job => <JobCard key={job._id || job.id} job={job} onClick={() => setSelectedJob(job)} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: MARKET RATES & WHY CHOOSE US (Smooth Deep Violet) ── */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-br from-[#120524] to-[#4527A0]/40 border-t border-[#6A1B9A]/40">
        <div className="max-w-7xl mx-auto">
          {/* Market Rates */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-sm text-white">Average Market Rates</h2>
            <p className="text-xl text-[#7E57C2]">Final prices depend on scope, materials & location</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {MARKET_RATES.map((cat, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group border-[#6A1B9A]/30 bg-black/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform bg-white/5 border border-white/10" style={{ color: cat.color }}>{cat.icon}</div>
                  <h3 className="font-bold text-lg text-white">{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.items.map(([label, price], j) => (
                    <div key={j} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[#7E57C2] text-sm font-medium">{label}</span>
                      <span className="font-bold" style={{ color: cat.color }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-sm text-white">Built for Confidence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-panel p-10 rounded-3xl text-center group hover:shadow-[0_0_30px_rgba(66,165,245,0.2)] transition-all hover:-translate-y-2 border-[#4527A0]/40 bg-black/20">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-6 bg-white/5 group-hover:scale-110 transition-transform shadow-md" style={{ border: `1px solid ${f.color}50` }}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{f.title}</h3>
                <p className="text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (Vibrant Sky/Deep Violet Mix) ── */}
      <section className="py-32 px-6 text-center relative z-10 overflow-hidden bg-[#120524]">
        <div className="max-w-5xl mx-auto relative bg-gradient-to-r from-[#4527A0] via-[#6A1B9A] to-[#42A5F5] p-16 rounded-[3rem] shadow-[0_20px_60px_rgba(66,165,245,0.3)] border border-white/20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-md">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-10">Join thousands of satisfied users today.</p>
          <div className="flex justify-center flex-wrap gap-6">
            <button onClick={scrollToJobs} className="px-10 py-5 bg-white text-[#4527A0] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Browse Jobs
            </button>
            <Link href="/jobs/new" className="px-10 py-5 bg-black/30 text-white font-bold rounded-full hover:bg-black/50 border border-white/30 transition-all backdrop-blur-md">
              Post a Job →
            </Link>
          </div>
        </div>
      </section>

      {selectedJob && <JobPreviewModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      {isFindProOpen && <FindProfessionalsModal onClose={() => setIsFindProOpen(false)} />}
    </div>
  );
}