import Link from 'next/link';
import StatusBadge from './StatusBadge';

const CATEGORIES_ICONS = {
  'Plumbing': '🚰',
  'Electrical': '⚡',
  'Painting': '🎨',
  'Joinery': '🪚',
  'Roofing': '🏠',
  'Gardening': '🌿',
  'Cleaning': '🧹',
  'AC Technicians': '❄️',
  'Masons': '🧱',
  'Pest Control': '🦟',
  'Other': '🛠️'
};

export default function JobCard({ job }) {
  const date = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-[#F1F6FB] rounded-3xl border border-blue-100 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-2 active:scale-95 transition-all duration-400 cursor-pointer h-full flex flex-col overflow-hidden group">
        
        {/* Header with category and badge */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-blue-100/50">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
              {CATEGORIES_ICONS[job.category] || '🛠️'} {job.category}
            </span>
            <div className="transition-all duration-300">
              <StatusBadge status={job.status} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col gap-5">
          <div className="space-y-3">
            <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-tight group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center flex-wrap gap-2">
               <span className="flex items-center gap-1.5 text-[8px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polyline points="20 6 9 17 4 12"/></svg>
                  Verified
               </span>
               <div className="flex items-center gap-1 text-slate-600 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="font-semibold">{job.location || 'Remote'}</span>
               </div>
            </div>
          </div>

          <p className="text-slate-700 text-sm line-clamp-3 leading-relaxed font-medium group-hover:text-slate-800 transition-colors">
            {job.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-blue-100/50">
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Budget</span>
               <span className="text-lg sm:text-xl font-black text-blue-800 group-hover:text-blue-900 transition-colors">
                 LKR {job.budget?.toLocaleString() || 'N/A'}
               </span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 group-hover:text-blue-900 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
               <span className="text-[11px] font-bold">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
