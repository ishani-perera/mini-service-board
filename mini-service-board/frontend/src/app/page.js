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
import FindProfessionalsModal from '../components/FindProfessionalsModal';
import JoinProfessionalModal from '../components/JoinProfessionalModal';

const CATEGORIES = [
  { name: 'Plumbing', icon: '🚰', color: 'from-blue-400 to-cyan-300', bgColor: 'bg-blue-50', count: 0 },
  { name: 'Electrical', icon: '⚡', color: 'from-amber-400 to-yellow-300', bgColor: 'bg-amber-50', count: 0 },
  { name: 'Painting', icon: '🎨', color: 'from-rose-400 to-pink-300', bgColor: 'bg-rose-50', count: 0 },
  { name: 'Joinery', icon: '🔨', color: 'from-orange-400 to-amber-300', bgColor: 'bg-orange-50', count: 0 },
  { name: 'Roofing', icon: '🏠', color: 'from-slate-400 to-stone-300', bgColor: 'bg-slate-50', count: 0 },
  { name: 'Gardening', icon: '🌿', color: 'from-emerald-400 to-green-300', bgColor: 'bg-emerald-50', count: 0 },
  { name: 'Cleaning', icon: '✨', color: 'from-cyan-400 to-blue-300', bgColor: 'bg-cyan-50', count: 0 },
  { name: 'AC Tech', icon: '❄️', color: 'from-indigo-400 to-purple-300', bgColor: 'bg-indigo-50', count: 0 },
  { name: 'Masons', icon: '🧱', color: 'from-stone-400 to-slate-300', bgColor: 'bg-stone-50', count: 0 },
  { name: 'Pest Control', icon: '🦟', color: 'from-purple-400 to-violet-300', bgColor: 'bg-purple-50', count: 0 },
  { name: 'Interior', icon: '🛋️', color: 'from-fuchsia-400 to-pink-300', bgColor: 'bg-fuchsia-50', count: 0 },
  { name: 'Other', icon: '⚙️', color: 'from-slate-400 to-gray-300', bgColor: 'bg-slate-50', count: 0 },
];

const STATUSES = ['All', 'Open', 'In Progress', 'Closed'];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
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
                onClick={() => setShowFindModal(true)}
                className="w-full sm:w-auto bg-white text-[#5B63B1] px-10 py-5 rounded-full font-black text-lg hover:shadow-2xl transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
              >
                Find Professionals
              </button>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="w-full sm:w-auto bg-white/10 text-white border-2 border-white/20 backdrop-blur-md px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                Join as Professional
              </button>
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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#5B63B1] to-purple-600 text-white font-bold text-sm rounded-full mb-6 shadow-lg shadow-purple-500/20">OUR SERVICES</span>
            <h2 className="text-6xl font-black text-slate-900 mb-6">Services We Offer</h2>
            <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Professional home services at your fingertips. Browse through our extensive range of skilled professionals ready to help.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setCategory(cat.name);
                    setTimeout(() => {
                      const mainElement = document.querySelector('main');
                      if (mainElement) {
                        mainElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className={`group relative flex flex-col items-center justify-center p-8 rounded-3xl transition-all duration-400 border-2 overflow-hidden
                    ${
                      isSelected 
                        ? 'border-[#5B63B1] bg-white shadow-2xl shadow-[#5B63B1]/30 scale-105 -translate-y-1' 
                        : 'border-slate-100 bg-white hover:border-[#5B63B1]/40 hover:shadow-2xl hover:-translate-y-2'
                    }`}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon container with gradient background */}
                  <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20`}>
                    <span className="text-5xl filter drop-shadow-lg">{cat.icon}</span>
                  </div>
                  
                  {/* Service name */}
                  <span className="font-black text-slate-900 text-base text-center leading-tight mb-3 relative z-10">{cat.name}</span>
                  
                  {/* Browse link with arrow */}
                  <div className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 relative z-10 ${
                    isSelected ? 'text-[#5B63B1]' : 'text-slate-500 group-hover:text-[#5B63B1]'
                  }`}>
                    <span>Browse</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-600 font-medium">Can't find what you need?</p>
            <button 
              onClick={() => setCategory('Other')}
              className="mt-3 px-8 py-3 bg-gradient-to-r from-[#5B63B1] to-purple-600 text-white font-black rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all active:scale-95"
            >
              Browse Other Services
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
          <div className="flex-1">
             <div className="inline-block px-5 py-2 bg-gradient-to-r from-[#5B63B1] to-purple-600 text-white font-bold text-xs rounded-full mb-6 shadow-lg shadow-purple-500/20">
                ACTIVE LISTINGS
             </div>
             <h2 className="text-5xl font-black text-slate-900 mb-4">{t.latestRequests}</h2>
             <p className="text-slate-600 text-lg font-medium">{t.browseJobs}</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all">
             {STATUSES.map(s => (
               <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  status === s 
                  ? 'bg-gradient-to-r from-[#5B63B1] to-purple-600 text-white shadow-lg shadow-purple-500/20 scale-105' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
               >
                 {s}
               </button>
             ))}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 text-red-700 rounded-3xl p-8 mb-16 text-center animate-in fade-in slide-in-from-top-4 shadow-md">
             <div className="text-4xl mb-3">⚠️</div>
             <p className="font-bold text-lg mb-4">{error}</p>
             <button onClick={fetchJobs} className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95">Retry Connection</button>
          </div>
        )}

        {/* Job grid */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-24 px-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border-2 border-dashed border-slate-300 shadow-sm">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-md">
                 <span className="text-5xl">🔍</span>
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">No Jobs Found</h3>
              <p className="text-slate-500 text-lg mb-12 max-w-md mx-auto font-medium">We couldn't find any service requests matching your filters. Try adjusting your search criteria.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                   onClick={() => { setCategory('All'); setStatus('All'); setSearch(''); }}
                   className="px-8 py-3 bg-gradient-to-r from-[#5B63B1] to-purple-600 text-white rounded-2xl font-black hover:shadow-xl hover:shadow-purple-500/30 transition-all active:scale-95"
                 >
                   Reset All Filters
                 </button>
                 <button 
                   onClick={() => setCategory('All')}
                   className="px-8 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-2xl font-black hover:bg-slate-50 transition-all active:scale-95"
                 >
                   Browse All Services
                 </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="mb-6 text-sm font-bold text-slate-500">
                 Showing <span className="text-slate-900 text-base">{jobs.length} job{jobs.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job, index) => (
                   <div key={job._id} className="animate-in fade-in slide-in-from-bottom-4" style={{animationDelay: `${index * 50}ms`}}>
                      <JobCard job={job} />
                   </div>
                ))}
              </div>
            </div>
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

      {/* Modals */}
      {showFindModal && <FindProfessionalsModal onClose={() => setShowFindModal(false)} />}
      {showJoinModal && <JoinProfessionalModal onClose={() => setShowJoinModal(false)} />}
    </div>
  );
}
