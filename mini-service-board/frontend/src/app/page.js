'use client';

import { useEffect, useState } from 'react';
import { getJobs } from '../lib/api';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';

const CATEGORIES = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Roofing', 'Gardening', 'Cleaning', 'Other'];
const STATUSES = ['All', 'Open', 'In Progress', 'Closed'];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (status !== 'All') params.status = status;
      if (search.trim()) params.search = search.trim();

      const res = await getJobs(params);
      setJobs(res.data.data);
    } catch (err) {
      setError('Failed to load jobs. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-5xl">
            Find the right help, <span className="text-blue-600">fast.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Browse open service requests in your area or post a new job for local tradespeople to find.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-2 mb-12 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row gap-2">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2 p-1">
            <div className="flex-1 relative flex items-center">
              <svg className="absolute left-3 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              Search
            </button>
          </form>

          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl md:bg-transparent">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 md:w-48 bg-transparent border-none rounded-xl px-4 py-3 text-sm font-semibold focus:ring-0 outline-none cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'Categories' : c}</option>
              ))}
            </select>

            <div className="w-px h-6 bg-slate-200 self-center hidden md:block" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 md:w-40 bg-transparent border-none rounded-xl px-4 py-3 text-sm font-semibold focus:ring-0 outline-none cursor-pointer"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'Status' : s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-6 mb-8 text-center animate-in fade-in slide-in-from-top-4">
             <p className="font-semibold">{error}</p>
             <button onClick={fetchJobs} className="mt-2 text-sm underline font-bold">Try again</button>
          </div>
        )}

        {/* Job grid */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📭</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No jobs found</h3>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto">We couldn't find any service requests matching your current filters.</p>
              <button 
                onClick={() => { setCategory('All'); setStatus('All'); setSearch(''); }}
                className="text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-lg font-bold text-slate-800">Available Jobs</h2>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                   {jobs.length} Results
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => <JobCard key={job._id} job={job} />)}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
