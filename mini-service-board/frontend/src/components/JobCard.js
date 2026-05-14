import Link from 'next/link';
import StatusBadge from './StatusBadge';

export default function JobCard({ job }) {
  const date = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-400/50 transition-all duration-300 cursor-pointer h-full flex flex-col gap-4 group">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">{job.title}</h3>
          <StatusBadge status={job.status} />
        </div>

        {job.category && (
          <span className="inline-block bg-blue-50/50 text-blue-600 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-blue-100/50 w-fit">
            {job.category}
          </span>
        )}

        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-1">{job.description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="text-xs font-medium">{job.location || 'Remote'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
             <span className="text-xs">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
