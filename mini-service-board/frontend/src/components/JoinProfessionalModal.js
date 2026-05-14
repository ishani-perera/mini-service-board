'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function JoinProfessionalModal({ onClose }) {
  const [role, setRole] = useState('Professional');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    years: '',
    city: '',
    rate: '',
    description: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role.toLowerCase(),
      };
      
      // If professional, we could send additional profile data if backend supports it.
      // Assuming a standard auth/register endpoint for now.
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, payload);
      toast.success('Registration successful! Please login.');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-20 pb-20">
      <div className="bg-white rounded-3xl w-full max-w-lg flex flex-col shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Join SourceTradesman</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
             <button
                type="button"
                onClick={() => setRole('Customer')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${role === 'Customer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Customer
             </button>
             <button
                type="button"
                onClick={() => setRole('Professional')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${role === 'Professional' ? 'bg-[#634060] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                Professional
             </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
            <input type="text" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
            <input type="email" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="Enter email address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          {role === 'Professional' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input type="tel" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="+94 XX XXX XXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Type *</label>
                <select required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700 bg-white" value={formData.serviceType} onChange={(e) => setFormData({...formData, serviceType: e.target.value})}>
                  <option value="">Select service type</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Carpentry">Carpentry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience *</label>
                <input type="number" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="Enter years" value={formData.years} onChange={(e) => setFormData({...formData, years: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City/Location *</label>
                <select required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700 bg-white" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}>
                  <option value="">Select city</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hourly Rate (LKR) *</label>
                <input type="text" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="e.g., 1500" value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700 min-h-[80px] resize-y" placeholder="Tell us about your experience and services..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
            <input type="password" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="Create a password (min 6 characters)" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
            <input type="password" required className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#5B63B1] focus:ring-1 focus:ring-[#5B63B1] transition-all text-sm text-slate-700" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <input type="checkbox" id="terms" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#634060] focus:ring-[#5B63B1]" checked={formData.agreed} onChange={(e) => setFormData({...formData, agreed: e.target.checked})} />
            <label htmlFor="terms" className="text-xs text-slate-600">
              <span className="font-bold text-slate-900 block">I agree to SourceTradesman's Terms and Conditions</span>
              By checking this box, you confirm that you have read, understood, and agree to be bound by our <Link href="#" className="text-[#634060] hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#634060] hover:underline">Privacy Policy</Link>. *
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#634060] to-[#3E2040] hover:shadow-lg hover:shadow-[#634060]/30 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-slate-500 text-xs mt-4">
            Already have an account? <Link href="/login" onClick={onClose} className="text-[#634060] font-bold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
