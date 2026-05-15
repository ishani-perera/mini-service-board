import Link from 'next/link';
import Image from 'next/image';
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
  'Interior': '🛋️',
  'Other': '🛠️'
};

const CATEGORY_STYLES = {
  'Plumbing': { bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]' },
  'Electrical': { bg: 'bg-[#fef9c3]', text: 'text-[#854d0e]' },
  'Painting': { bg: 'bg-[#fdf2f8]', text: 'text-[#9f1239]' },
  'Joinery': { bg: 'bg-[#fff7ed]', text: 'text-[#92400e]' },
  'Roofing': { bg: 'bg-[#f0fdf4]', text: 'text-[#166534]' },
  'Gardening': { bg: 'bg-[#f0fdf4]', text: 'text-[#166534]' },
  'Cleaning': { bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]' },
  'AC Technicians': { bg: 'bg-[#f5f3ff]', text: 'text-[#4c35c9]' },
  'Masons': { bg: 'bg-[#fef2f2]', text: 'text-[#b91c1c]' },
  'Pest Control': { bg: 'bg-[#fdf4ff]', text: 'text-[#7c3aed]' },
  'Interior': { bg: 'bg-[#fff7ed]', text: 'text-[#92400e]' },
  'Other': { bg: 'bg-[#f5f3ff]', text: 'text-[#4c35c9]' },
};

export default function JobCard({ job, showImage = true }) {
  const date = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="card-clean cursor-pointer h-full flex flex-col overflow-hidden group">
        
        {/* Optional Image Section */}
          {showImage ? (
          <div className="relative w-full h-48 sm:h-56 bg-slate-100 overflow-hidden">
            {job.imageUrl ? (
              <Image
                src={job.imageUrl}
                alt={job.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-4xl">
                {CATEGORIES_ICONS[job.category] || '🛠️'}
              </div>
            )}
            <div className="absolute top-4 right-4">
              <StatusBadge status={job.status} />
            </div>
          </div>
        ) : (
          <div className="px-5 pt-5 pb-2 flex items-start justify-between">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg ${CATEGORY_STYLES[job.category]?.bg || 'bg-slate-100'} ${CATEGORY_STYLES[job.category]?.text || 'text-slate-700'}`}>
              {CATEGORIES_ICONS[job.category] || '🛠️'} {job.category}
            </span>
            <div className="ml-4">
              <StatusBadge status={job.status} />
            </div>
          </div>
        )}

        {/* Category Badge (when image is shown, keep a smaller badge below) */}
        {showImage && (
          <div className="px-5 pt-4 pb-2">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg ${CATEGORY_STYLES[job.category]?.bg || 'bg-slate-100'} ${CATEGORY_STYLES[job.category]?.text || 'text-slate-700'}`}>
              {CATEGORIES_ICONS[job.category] || '🛠️'} {job.category}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="px-5 pb-5 flex-1 flex flex-col gap-3">
          <h3 className="font-semibold text-lg leading-tight text-var(--text-heading) group-hover:text-[color:var(--primary-mid)] transition-colors duration-300 line-clamp-2" style={{color: 'var(--text-heading)'}}>
            {job.title}
          </h3>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="font-semibold">{job.location || 'Remote'}</span>
          </div>

          <p className="text-sm line-clamp-2 leading-relaxed" style={{color: '#666'}}>
            {job.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t" style={{borderTop: '0.5px solid #f0f0f8'}}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Budget</p>
              <p className="text-lg font-extrabold" style={{color: 'var(--primary)'}}>
                LKR {job.budget?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Posted</p>
              <p className="text-sm font-semibold text-slate-600">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
