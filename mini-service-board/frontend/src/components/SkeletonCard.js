export default function SkeletonCard() {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 22,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ height: 26, width: '40%', borderRadius: 99, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 26, width: 70, borderRadius: 99, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div style={{ height: 24, width: '75%', borderRadius: 8, background: 'rgba(126, 87, 194, 0.3)', animation: 'pulse 1.5s infinite' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ height: 16, width: 16, borderRadius: '50%', background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 16, width: '35%', borderRadius: 6, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ height: 14, width: '100%', borderRadius: 6, background: 'rgba(255, 255, 255, 0.1)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 14, width: '85%', borderRadius: 6, background: 'rgba(255, 255, 255, 0.1)', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 16, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 12, width: 50, borderRadius: 4, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: 20, width: 90, borderRadius: 6, background: 'rgba(126, 87, 194, 0.3)', animation: 'pulse 1.5s infinite' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <div style={{ height: 12, width: 50, borderRadius: 4, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: 16, width: 80, borderRadius: 6, background: 'rgba(126, 87, 194, 0.2)', animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}