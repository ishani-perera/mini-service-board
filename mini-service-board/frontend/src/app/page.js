'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobs } from '../lib/api';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { name: 'Plumbing', img: 'https://images.pexels.com/photos/2310904/pexels-photo-2310904.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-blue-50' },
  { name: 'Electrical', img: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-amber-50' },
  { name: 'Painting', img: 'https://images.pexels.com/photos/6444253/pexels-photo-6444253.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-rose-50' },
  { name: 'Joinery', img: 'https://images.pexels.com/photos/175707/pexels-photo-175707.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-orange-50' },
  { name: 'Roofing', img: 'https://images.pexels.com/photos/4433767/pexels-photo-4433767.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-slate-50' },
  { name: 'Gardening', img: 'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-emerald-50' },
  { name: 'Cleaning', img: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-cyan-50' },
  { name: 'AC Tech', img: 'https://images.pexels.com/photos/4433833/pexels-photo-4433833.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-indigo-50' },
  { name: 'Masons', img: 'https://images.pexels.com/photos/6647118/pexels-photo-6647118.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-stone-50' },
  { name: 'Pest Control', img: 'https://images.pexels.com/photos/4099466/pexels-photo-4099466.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-purple-50' },
  { name: 'Interior', img: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-fuchsia-50' },
  { name: 'Other', img: 'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=400&v=1', color: 'bg-slate-50' },
];

const STATUSES = ['All', 'Open', 'In Progress', 'Closed'];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

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
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7B81D8] to-[#5B63B1] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid-hero)" />
           </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 leading-tight">
              Sri Lanka's Most Trusted <br /> Home Services Platform
            </h1>
            <p className="text-white/80 text-xl sm:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with verified electricians, plumbers, carpenters, and more
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setCategory('All')}
                className="w-full sm:w-auto bg-white text-[#5B63B1] px-10 py-5 rounded-full font-black text-lg hover:shadow-2xl transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
              >
                Find Professionals
              </button>
              <Link 
                href="/jobs/new"
                className="w-full sm:w-auto bg-white/10 text-white border-2 border-white/20 backdrop-blur-md px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                Join as Professional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section (Floating) */}
      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
         <div className="bg-white rounded-3xl p-3 shadow-2xl shadow-black/10 border border-slate-100 flex flex-col sm:flex-row items-center gap-2">
            <form onSubmit={handleSearch} className="flex-1 flex items-center w-full">
               <div className="pl-6 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
               </div>
               <input 
                type="text" 
                placeholder="What service do you need?" 
                className="w-full py-5 px-4 bg-transparent outline-none text-slate-700 font-bold placeholder:text-slate-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
               />
            </form>
            <button 
              onClick={handleSearch}
              className="w-full sm:w-auto bg-[#5B63B1] text-white px-12 py-5 rounded-2xl font-black hover:bg-slate-900 transition-all active:scale-[0.95]"
            >
              Search
            </button>
         </div>
      </div>

      {/* Categories Grid */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900 mb-4">Services We Offer</h2>
            <p className="text-slate-500 text-xl font-medium">Professional home services at your fingertips</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`group relative flex flex-col bg-white rounded-[2rem] p-5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border ${
                  category === cat.name ? 'border-[#5B63B1] shadow-xl ring-2 ring-[#5B63B1]/10' : 'border-slate-100'
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                   <span className="font-black text-slate-900 text-sm tracking-tight">{cat.name}</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-[#5B63B1] transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                </div>
                
                <div className={`w-full aspect-[4/5] rounded-2xl overflow-hidden ${cat.color || 'bg-slate-50'}`}>
                   <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    onError={(e) => { e.target.src = 'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=400'; }}
                   />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
          <div className="flex-1">
             <h2 className="text-3xl font-black text-slate-900 mb-4">{t.latestRequests}</h2>
             <p className="text-slate-500 font-medium">{t.browseJobs}</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200">
             {STATUSES.map(s => (
               <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  status === s 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
               >
                 {s}
               </button>
             ))}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-3xl p-8 mb-12 text-center animate-in fade-in slide-in-from-top-4">
             <div className="text-2xl mb-2">🛑</div>
             <p className="font-bold text-lg">{error}</p>
             <button onClick={fetchJobs} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-500/20">Try again</button>
          </div>
        )}

        {/* Job grid */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-300">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">🔎</div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">No matching jobs</h3>
              <p className="text-slate-400 mb-10 max-w-sm mx-auto font-medium">We couldn't find any service requests. Try adjusting your search or filters.</p>
              <button 
                onClick={() => { setCategory('All'); setStatus('All'); setSearch(''); }}
                className="bg-blue-50 text-blue-600 px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-100 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => <JobCard key={job._id} job={job} />)}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Trust Footer */}
      <section className="bg-slate-900 text-white py-24">
         <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               <div className="space-y-4">
                  <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-400 text-2xl">🛡️</div>
                  <h4 className="text-xl font-bold">{t.verifiedPros}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Every tradesman is background checked and identity verified for your security.</p>
               </div>
               <div className="space-y-4">
                  <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 text-2xl">💰</div>
                  <h4 className="text-xl font-bold">{t.fairPricing}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Compare multiple quotes and choose the best value for your project budget.</p>
               </div>
               <div className="space-y-4">
                  <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-amber-400 text-2xl">⭐</div>
                  <h4 className="text-xl font-bold">{t.realReviews}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Read honest feedback from homeowners who used the service before you hire.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
