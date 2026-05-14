'use client';
import React, { useState } from 'react';

const mockProfessionals = [
  {
    id: 1,
    initials: 'DE',
    name: 'DILEENA ELECTRICALS',
    profession: 'Electrician',
    location: 'Colombo',
    rating: 4.90,
    reviews: 0,
    rate: 2145.00,
    description: '"Professional electrical services including wiring, repairs, installations, and maintenance"',
    phone: '0773186552',
    color: 'bg-indigo-500'
  },
  {
    id: 2,
    initials: 'KE',
    name: 'KUMARA ELECTRICALS',
    profession: 'Electrician',
    location: 'Colombo',
    rating: 4.30,
    reviews: 0,
    rate: 2043.00,
    description: '"Professional electrical services including wiring, repairs, installations, and maintenance"',
    phone: '0707777307',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    initials: 'AE',
    name: 'ANJANA ELECTRICALS',
    profession: 'Electrician',
    location: 'Colombo',
    rating: 4.80,
    reviews: 0,
    rate: 2489.00,
    description: '"Professional electrical services including wiring, repairs, installations, and maintenance"',
    phone: '0764181501',
    color: 'bg-blue-500'
  },
  {
    id: 4,
    initials: 'ME',
    name: 'MP ELECTRICALS',
    profession: 'Electrician',
    location: 'Colombo',
    rating: 4.60,
    reviews: 0,
    rate: 1981.00,
    description: '"Professional electrical services including wiring, repairs, installations, and maintenance"',
    phone: '0779262168',
    color: 'bg-violet-500'
  },
  {
    id: 5,
    initials: 'MI',
    name: 'MILINDA ELECTRICALS',
    profession: 'Electrician',
    location: 'Colombo',
    rating: 4.00,
    reviews: 0,
    rate: 1800.00,
    description: '"Professional electrical services including wiring, repairs, installations, and maintenance"',
    phone: '0712345678',
    color: 'bg-blue-400'
  }
];

export default function FindProfessionalsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Find Professionals (50 found)</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 p-4 border-b border-slate-100 bg-slate-50/50">
          <select className="flex-1 p-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500">
            <option>All Services</option>
            <option>Electrical</option>
            <option>Plumbing</option>
          </select>
          <select className="flex-1 p-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500">
            <option>All Locations</option>
            <option>Colombo</option>
            <option>Kandy</option>
          </select>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockProfessionals.map((prof) => (
            <div key={prof.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-5">
              {/* Avatar */}
              <div className={`w-14 h-14 rounded-full ${prof.color} text-white flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                {prof.initials}
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 uppercase text-sm tracking-wide">{prof.name}</h3>
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    SourceTradesman Approved
                  </span>
                </div>
                
                <div className="text-sm text-slate-500 mb-2">
                  <span className="font-medium text-slate-700">{prof.profession}</span> | {prof.location}
                </div>
                
                <div className="flex items-center gap-1 text-sm mb-1 text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="font-medium">{prof.rating.toFixed(2)}</span>
                  <span className="text-slate-400">({prof.reviews} reviews)</span>
                </div>
                
                <div className="text-sm mb-3">
                  <span className="font-bold text-slate-900">Rate:</span> <span className="text-slate-600">LKR {prof.rate.toFixed(2)}/hour</span>
                </div>
                
                <p className="text-sm text-slate-500 italic mb-3">{prof.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-[#5B63B1] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {prof.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
