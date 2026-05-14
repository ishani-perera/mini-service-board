'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createJob } from '../../../lib/api';
import Navbar from '../../../components/Navbar';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Roofing', 'Gardening', 'Cleaning', 'AC Technicians', 'Masons', 'Pest Control', 'Other'];

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: '',
    budget: '',
  });

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createJob(form);
      toast.success('Job posted successfully!');
      router.push('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create job. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm transition-all outline-none focus:ring-4 focus:ring-blue-500/10 ${
      errors[field] ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-blue-500'
    }`;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-10">
          <button 
            onClick={() => router.push('/')}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 mb-4 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900">Post a Service Request</h1>
          <p className="text-slate-500 mt-2">Let tradespeople know what you need help with.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-xl shadow-slate-200/20 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Fix leaking kitchen tap in Glasgow"
              className={inputClass('title')}
            />
            {errors.title && <p className="text-red-500 text-xs font-bold">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Provide as much detail as possible so tradespeople can understand the scope..."
              className={inputClass('description')}
            />
            {errors.description && <p className="text-red-500 text-xs font-bold">{errors.description}</p>}
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass('category') + ' bg-slate-50 cursor-pointer'}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Estimated Budget (LKR)</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 text-sm font-bold">LKR</span>
                <input
                  name="budget"
                  type="number"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  className={inputClass('budget') + ' pl-14'}
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Colombo or Glasgow"
                className={inputClass('location')}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Your Name</label>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass('contactName')}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Email Address</label>
                <input
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass('contactEmail')}
                />
                {errors.contactEmail && <p className="text-red-500 text-xs font-bold">{errors.contactEmail}</p>}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#7B81D8] to-[#5B63B1] text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-purple-500/20 active:scale-[0.98] disabled:opacity-60 transition-all"
            >
              {loading ? 'Posting Request...' : 'Post Request'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
