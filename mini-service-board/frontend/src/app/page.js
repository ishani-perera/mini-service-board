'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJobs } from '../lib/api';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import FindProfessionalsModal from '../components/FindProfessionalsModal';
import JoinProfessionalModal from '../components/JoinProfessionalModal';
import JobPreviewModal from '../components/JobPreviewModal';

const CATEGORIES = [
  { name: 'Plumbing',     icon: '🚰', bgColor: '#eff6ff' },
  { name: 'Electrical',   icon: '⚡', bgColor: '#fef9c3' },
  { name: 'Painting',     icon: '🎨', bgColor: '#fdf2f8' },
  { name: 'Joinery',      icon: '🔨', bgColor: '#fff7ed' },
  { name: 'Roofing',      icon: '🏠', bgColor: '#f0fdf4' },
  { name: 'Gardening',    icon: '🌿', bgColor: '#f0fdf4' },
  { name: 'Cleaning',     icon: '✨', bgColor: '#eff6ff' },
  { name: 'AC Tech',      icon: '❄️', bgColor: '#f5f3ff' },
  { name: 'Masons',       icon: '🧱', bgColor: '#fef2f2' },
  { name: 'Pest Control', icon: '🦟', bgColor: '#fdf4ff' },
  { name: 'Interior',     icon: '🛋️', bgColor: '#fff7ed' },
  { name: 'Other',        icon: '⚙️', bgColor: '#f5f3ff' },
];

const STATUSES = ['All', 'Open', 'In Progress', 'Closed'];

