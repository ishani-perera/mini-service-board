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
        border: hovered ? '1.5px solid rgba(124,58,237,0.25)' : '1.5px solid rgba(124,58,237,0.08)',
        borderRadius: 18,
        padding: '20px 20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(124,58,237,0.12)'
          : '0 1px 6px rgba(124,58,237,0.06)',
        cursor: 'pointer',
      }}
    >
      {/* Top accent bar on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
        borderRadius: '18px 18px 0 0',
      }} />

      {/* Top row: category + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 8 }}>
        {/* Category pill */}
        <span style={{
          background: cat.bg,
          color: cat.color,
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 99,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          flexShrink: 0,
        }}>
          <span style={{
            width: 20, height: 20, borderRadius: 6,
            background: cat.iconBg,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12,
          }}>
            {cat.icon}
          </span>
          {job.category?.replace(/_/g, ' ')}
        </span>

        {/* Status pill with dot */}
        <span style={{
          background: status.bg,
          color: status.color,
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 99,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          flexShrink: 0,
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: status.dot,
            display: 'inline-block',
          }} />
          {status.label}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: hovered ? '#5b21b6' : '#1a0a3d',
        marginBottom: 8,
        lineHeight: 1.35,
        transition: 'color 0.2s ease',
      }}>
        {job.title}
      </h3>

      {/* Location */}
      {job.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{job.location}</span>
        </div>
      )}

      {/* Description */}
      {job.description && (
        <p style={{
          fontSize: 13.5,
          color: '#6b7280',
          lineHeight: 1.6,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {job.description}
        </p>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer: budget + date */}
      <div style={{
        borderTop: '1px solid rgba(124,58,237,0.07)',
        paddingTop: 14,
        marginTop: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Budget</p>
          <p style={{
            fontSize: 17,
            fontWeight: 800,
            background: job.budget
              ? 'linear-gradient(90deg, #7c3aed, #ec4899)'
              : 'none',
            WebkitBackgroundClip: job.budget ? 'text' : 'unset',
            WebkitTextFillColor: job.budget ? 'transparent' : '#6b7280',
            backgroundClip: job.budget ? 'text' : 'unset',
            color: job.budget ? undefined : '#6b7280',
            margin: 0,
          }}>
            {job.budget ? `LKR ${Number(job.budget).toLocaleString()}` : 'Negotiable'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Posted</p>
          <p style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500, margin: 0 }}>{formatDate(job.createdAt)}</p>
        </div>
      </div>

      {/* Hover CTA button */}
      <div style={{
        marginTop: 14,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
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
            fontSize: 13,
            padding: '10px 0',
            borderRadius: 99,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
            transition: 'box-shadow 0.2s ease',
            letterSpacing: '0.01em',
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}
