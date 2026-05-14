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
      <div className="bg-white rounded-[2rem] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer h-full flex flex-col overflow-hidden group">
        {/* Job Thumbnail */}
        <div className="h-48 w-full overflow-hidden relative">
           <img 
            src={job.imageUrl || `https://images.unsplash.com/photo-1581094794329-c8112a4e5190?auto=format&fit=crop&q=60&w=800`} 
            alt={job.title}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
           />
           <div className="absolute top-4 right-4">
              <StatusBadge status={job.status} />
           </div>
           <div className="absolute bottom-4 left-4">
              <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                {CATEGORIES_ICONS[job.category] || '🛠️'} {job.category}
              </span>
           </div>
        </div>

        <div className="p-8 flex-1 flex flex-col gap-5">
          <div className="space-y-2">
            <h3 className="font-black text-slate-900 text-xl leading-tight group-hover:text-[#5B63B1] transition-colors line-clamp-1">{job.title}</h3>
            <div className="flex items-center gap-2">
               <span className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-widest border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Verified
               </span>
               <div className="flex items-center gap-1.5 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-[11px] font-bold">{job.location || 'Remote'}</span>
               </div>
            </div>
          </div>

          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">{job.description}</p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Budget</span>
               <span className="text-lg font-black text-slate-900">LKR {job.budget?.toLocaleString() || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
               <span className="text-[11px] font-black">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
