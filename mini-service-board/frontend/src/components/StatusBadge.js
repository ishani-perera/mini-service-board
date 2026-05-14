export default function StatusBadge({ status }) {
  const colors = {
    Open: 'bg-green-100 text-green-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Closed: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}
