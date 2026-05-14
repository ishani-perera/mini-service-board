'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getJob, updateJobStatus, deleteJob } from '../../../lib/api';
import Navbar from '../../../components/Navbar';
import StatusBadge from '../../../components/StatusBadge';
import { useAuth } from '../../../context/AuthContext';

const STATUSES = ['Open', 'In Progress', 'Closed'];

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

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
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl border border-slate-200/60 p-8 animate-pulse space-y-6 shadow-sm">
            <div className="flex justify-between items-start">
               <div className="h-10 bg-slate-100 rounded-xl w-2/3" />
               <div className="h-6 bg-slate-100 rounded-full w-24" />
            </div>
            <div className="h-4 bg-slate-50 rounded w-1/4" />
            <div className="space-y-3 pt-6">
              <div className="h-4 bg-slate-50 rounded w-full" />
              <div className="h-4 bg-slate-50 rounded w-full" />
              <div className="h-4 bg-slate-50 rounded w-4/6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">😕</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <button 
            onClick={() => router.push('/')} 
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Back link */}
        <button 
          onClick={() => router.push('/')} 
          className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 mb-8 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to all jobs
        </button>

        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 sm:p-10 border-b border-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <StatusBadge status={job.status} />
                  {job.category && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {job.category}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {job.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                 {user && (
                   <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                    title="Delete Job"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                 )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Description</h2>
                  <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 space-y-6 self-start">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                      <p className="text-sm font-bold text-slate-700">{job.location || 'Remote'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Contact</p>
                      <p className="text-sm font-bold text-slate-700">{job.contactName || 'Anonymous'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                      <a href={`mailto:${job.contactEmail}`} className="text-sm font-bold text-blue-600 hover:underline truncate block">
                        {job.contactEmail}
                      </a>
                    </div>
                  </div>

                  {job.budget && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget</p>
                        <p className="text-sm font-extrabold text-blue-600 mt-0.5">LKR {job.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Posted On</p>
                      <p className="text-sm font-bold text-slate-700">{formatDate(job.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Area */}
          <div className="bg-slate-50/50 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{user ? 'Manage Status' : 'Interested in this job?'}</h4>
                <p className="text-sm text-slate-500">{user ? 'Update the progress of this request.' : 'Login as a tradesman to manage this job.'}</p>
              </div>
            </div>

            <div className="w-full sm:w-64">
              {user ? (
                <select
                  value={job.status}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all cursor-pointer disabled:opacity-50"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <button 
                  onClick={() => router.push('/login')}
                  className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                  Login to Manage
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
