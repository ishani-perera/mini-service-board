'use client';

import { useState } from 'react';

const CATEGORY_STYLES = {
  'Plumbing': { bg: 'rgba(66, 165, 245, 0.1)', color: '#42A5F5', iconBg: 'rgba(66, 165, 245, 0.15)', icon: '🔧' },
  'Electrical': { bg: 'rgba(250, 204, 21, 0.1)', color: '#facc15', iconBg: 'rgba(250, 204, 21, 0.15)', icon: '⚡' },
  'Painting': { bg: 'rgba(244, 114, 182, 0.1)', color: '#f472b6', iconBg: 'rgba(244, 114, 182, 0.15)', icon: '🎨' },
  'Joinery': { bg: 'rgba(52, 211, 153, 0.1)', color: '#34d399', iconBg: 'rgba(52, 211, 153, 0.15)', icon: '🪚' },
  'Roofing': { bg: 'rgba(126, 87, 194, 0.1)', color: '#7E57C2', iconBg: 'rgba(126, 87, 194, 0.15)', icon: '🏠' },
  'Gardening': { bg: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', iconBg: 'rgba(74, 222, 128, 0.15)', icon: '🌿' },
  'Cleaning': { bg: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', iconBg: 'rgba(56, 189, 248, 0.15)', icon: '✨' },
  'AC Technicians': { bg: 'rgba(125, 211, 252, 0.1)', color: '#7dd3fc', iconBg: 'rgba(125, 211, 252, 0.15)', icon: '❄️' },
  'Masons': { bg: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', iconBg: 'rgba(251, 191, 36, 0.15)', icon: '🧱' },
  'Pest Control': { bg: 'rgba(249, 168, 212, 0.1)', color: '#f9a8d4', iconBg: 'rgba(249, 168, 212, 0.15)', icon: '🐛' },
  'Interior': { bg: 'rgba(106, 27, 154, 0.1)', color: '#6A1B9A', iconBg: 'rgba(106, 27, 154, 0.15)', icon: '🛋️' },
  'Other': { bg: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', iconBg: 'rgba(148, 163, 184, 0.15)', icon: '🔨' },
};

const STATUS_STYLES = {
  'Open': { bg: 'rgba(52, 211, 153, 0.15)', color: '#34d399', dot: '#10b981', label: 'Open' },
  'In Progress': { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', dot: '#f59e0b', label: 'In Progress' },
  'Closed': { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', dot: '#9ca3af', label: 'Closed' },
  OPEN: { bg: 'rgba(52, 211, 153, 0.15)', color: '#34d399', dot: '#10b981', label: 'Open' },
  IN_PROGRESS: { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', dot: '#f59e0b', label: 'In Progress' },
  CLOSED: { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', dot: '#9ca3af', label: 'Closed' },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function JobCard({ job, onClick }) {
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_STYLES[job.category] || CATEGORY_STYLES['Other'];
  const status = STATUS_STYLES[job.status] || STATUS_STYLES.OPEN;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: hovered ? `1px solid ${cat.color}80` : '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px -10px ${cat.color}30` : '0 10px 30px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        height: '100%',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${cat.color}, transparent)`,
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s ease',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 6 }}>
        <span style={{
          background: cat.bg, color: cat.color, fontSize: 12, fontWeight: 700, padding: '6px 12px',
          borderRadius: 99, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6,
          border: `1px solid ${cat.color}30`
        }}>
          <span style={{ fontSize: 14 }}>{cat.icon}</span>
          {job.category?.replace(/_/g, ' ')}
        </span>

        <span style={{
          background: status.bg, color: status.color, fontSize: 11, fontWeight: 800, padding: '6px 12px',
          borderRadius: 99, display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${status.color}30`
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: status.dot, display: 'inline-block', boxShadow: `0 0 8px ${status.dot}` }} />
          {status.label}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 800, color: '#ffffff', marginBottom: 12,
        lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {job.title}
      </h3>

      {job.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a78bfa', fontSize: 14, marginBottom: 16, fontWeight: 600 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {job.location}
        </div>
      )}

      {job.description && (
        <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
          {job.description}
        </p>
      )}

      <div style={{ flex: 1 }} />

      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 16, marginTop: 8,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Budget</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: job.budget ? cat.color : '#94a3b8' }}>
            {job.budget ? `LKR ${Number(job.budget).toLocaleString()}` : 'Negotiable'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Posted</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>{formatDate(job.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}