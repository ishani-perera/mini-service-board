import React from 'react';
import Link from 'next/link';
import StatusBadge from './StatusBadge';

export default function JobPreviewModal({ job, onClose }) {
  if (!job) return null;

  const date = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-extrabold" style={{color: 'var(--text-heading)'}}>{job.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{job.category} • {job.location || 'Remote'}</p>
            </div>
            <div className="flex items-start gap-2">
              <StatusBadge status={job.status} />
            </div>
          </div>

          <div className="mt-4 text-slate-700">
            <p>{job.description}</p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Budget</p>
              <p className="text-lg font-extrabold text-[color:var(--primary)]">LKR {job.budget?.toLocaleString() || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Posted</p>
              <p className="text-sm font-semibold text-slate-600">{date}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border font-semibold">Close</button>
            <Link href={`/jobs/${job._id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#ff7a59] text-white font-bold">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
