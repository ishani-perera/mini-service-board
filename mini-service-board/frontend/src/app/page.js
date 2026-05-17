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
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '220px',
        background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        border: isActive ? `2px solid ${service.color}` : hovered ? `2px solid ${service.color}80` : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '30px 20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered || isActive ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isActive || hovered ? `0 25px 50px -12px ${service.color}40, 0 0 0 1px ${service.color}30` : '0 10px 30px -10px rgba(0,0,0,0.4)',
        zIndex: hovered || isActive ? 10 : 1,
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: `linear-gradient(90deg, ${service.color}, transparent)`,
        opacity: hovered || isActive ? 1 : 0, transition: 'opacity 0.3s ease',
      }} />

      <div style={{
        width: 72, height: 72, borderRadius: '20px',
        background: service.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered || isActive ? 'scale(1.15) rotate(10deg)' : 'scale(1)',
        border: `1px solid ${service.color}30`
      }}>
        {service.icon}
      </div>

      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
        {service.label}
      </h3>

      <div style={{
        color: isActive ? service.color : '#cbd5e1',
        fontWeight: 600, fontSize: '0.9rem',
        display: 'flex', alignItems: 'center', gap: '6px',
        transition: 'all 0.3s'
      }}>
        {isActive ? 'Showing Jobs' : 'Filter Jobs'}
        <span style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateX(6px)' : 'translateX(0)' }}>→</span>
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
    <div className="bg-[#120524] min-h-screen text-white font-sans overflow-x-hidden relative w-full">
      <style jsx>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        @keyframes float-reverse { 0% { transform: translateY(0px); } 50% { transform: translateY(20px); } 100% { transform: translateY(0px); } }
        @keyframes float-diagonal { 0% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(15px, -20px) scale(1.1); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0) rotate(-10deg); } 50% { transform: translateY(-15px) rotate(0deg); } }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-float-diagonal { animation: float-diagonal 9s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 5s ease-in-out infinite; }
        .animate-floatSlow { animation: floatSlow 6s ease-in-out infinite; }
        .animate-floatFast { animation: floatFast 7s ease-in-out infinite; }
        
        .glass-panel { background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); }
      `}</style>

      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/home-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#120524]/70 via-[#4527A0]/80 to-[#120524]" />

        <div className="absolute top-[20%] left-[10%] text-5xl animate-float z-10 opacity-80 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hidden lg:block">🛠️</div>
        <div className="absolute bottom-[20%] right-[10%] text-6xl animate-float-reverse z-10 opacity-80 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hidden lg:block">⚡</div>

        <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 md:px-5 md:py-2 mb-6 shadow-lg border border-[#7E57C2]/50">
            <span>🇱🇰</span>
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#42A5F5]">Sri Lanka's #1 Home Services</span>
          </div>
          <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.2] md:leading-[1.1] tracking-tight mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] px-2">
            Find Trusted <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] via-[#7E57C2] to-[#6A1B9A]">Tradespeople</span> Near You
          </h1>
          <p className="text-base md:text-xl text-purple-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-lg px-4">
            Connect with verified electricians, plumbers, carpenters & more across Sri Lanka, instantly.
          </p>

          {/* Search Bar - Responsive */}
          <div className="w-full max-w-2xl mx-auto glass-panel rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-3 md:gap-0 shadow-[0_15px_50px_rgba(0,0,0,0.6)] border border-[#7E57C2]/50 mb-10 bg-[#120524]/60">
            <div className="flex items-center w-full px-2 py-2 md:py-0">
              <span className="pl-2 md:pl-4 text-xl">🔍</span>
              <input type="text" placeholder="What service do you need?" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-[#7E57C2] font-medium text-base md:text-lg w-full min-w-0" />
            </div>
            <button className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-[#42A5F5] to-[#6A1B9A] rounded-xl md:rounded-full font-bold text-white hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(126,87,194,0.4)] whitespace-nowrap">
              Search
            </button>
          </div>

          {/* Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4 sm:px-0 sm:w-auto">
            <button onClick={() => setIsFindProOpen(true)} className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#4527A0] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">Find Professionals</button>
            <Link href="/jobs/new" className="w-full sm:w-auto px-8 py-3.5 bg-black/40 text-white font-bold rounded-full hover:bg-black/60 border border-white/20 transition-all backdrop-blur-md text-center">Join as Professional</Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ── */}
      <section ref={statsRef} className="py-12 border-y border-[#4527A0]/30 bg-[#1A0B2E]/80 backdrop-blur-xl relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s, i) => {
              const count = useCountUp(s.value, 1800, statsVisible);
              return (
                <div key={i} className="text-center group">
                  <div className="text-3xl md:text-4xl mb-3 transition-transform group-hover:scale-110 group-hover:rotate-6 opacity-90">{s.icon}</div>
                  <div className="text-2xl md:text-4xl font-black mb-1 md:mb-2 transition-all drop-shadow-md" style={{ color: s.color, textShadow: `0 0 15px ${s.color}60` }}>{count}</div>
                  <div className="text-[#7E57C2] font-bold uppercase tracking-widest text-xs md:text-sm opacity-90">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SERVICES GRID ── */}
      <section className="py-16 md:py-24 relative z-10 overflow-hidden border-b border-[#4527A0]/30">
        <div style={{ position: 'absolute', top: '-5%', left: '-5%', right: '-5%', bottom: '-5%', backgroundImage: "url('/services-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(35px)', opacity: 0.4, zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(18, 5, 36, 0.85)', zIndex: 1 }} />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 drop-shadow-md text-white">Services We Offer</h2>
            <p className="text-lg md:text-xl text-[#a78bfa] font-medium">Browse skilled professionals ready to help</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SERVICES.map((s) => (
              <ServiceCard key={s.key} service={s} isActive={categoryFilter === s.key} onClick={() => handleServiceClick(s.key)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LATEST REQUESTS ── */}
      <section ref={latestRequestsRef} className="py-16 md:py-24 px-4 md:px-6 relative z-10 overflow-hidden border-t border-[#6A1B9A]/40">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/home-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)', transform: 'scale(1.05)' }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#120524]/95 via-[#4527A0]/60 to-[#120524]/95" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#6A1B9A]/60 text-[#42A5F5] border border-[#42A5F5]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#42A5F5] animate-pulse" /> Active Listings
              </div>
              <h2 className="text-3xl md:text-5xl font-black drop-shadow-lg text-white">Latest Requests</h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
              {categoryFilter !== 'All' && (
                <div className="flex items-center gap-3">
                  <span className="glass-panel px-4 py-1.5 rounded-full text-sm font-bold text-[#42A5F5] shadow-md border-[#42A5F5]/30 bg-black/40">
                    {SERVICES.find(s => s.key === categoryFilter)?.icon} {SERVICES.find(s => s.key === categoryFilter)?.label}
                  </span>
                  <button onClick={() => setCategoryFilter('All')} className="text-gray-300 hover:text-white text-sm font-bold transition-colors">✕ Clear</button>
                </div>
              )}
              {/* Status Filters - scrollable on mobile */}
              <div className="flex gap-2 glass-panel p-1.5 rounded-2xl md:rounded-full shadow-lg border border-white/20 bg-black/40 w-full md:w-auto overflow-x-auto pb-2 md:pb-1.5 hide-scrollbar">
                {STATUS_FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 md:px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === f ? 'bg-gradient-to-r from-[#42A5F5] to-[#6A1B9A] text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map(n => <SkeletonCard key={n} />)}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-2 border-[#6A1B9A]/50 shadow-lg bg-black/50 backdrop-blur-md px-4">
              <div className="text-6xl mb-6 opacity-50">📋</div>
              <p className="text-lg md:text-xl text-[#7E57C2] font-medium mb-8">No jobs found matching your criteria.</p>
              <Link href="/jobs/new" className="px-8 py-4 bg-white text-[#4527A0] font-bold rounded-full hover:scale-105 transition-transform shadow-lg inline-block">
                Post the First Job
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredJobs.map(job => <JobCard key={job._id || job.id} job={job} onClick={() => setSelectedJob(job)} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: MARKET RATES & WHY CHOOSE US ── */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 bg-gradient-to-br from-[#120524] to-[#4527A0]/40 border-t border-[#6A1B9A]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 drop-shadow-sm text-white">Average Market Rates</h2>
            <p className="text-lg md:text-xl text-[#7E57C2]">Final prices depend on scope, materials & location</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-32">
            {MARKET_RATES.map((cat, i) => (
              <div key={i} className="glass-panel p-5 md:p-6 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group border-[#6A1B9A]/30 bg-black/20">
                <div className="flex items-center gap-4 mb-5 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 transition-transform bg-white/5 border border-white/10" style={{ color: cat.color }}>{cat.icon}</div>
                  <h3 className="font-bold text-base md:text-lg text-white">{cat.title}</h3>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {cat.items.map(([label, price], j) => (
                    <div key={j} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[#7E57C2] text-xs md:text-sm font-medium">{label}</span>
                      <span className="font-bold text-sm md:text-base" style={{ color: cat.color }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 drop-shadow-sm text-white">Built for Confidence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-panel p-8 md:p-10 rounded-3xl text-center group hover:shadow-[0_0_30px_rgba(66,165,245,0.2)] transition-all hover:-translate-y-2 border-[#4527A0]/40 bg-black/20">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-6 bg-white/5 group-hover:scale-110 transition-transform shadow-md" style={{ border: `1px solid ${f.color}50` }}>
                  {f.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{f.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 md:py-32 px-4 md:px-6 text-center relative z-10 overflow-hidden bg-[#120524]">
        <div className="max-w-5xl mx-auto relative bg-gradient-to-r from-[#4527A0] via-[#6A1B9A] to-[#42A5F5] p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(66,165,245,0.3)] border border-white/20">
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-white drop-shadow-md">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10">Join thousands of satisfied users today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <button onClick={scrollToJobs} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-[#4527A0] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Browse Jobs
            </button>
            <Link href="/jobs/new" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-black/30 text-white font-bold rounded-full hover:bg-black/50 border border-white/30 transition-all backdrop-blur-md">
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