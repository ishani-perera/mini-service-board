'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createJob } from '../../../lib/api';
import Navbar from '../../../components/Navbar';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Roofing', 'Gardening', 'Cleaning', 'Other'];

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
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Post a Service Request</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to post your job.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Fix leaking kitchen tap"
              className={inputClass('title')}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the job in detail..."
              className={inputClass('description')}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass('category') + ' bg-white'}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Glasgow"
                className={inputClass('location')}
              />
            </div>
          </div>

          {/* Contact Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass('contactName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className={inputClass('contactEmail')}
              />
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {loading ? 'Posting...' : 'Post Job'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
