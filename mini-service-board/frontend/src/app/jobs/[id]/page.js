'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getJob, updateJobStatus, deleteJob } from '../../../lib/api';
import Navbar from '../../../components/Navbar';
import StatusBadge from '../../../components/StatusBadge';

const STATUSES = ['Open', 'In Progress', 'Closed'];

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJob(id);
        setJob(res.data.data);
      } catch (err) {
        setError('Job not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      const res = await updateJobStatus(id, newStatus);
      setJob(res.data.data);
      toast.success(`Status updated to "${newStatus}"`);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this job? This action cannot be undone.');
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteJob(id);
      toast.success('Job deleted');
      router.push('/');
    } catch (err) {
      toast.error('Failed to delete job');
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8 text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-gray-600">{error}</p>
          <button onClick={() => router.push('/')} className="mt-4 text-blue-600 hover:underline text-sm">
            ← Back to jobs
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <button onClick={() => router.push('/')} className="text-blue-600 hover:underline text-sm mb-5 flex items-center gap-1">
          ← Back to all jobs
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Title & status */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              {job.category && (
                <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded mt-2">
                  {job.category}
                </span>
              )}
            </div>
            <StatusBadge status={job.status} />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
            {job.location && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                <p className="text-sm text-gray-800 mt-0.5 font-medium">{job.location}</p>
              </div>
            )}
            {job.contactName && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Contact</p>
                <p className="text-sm text-gray-800 mt-0.5 font-medium">{job.contactName}</p>
              </div>
            )}
            {job.contactEmail && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                <a href={`mailto:${job.contactEmail}`} className="text-sm text-blue-600 hover:underline mt-0.5 block">
                  {job.contactEmail}
                </a>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Posted</p>
              <p className="text-sm text-gray-800 mt-0.5 font-medium">{formatDate(job.createdAt)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 pt-4">
            {/* Status dropdown */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Update Status</label>
              <select
                value={job.status}
                onChange={handleStatusChange}
                disabled={updating}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-60"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Delete button */}
            <div className="flex items-end">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-100 disabled:opacity-60 transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete Job'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
