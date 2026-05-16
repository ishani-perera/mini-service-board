'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';
import JobPreviewModal from '../components/JobPreviewModal';
import { getJobs } from '../lib/api';

/* ── Service catalogue ───────────────────────────────── */
const SERVICES = [
  { key: 'Plumbing',       label: 'Plumbing',      icon: '🔧', iconBg: '#EFF6FF', color: '#1d4ed8' },
  { key: 'Electrical',     label: 'Electrical',    icon: '⚡', iconBg: '#FEFCE8', color: '#854d0e' },
  { key: 'Painting',       label: 'Painting',      icon: '🎨', iconBg: '#FFF1F5', color: '#9d174d' },
  { key: 'Joinery',        label: 'Joinery',       icon: '🪚', iconBg: '#F0FDF4', color: '#065f46' },
  { key: 'Roofing',        label: 'Roofing',       icon: '🏠', iconBg: '#F5F3FF', color: '#5b21b6' },
  { key: 'Gardening',      label: 'Gardening',     icon: '🌿', iconBg: '#F0FDF4', color: '#166534' },
  { key: 'Cleaning',       label: 'Cleaning',      icon: '✨', iconBg: '#F0F9FF', color: '#0369a1' },
  { key: 'AC Technicians', label: 'AC Tech',       icon: '❄️', iconBg: '#EFF9FF', color: '#0284c7' },
  { key: 'Masons',         label: 'Masons',        icon: '🧱', iconBg: '#FFFBEB', color: '#92400e' },
  { key: 'Pest Control',   label: 'Pest Control',  icon: '🐛', iconBg: '#FFF0F5', color: '#be185d' },
  { key: 'Interior',       label: 'Interior',      icon: '🛋️', iconBg: '#FAF5FF', color: '#7e22ce' },
  { key: 'Other',          label: 'Other',         icon: '🔨', iconBg: '#F9FAFB', color: '#374151' },
];

const STATS = [
  { value: '50K+', label: 'Jobs Completed',   icon: '✅' },
  { value: '10K+', label: 'Verified Pros',     icon: '👷' },
  { value: '95%',  label: 'Satisfaction Rate', icon: '⭐' },
  { value: '24/7', label: 'Support',           icon: '📞' },
];

const MARKET_RATES = [
  {
    title: 'Electrical', icon: '⚡', grad: 'linear-gradient(135deg,#fef9c3,#fde68a)', color: '#854d0e',
    items: [['Light Fixture', 'Rs1,000–3,000'], ['House Rewiring', 'Rs80,000+']],
  },
  {
    title: 'Plumbing', icon: '🔧', grad: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1d4ed8',
    items: [['Pipe Repair', 'Rs3,000–8,000'], ['Water Tank', 'Rs40,000+']],
  },
  {
    title: 'Painting', icon: '🎨', grad: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#9d174d',
    items: [['Per Sq Ft', 'Rs80–150'], ['Full Room', 'Rs10,000+']],
  },
  {
    title: 'Joinery', icon: '🪚', grad: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#065f46',
    items: [['Door Hang', 'Rs2,500+'], ['Wardrobe', 'Rs45,000+']],
  },
  {
    title: 'Roofing', icon: '🏠', grad: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', color: '#5b21b6',
    items: [['Leak Repair', 'Rs5,000+'], ['Tile Replace', 'Rs15,000+']],
  },
  {
    title: 'Gardening', icon: '🌿', grad: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#166534',
    items: [['Lawn Mowing', 'Rs2,000+'], ['Landscaping', 'Rs20,000+']],
  },
  {
    title: 'Cleaning', icon: '✨', grad: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', color: '#0369a1',
    items: [['Deep Clean', 'Rs8,000+'], ['Sofa Wash', 'Rs3,500+']],
  },
  {
    title: 'AC Tech', icon: '❄️', grad: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', color: '#0284c7',
    items: [['AC Service', 'Rs3,500+'], ['Installation', 'Rs8,000+']],
  },
  {
    title: 'Masons', icon: '🧱', grad: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e',
    items: [['Wall Build', 'Rs250/sqft'], ['Tiling', 'Rs120/sqft']],
  },
  {
    title: 'Pest Control', icon: '🐛', grad: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#be185d',
    items: [['General Pest', 'Rs4,000+'], ['Termite', 'Rs12,000+']],
  },
  {
    title: 'Interior', icon: '🛋️', grad: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)', color: '#7e22ce',
    items: [['Consultation', 'Rs5,000+'], ['3D Design', 'Rs25,000+']],
  },
  {
    title: 'Other', icon: '🔨', grad: 'linear-gradient(135deg,#f3f4f6,#e5e7eb)', color: '#374151',
    items: [['Lock Replace', 'Rs1,500+'], ['Appliance Fix', 'Rs2,500+']],
  },
];

