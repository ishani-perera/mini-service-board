export default function StatusBadge({ status }) {
  const styles = {
    'Open': 'bg-[#E7F7EF] text-[#0D9488] border-[#CCF1DE]',
    'In Progress': 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]',
    'Closed': 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]',
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm ${styles[status] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
      {status}
    </span>
  );
}
