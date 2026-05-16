export default function SkeletonCard() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid rgba(124,58,237,0.08)',
        borderRadius: 18,
        padding: 22,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Top row: category + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton-shimmer" style={{ height: 22, width: '38%', borderRadius: 99 }} />
        <div className="skeleton-shimmer" style={{ height: 22, width: 60, borderRadius: 99 }} />
      </div>

      {/* Title */}
      <div className="skeleton-shimmer" style={{ height: 20, width: '70%', borderRadius: 8 }} />

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div className="skeleton-shimmer" style={{ height: 14, width: 14, borderRadius: '50%' }} />
        <div className="skeleton-shimmer" style={{ height: 14, width: '30%', borderRadius: 6 }} />
      </div>

      {/* Description lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton-shimmer" style={{ height: 13, width: '100%', borderRadius: 6 }} />
        <div className="skeleton-shimmer" style={{ height: 13, width: '80%', borderRadius: 6 }} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(124,58,237,0.06)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div className="skeleton-shimmer" style={{ height: 11, width: 48, borderRadius: 4 }} />
          <div className="skeleton-shimmer" style={{ height: 18, width: 80, borderRadius: 6 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
          <div className="skeleton-shimmer" style={{ height: 11, width: 44, borderRadius: 4 }} />
          <div className="skeleton-shimmer" style={{ height: 13, width: 72, borderRadius: 6 }} />
        </div>
      </div>
    </div>
  );
}