const FEATURES = [
  {
    icon: '🛡️',
    title: 'Verified Pros',
    desc: 'Every tradesman is background checked and identity verified for your security.',
    grad: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
    color: '#5b21b6',
  },
  {
    icon: '💰',
    title: 'Fair Pricing',
    desc: 'Compare multiple quotes and choose the best value for your project budget.',
    grad: 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
    color: '#065f46',
  },
  {
    icon: '⭐',
    title: 'Real Reviews',
    desc: 'Read honest feedback from homeowners who used the service before you hire.',
    grad: 'linear-gradient(135deg,#fef9c3,#fde68a)',
    color: '#854d0e',
  },
];

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Closed'];

/* ── Count-up hook ────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState('0');
  useEffect(() => {
    if (!start) return;
    const is247 = target === '24/7';
    if (is247) { setCount('24/7'); return; }
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

/* ── Service Card Component ───────────────────────────── */
function ServiceCard({ service, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
      }}
    >
      <div
        style={{
          background: isActive
            ? 'linear-gradient(160deg, #faf8ff 0%, #ede9ff 100%)'
            : '#ffffff',
          border: isActive
            ? `1.5px solid rgba(124,58,237,0.45)`
            : hovered
            ? '1.5px solid rgba(124,58,237,0.2)'
            : '1.5px solid rgba(124,58,237,0.08)',
          borderRadius: 16,
          padding: '20px 14px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 10,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.22s ease',
          transform: hovered && !isActive ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: isActive
            ? '0 8px 24px rgba(124,58,237,0.18)'
            : hovered
            ? '0 6px 20px rgba(124,58,237,0.1)'
            : '0 1px 4px rgba(124,58,237,0.05)',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 3,
            background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
            opacity: isActive || hovered ? 1 : 0,
            transition: 'opacity 0.22s ease',
            borderRadius: '16px 16px 0 0',
          }}
        />

        {/* Icon badge */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: service.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            transition: 'transform 0.22s ease',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            flexShrink: 0,
          }}
        >
          {service.icon}
        </div>

        {/* Label */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: isActive ? '#4c1d95' : '#1a0a3d',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {service.label}
        </p>

        {/* Browse arrow */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isActive ? '#7c3aed' : service.color,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: hovered ? 6 : 3,
            transition: 'gap 0.18s ease',
          }}
        >
          Browse →
        </p>
      </div>
    </button>
  );
}

