import Link from 'next/link';
import StatusBadge from './StatusBadge';

export default function JobCard({ job }) {
  const date = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-base leading-snug">{job.title}</h3>
          <StatusBadge status={job.status} />
        </div>

        {job.category && (
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded w-fit">
            {job.category}
          </span>
        )}

        <p className="text-gray-500 text-sm line-clamp-2 flex-1">{job.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-100">
          <span>{job.location || 'Location not specified'}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
