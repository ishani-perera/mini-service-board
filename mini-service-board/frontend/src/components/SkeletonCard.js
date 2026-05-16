export default function SkeletonCard() {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ height: 28, width: '45%', borderRadius: 99, background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 28, width: 80, borderRadius: 99, background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div style={{ height: 24, width: '80%', borderRadius: 8, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: 24, width: '60%', borderRadius: 8, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <div style={{ height: 16, width: 16, borderRadius: '50%', background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 16, width: '40%', borderRadius: 6, background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8, flexGrow: 1 }}>
        <div style={{ height: 14, width: '100%', borderRadius: 6, background: 'rgba(255, 255, 255, 0.05)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 14, width: '90%', borderRadius: 6, background: 'rgba(255, 255, 255, 0.05)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 14, width: '70%', borderRadius: 6, background: 'rgba(255, 255, 255, 0.05)', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 12, width: 60, borderRadius: 4, background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: 24, width: 100, borderRadius: 6, background: 'rgba(126, 87, 194, 0.25)', animation: 'pulse 1.5s infinite' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <div style={{ height: 12, width: 60, borderRadius: 4, background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: 16, width: 80, borderRadius: 6, background: 'rgba(126, 87, 194, 0.15)', animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}