/* ── Main Page ────────────────────────────────────────── */
export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const statsRef = useRef(null);
  const latestRequestsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
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
      } catch (err) {
        console.error(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [categoryFilter]);

  function handleServiceClick(serviceKey) {
    setCategoryFilter(prev => prev === serviceKey ? 'All' : serviceKey);
    setFilter('All');
    setTimeout(() => {
      latestRequestsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function scrollToJobs() {
    setCategoryFilter('All');
    setTimeout(() => {
      latestRequestsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  const filteredJobs = jobs.filter(j => {
    const matchStatus =
      filter === 'All' ||
      (filter === 'Open'        && j.status === 'Open') ||
      (filter === 'In Progress' && j.status === 'In Progress') ||
      (filter === 'Closed'      && j.status === 'Closed');
    const matchSearch = !search ||
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.category?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="hero-section" style={{ paddingTop: 44, paddingBottom: 56 }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 80, height: 80, borderRadius: '50%', background: 'rgba(167,139,250,0.15)', filter: 'blur(30px)', animation: 'floatY 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '25%', right: '8%', width: 100, height: 100, borderRadius: '50%', background: 'rgba(236,72,153,0.12)', filter: 'blur(36px)', animation: 'floatY 9s ease-in-out infinite 1s' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '22%', width: 70, height: 70, borderRadius: '50%', background: 'rgba(45,212,191,0.1)', filter: 'blur(26px)', animation: 'floatY 6s ease-in-out infinite 0.5s' }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '5px 14px', marginBottom: 18, backdropFilter: 'blur(8px)' }}>
            <span style={{ fontSize: 13 }}>🇱🇰</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600, letterSpacing: '0.02em' }}>Sri Lanka's #1 Home Services Platform</span>
          </div>

          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}>
            Find Trusted{' '}
            <span style={{ background: 'linear-gradient(90deg, #facc15, #f97316, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Tradespeople
            </span>
            {' '}Near You, Fast
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.6 }}>
            Connect with verified electricians, plumbers, carpenters & more across Sri Lanka
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <Link href="/services" className="btn-primary btn-touch" style={{ padding: '11px 24px', fontSize: 14 }}>
              Find Professionals
            </Link>
            <Link href="/jobs/new" className="btn-outline btn-touch" style={{ padding: '10px 24px', fontSize: 14 }}>
              Join as Professional
            </Link>
          </div>

          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', padding: '5px 5px 5px 16px', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="What service do you need?"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: '#1f2937', fontFamily: "'Inter', sans-serif" }}
              />
              <button className="search-btn btn-touch" style={{ padding: '9px 20px', fontSize: 13 }}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{ background: '#fff', borderBottom: '1px solid rgba(124,58,237,0.06)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STATS.map((s, i) => {
              const count = useCountUp(s.value, 1800, statsVisible);
              return (
                <div key={i} className="stat-card">
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                  <div className="stat-number">{count}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES — redesigned cards
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--bg-page)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            {/* Section pill tag */}
            <div style={{
              display: 'inline-block',
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.18)',
              borderRadius: 99,
              padding: '4px 14px',
              fontSize: 11,
              fontWeight: 700,
              color: '#7c3aed',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>
              Our Services
            </div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              marginBottom: 12,
            }}>
              Services We Offer
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
              Browse skilled professionals ready to help across all home services
            </p>
          </div>

          {/* ── New card grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 12,
          }}>
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.key}
                service={s}
                isActive={categoryFilter === s.key}
                onClick={() => handleServiceClick(s.key)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              onClick={scrollToJobs}
              className="btn-primary btn-touch"
              style={{ display: 'inline-flex', border: 'none', cursor: 'pointer' }}
            >
              Browse Latest Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LATEST REQUESTS
      ══════════════════════════════════════════════════ */}
      <section
        ref={latestRequestsRef}
        className="latest-requests-bg"
        style={{ padding: '80px 0', scrollMarginTop: '80px' }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <div className="latest-requests-badge" style={{ display: 'inline-block', marginBottom: 10 }}>● Active Listings</div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 6 }}>
                Latest Requests
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Browse active jobs posted by homeowners across Sri Lanka.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
              {categoryFilter !== 'All' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--primary)', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 99 }}>
                    {SERVICES.find(s => s.key === categoryFilter)?.icon}{' '}
                    {SERVICES.find(s => s.key === categoryFilter)?.label}
                  </span>
                  <button
                    onClick={() => setCategoryFilter('All')}
                    style={{ background: 'none', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, borderRadius: 99, padding: '4px 10px', cursor: 'pointer' }}
                  >
                    ✕ Clear
                  </button>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {STATUS_FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`filter-tab btn-touch ${filter === f ? 'active' : ''}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!loading && (
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 20, fontWeight: 500 }}>
              Showing <strong style={{ color: 'var(--primary)' }}>{filteredJobs.length} jobs</strong>
              {categoryFilter !== 'All' && (
                <span> in <strong style={{ color: 'var(--primary)' }}>
                  {SERVICES.find(s => s.key === categoryFilter)?.label}
                </strong></span>
              )}
            </p>
          )}

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', fontWeight: 500 }}>
                No jobs found{categoryFilter !== 'All' ? ` for ${SERVICES.find(s => s.key === categoryFilter)?.label}` : ''}.
              </p>
              <Link href="/jobs/new" className="btn-primary btn-touch" style={{ display: 'inline-flex', marginTop: 20 }}>
                Post the First Job
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {filteredJobs.map(job => <JobCard key={job._id || job.id} job={job} onClick={() => setSelectedJob(job)} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARKET RATES
      ══════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ padding: '80px 0' }}>
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Pricing Guide
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              Average Market Rates
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Final prices depend on scope, materials & location</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {MARKET_RATES.map((cat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 24, backdropFilter: 'blur(10px)', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: cat.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>{cat.title}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map(([label, price], j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{label}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 700, background: 'linear-gradient(90deg,#facc15,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>💡</span> These are average market rates. Final prices depend on scope, materials, and location.
            </p>
            <Link href="/services" style={{ fontSize: 13, fontWeight: 700, color: '#facc15', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View full cost guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--bg-page)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-tag">Why Choose Us</div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 12 }}>
              Built for Homeowners & Pros
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 420, margin: '0 auto' }}>
              Everything you need to hire with confidence
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card-clean" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ width: 68, height: 68, borderRadius: 20, background: f.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 18px', transition: 'transform 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text-heading)', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0' }}>
        <div className="site-container">
          <div style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #db2777 80%, #f97316 100%)', borderRadius: 28, padding: 'clamp(36px, 6vw, 60px) clamp(24px, 6vw, 60px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40%', left: '-10%', width: '50%', height: '180%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40%', right: '-10%', width: '50%', height: '180%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>
                Ready to Get Started?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.65 }}>
                Whether you need a professional or want to offer your services, join thousands of satisfied users today.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={scrollToJobs}
                  style={{ background: '#fff', color: '#4c1d95', padding: '13px 28px', borderRadius: 99, fontWeight: 800, fontFamily: "'Inter', sans-serif", fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
                >
                  Browse Jobs
                </button>
                <Link href="/jobs/new"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)', padding: '12px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s ease', backdropFilter: 'blur(8px)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════
          JOB PREVIEW MODAL
      ══════════════════════════════════════════════════ */}
      {selectedJob && (
        <JobPreviewModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}