const C = {
  primary:      '#2d1f7a',
  primaryDark:  '#1a1060',
  primaryMid:   '#4c35c9',
  primaryLight: '#ede9fe',
  accent:       '#f59e0b',
  accentHover:  '#d97706',
  border:       '#e8e8f0',
  bgPage:       '#fafafa',
  bgSoft:       '#f5f3ff',
  textHeading:  '#1a1060',
  textMuted:    '#888888',
  success:      '#d1fae5',
  successText:  '#065f46',
};

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewJob, setPreviewJob] = useState(null);

  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (status !== 'All') params.status = status;
      if (search.trim()) params.search = search.trim();
      const res = await getJobs(params);
      let results = res.data.data || [];
      if (!params.category) {
        const seen = new Set();
        const dedup = [];
        for (const j of results) {
          const cat = (j.category || 'Other').toString();
          if (!seen.has(cat)) { dedup.push(j); seen.add(cat); }
        }
        results = dedup;
      }
      setJobs(results);
    } catch (err) {
      setError('Failed to load jobs. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestForCategory = async (catName) => {
    setLoading(true);
    try {
      const res = await getJobs({ category: catName });
      const results = res.data?.data || [];
      if (results.length > 0) {
        setPreviewJob(results[0]);
        setShowPreview(true);
      } else {
        setError('No recent requests found for this category.');
      }
    } catch (err) {
      setError('Failed to load latest request for that category.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, [category, status]);

  useEffect(() => {
    const handler = () => fetchJobs();
    window.addEventListener('jobStatusChanged', handler);
    return () => window.removeEventListener('jobStatusChanged', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bgPage, fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 55%, #3d2a9e 100%)`,
        padding: '72px 32px 52px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(245,158,11,0.18)', color: '#fbbf24',
            border: '1px solid rgba(245,158,11,0.35)', borderRadius: 100,
            fontSize: 12, fontWeight: 600, padding: '5px 16px', marginBottom: 20,
          }}>
            🇱🇰 Sri Lanka&apos;s #1 Home Services Platform
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>
            Find Trusted <span style={{ color: C.accent }}>Tradespeople</span><br />Near You, Fast
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', marginBottom: 28 }}>
            Connect with verified electricians, plumbers, carpenters &amp; more
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowFindModal(true)}
              style={{
                background: C.accent, color: C.primaryDark, padding: '12px 28px',
                borderRadius: 100, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
              }}
            >
              Find Professionals
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              style={{
                background: 'transparent', color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.4)', padding: '12px 28px',
                borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Join as Professional
            </button>
          </div>
        </div>
      </section>

      {/* ── Search bar ── */}
      <div style={{ maxWidth: 500, margin: '-26px auto 0', position: 'relative', zIndex: 20, padding: '0 16px' }}>
        <form onSubmit={handleSearch}>
          <div style={{
            background: '#fff', borderRadius: 100, border: `0.5px solid ${C.border}`,
            boxShadow: '0 8px 32px rgba(44,31,122,0.14)', display: 'flex',
            alignItems: 'center', padding: '6px 6px 6px 16px', gap: 8,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
              stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="What service do you need?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent', fontFamily: 'inherit' }}
            />
            <button type="submit" style={{
              background: C.primary, color: '#fff', padding: '9px 22px',
              borderRadius: 100, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ── Stats bar ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        background: '#fff', borderBottom: `0.5px solid ${C.border}`, marginTop: 40,
      }}>
        {[
          { num: '50K+', label: 'Jobs Completed' },
          { num: '10K+', label: 'Verified Pros' },
          { num: '95%',  label: 'Satisfaction Rate' },
          { num: '24/7', label: 'Support' },
        ].map((s, i, arr) => (
          <div key={s.label} style={{
            textAlign: 'center', padding: '18px 8px',
            borderRight: i < arr.length - 1 ? `0.5px solid ${C.border}` : 'none',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.primary }}>{s.num}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <section style={{ background: C.bgPage, padding: '56px 28px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: C.primaryLight, color: C.primaryMid,
            fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 100, marginBottom: 10,
          }}>OUR SERVICES</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.textHeading, marginBottom: 6 }}>Services We Offer</h2>
          <p style={{ fontSize: 14, color: C.textMuted }}>Browse skilled professionals ready to help across all home services</p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(6,1fr)',
            gap: 12, marginTop: 28,
          }}>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => { setCategory(isActive ? 'All' : cat.name); fetchLatestForCategory(cat.name); }}
                  style={{
                    background: isActive ? C.primaryLight : '#fff',
                    border: `0.5px solid ${isActive ? C.primary : C.border}`,
                    borderRadius: 14, padding: '18px 10px 14px',
                    textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.2s', fontFamily: 'inherit', width: '100%',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 13, margin: '0 auto 10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, background: cat.bgColor,
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: C.primaryMid, fontWeight: 500 }}>Browse →</div>
                </button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button
              onClick={() => setCategory('Other')}
              style={{
                background: C.primary, color: '#fff', padding: '12px 28px',
                borderRadius: 100, fontSize: 14, fontWeight: 700,
                border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              Browse Other Services
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Job Preview Modal ── */}
      {showPreview && previewJob && (
        <JobPreviewModal job={previewJob} onClose={() => { setShowPreview(false); setPreviewJob(null); }} />
      )}

      {/* ── Latest Requests ── */}
      <section style={{ background: '#fff', padding: '56px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div>
              <div style={{
                display: 'inline-block', background: C.success, color: C.successText,
                fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 100, marginBottom: 8,
              }}>● ACTIVE LISTINGS</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: C.textHeading, marginBottom: 4 }}>
                {t.latestRequests || 'Latest Requests'}
              </h2>
              <p style={{ fontSize: 14, color: C.textMuted }}>
                {t.browseJobs || 'Browse active jobs posted by homeowners across Sri Lanka'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 500,
                    border: `0.5px solid ${status === s ? C.primary : C.border}`,
                    background: status === s ? C.primary : '#fff',
                    color: status === s ? '#fff' : '#666',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fff5f5', border: '0.5px solid #fecaca', borderRadius: 14,
              padding: 28, textAlign: 'center', color: '#b91c1c', marginBottom: 24,
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
              <p style={{ fontWeight: 600, marginBottom: 14 }}>{error}</p>
              <button onClick={fetchJobs} style={{
                background: C.primary, color: '#fff', padding: '10px 24px',
                borderRadius: 100, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
              }}>Retry Connection</button>
            </div>
          )}

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div style={{
              border: `1.5px dashed ${C.border}`, borderRadius: 14,
              padding: '56px 24px', textAlign: 'center', background: '#f8f7ff',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: C.textHeading, marginBottom: 8 }}>No Jobs Found</h3>
              <p style={{ fontSize: 14, color: C.textMuted, maxWidth: 380, margin: '0 auto 24px' }}>
                We couldn&apos;t find any service requests matching your filters.
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => { setCategory('All'); setStatus('All'); setSearch(''); }} style={{
                  background: C.primary, color: '#fff', padding: '10px 24px',
                  borderRadius: 100, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                }}>Reset All Filters</button>
                <button onClick={() => setCategory('All')} style={{
                  background: '#fff', color: '#555', border: `0.5px solid ${C.border}`,
                  padding: '10px 24px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>Browse All Services</button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 13, color: C.textMuted, fontWeight: 500, marginBottom: 16 }}>
                Showing <strong style={{ color: C.textHeading }}>{jobs.length} job{jobs.length !== 1 ? 's' : ''}</strong>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} showImage={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ background: C.primaryDark, padding: '56px 28px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(245,158,11,0.15)', color: '#fbbf24',
            fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 100, marginBottom: 10,
          }}>PRICING GUIDE</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Average Market Rates</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>Final prices depend on scope, materials &amp; location</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 28, textAlign: 'left' }}>
            {[
              {
                icon: '⚡', title: 'Electrical Services', bg: 'rgba(245,158,11,0.15)',
                rows: [
                  ['Light Fixture Installation', '₨1,000–3,000'],
                  ['Ceiling Fan Installation',   '₨1,500–4,000'],
                  ['House Rewiring',              '₨80,000–200,000'],
                  ['Distribution Board',          '₨15,000–35,000'],
                ],
              },
              {
                icon: '🚰', title: 'Plumbing Services', bg: 'rgba(59,130,246,0.15)',
                rows: [
                  ['Pipe Repair',        '₨3,000–8,000'],
                  ['Fixture Installation','₨5,000–15,000'],
                  ['Bathroom Remodel',   '₨50,000–150,000'],
                  ['Water Tank Install',  '₨40,000–80,000'],
                ],
              },
              {
                icon: '🎨', title: 'Painting & Finishes', bg: 'rgba(236,72,153,0.15)',
                rows: [
                  ['Per Square Foot', '₨80–150'],
                  ['Room Painting',   '₨10,000–25,000'],
                  ['Full House',      '₨80,000–250,000'],
                  ['Feature Wall',    '₨15,000–40,000'],
                ],
              },
            ].map((card) => (
              <div key={card.title} style={{
                background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    {card.icon}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{card.title}</div>
                </div>
                {card.rows.map(([label, price], i) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                    borderBottom: i < card.rows.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
                  }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                    <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>{price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, background: 'rgba(255,255,255,0.05)',
            border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 14,
            padding: '14px 20px', fontSize: 13, color: 'rgba(255,255,255,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
          }}>
            <span>💡 These are average market rates. Final prices depend on scope, materials, and location.</span>
            <Link href="/services" style={{ color: C.accent, fontWeight: 600, textDecoration: 'none' }}>
              View full cost guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust pillars ── */}
      <section style={{ background: C.bgSoft, padding: '56px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: C.primaryLight, color: C.primaryMid,
            fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 100, marginBottom: 10,
          }}>WHY CHOOSE US</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.textHeading, marginBottom: 6 }}>Built for Homeowners &amp; Pros</h2>
          <p style={{ fontSize: 14, color: C.textMuted }}>Everything you need to hire with confidence</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 28 }}>
            {[
              { icon: '🛡️', title: t.verifiedPros || 'Verified Pros',   desc: 'Every tradesman is background checked and identity verified for your security.' },
              { icon: '💰', title: t.fairPricing  || 'Fair Pricing',    desc: 'Compare multiple quotes and choose the best value for your project budget.' },
              { icon: '⭐', title: t.realReviews  || 'Real Reviews',    desc: 'Read honest feedback from homeowners who used the service before you hire.' },
            ].map((card) => (
              <div key={card.title} style={{
                background: '#fff', border: `0.5px solid ${C.border}`,
                borderRadius: 14, padding: '28px 22px', textAlign: 'center',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: C.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, margin: '0 auto 16px',
                }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.textHeading, marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modals ── */}
      {showFindModal && <FindProfessionalsModal onClose={() => setShowFindModal(false)} />}
      {showJoinModal && <JoinProfessionalModal onClose={() => setShowJoinModal(false)} />}
    </div>
  );
}