'use client';

import { useState } from 'react';

const CATEGORY_STYLES = {
  'Plumbing':       { bg: '#EFF6FF', color: '#1d4ed8', iconBg: '#DBEAFE', icon: '🔧' },
  'Electrical':     { bg: '#FEFCE8', color: '#854d0e', iconBg: '#FEF9C3', icon: '⚡' },
  'Painting':       { bg: '#FFF1F5', color: '#9d174d', iconBg: '#FCE7F3', icon: '🎨' },
  'Joinery':        { bg: '#F0FDF4', color: '#065f46', iconBg: '#D1FAE5', icon: '🪚' },
  'Roofing':        { bg: '#F5F3FF', color: '#5b21b6', iconBg: '#EDE9FE', icon: '🏠' },
  'Gardening':      { bg: '#F0FDF4', color: '#166534', iconBg: '#DCFCE7', icon: '🌿' },
  'Cleaning':       { bg: '#F0F9FF', color: '#0369a1', iconBg: '#E0F2FE', icon: '✨' },
  'AC Technicians': { bg: '#EFF9FF', color: '#0284c7', iconBg: '#E0F2FE', icon: '❄️' },
  'Masons':         { bg: '#FFFBEB', color: '#92400e', iconBg: '#FEF3C7', icon: '🧱' },
  'Pest Control':   { bg: '#FFF0F5', color: '#be185d', iconBg: '#FCE7F3', icon: '🐛' },
  'Interior':       { bg: '#FAF5FF', color: '#7e22ce', iconBg: '#F3E8FF', icon: '🛋️' },
  'Other':          { bg: '#F9FAFB', color: '#374151', iconBg: '#F3F4F6', icon: '🔨' },
};

const STATUS_STYLES = {
  'Open':        { bg: '#D1FAE5', color: '#065f46', dot: '#10b981', label: 'Open' },
  'In Progress': { bg: '#FEF3C7', color: '#92400e', dot: '#f59e0b', label: 'In Progress' },
  'Closed':      { bg: '#F3F4F6', color: '#374151', dot: '#9ca3af', label: 'Closed' },
  OPEN:        { bg: '#D1FAE5', color: '#065f46', dot: '#10b981', label: 'Open' },
  IN_PROGRESS: { bg: '#FEF3C7', color: '#92400e', dot: '#f59e0b', label: 'In Progress' },
  CLOSED:      { bg: '#F3F4F6', color: '#374151', dot: '#9ca3af', label: 'Closed' },
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
        background: '#ffffff',
        border: hovered ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(226,232,240,0.8)',
        borderRadius: 16,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 24px -8px rgba(124,58,237,0.15), 0 4px 12px -4px rgba(124,58,237,0.08)'
          : '0 2px 4px -1px rgba(0,0,0,0.03)',
        cursor: 'pointer',
        height: '100%',
      }}
    >
      {/* Top accent bar on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
        borderRadius: '16px 16px 0 0',
      }} />

      {/* Top row: category + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 6 }}>
        {/* Category pill */}
        <span style={{
          background: cat.bg,
          color: cat.color,
          fontSize: 10,
          fontWeight: 700,
          padding: '4px 8px',
          borderRadius: 99,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flexShrink: 0,
        }}>
          <span style={{
            width: 18, height: 18, borderRadius: 5,
            background: cat.iconBg,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11,
          }}>
            {cat.icon}
          </span>
          {job.category?.replace(/_/g, ' ')}
        </span>

        {/* Status pill with dot */}
        <span style={{
          background: status.bg,
          color: status.color,
          fontSize: 10,
          fontWeight: 700,
          padding: '4px 8px',
          borderRadius: 99,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flexShrink: 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.dot, display: 'inline-block' }} />
          {status.label}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 15,
        fontWeight: 800,
        color: '#1a0a3d',
        marginBottom: 6,
        lineHeight: 1.3,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {job.title}
      </h3>

      {/* Location */}
      {job.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6b7280', fontSize: 12, marginBottom: 10, fontWeight: 500 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {job.location}
        </div>
      )}

      {/* Description Snippet */}
      {job.description && (
        <p style={{
          color: '#6b7280',
          fontSize: 13,
          lineHeight: 1.5,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1,
        }}>
          {job.description}
        </p>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom Row: Budget & Date */}
      <div style={{
        borderTop: '1px solid #f1f5f9',
        paddingTop: 12,
        marginTop: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Budget</div>
          <div style={{
            fontSize: 14,
            fontWeight: 800,
            background: job.budget ? 'linear-gradient(90deg, #9333ea, #db2777)' : 'none',
            WebkitBackgroundClip: job.budget ? 'text' : 'unset',
            WebkitTextFillColor: job.budget ? 'transparent' : '#6b7280',
            backgroundClip: job.budget ? 'text' : 'unset',
            color: job.budget ? undefined : '#6b7280',
          }}>
            {job.budget ? `LKR ${Number(job.budget).toLocaleString()}` : 'Negotiable'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Posted</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280' }}>
            {formatDate(job.createdAt)}
          </div>
        </div>
      </div>
      
      {/* Hover CTA button */}
      <div style={{
        marginTop: 12,
        opacity: hovered ? 1 : 0,
        height: hovered ? 36 : 0,
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        pointerEvents: hovered ? 'auto' : 'none',
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); onClick?.(); }}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 12,
            padding: '8px 0',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(124,58,237,0.25)',
            letterSpacing: '0.01em',
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}
