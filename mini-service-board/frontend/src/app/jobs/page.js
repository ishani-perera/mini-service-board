'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import JobCard from '../../components/JobCard';
import SkeletonCard from '../../components/SkeletonCard';
import { getJobs } from '../../lib/api';

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Closed'];

const CATEGORY_MAP = {
  'PLUMBING': 'Plumbing',
  'ELECTRICAL': 'Electrical',
  'PAINTING': 'Painting',
  'JOINERY': 'Joinery',
  'ROOFING': 'Roofing',
  'GARDENING': 'Gardening',
  'CLEANING': 'Cleaning',
  'AC_TECH': 'AC Technicians',
  'MASONS': 'Masons',
  'PEST_CONTROL': 'Pest Control',
  'INTERIOR': 'Interior',
  'OTHER': 'Other',
};

export default function JobsPage() {
  const [category, setCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Get category from URL search params - only on client
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    setCategory(cat);
  }, []);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await getJobs();
        setJobs(response.data || []);
      } catch (error) {
        console.error('Error loading jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    // Filter by status
    if (filter !== 'All' && job.status !== filter) {
      return false;
    }
    // Filter by category if provided
    if (category && CATEGORY_MAP[category]) {
      if (job.category !== CATEGORY_MAP[category]) {
        return false;
      }
    }
    return true;
  });

  const categoryDisplay = category ? CATEGORY_MAP[category] || category : null;

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      
      {!isMounted ? null : (
      <>
      {/* Hero Section */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, rgba(250,204,21,0.1), rgba(249,115,22,0.05))' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag" style={{ display: 'inline-block', marginBottom: 12 }}>
              ● Active Listings
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 12 }}>
              Latest Job Requests
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              {categoryDisplay ? `Browse active job requests for ${categoryDisplay} services` : 'Browse all active job requests posted by homeowners'}
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section style={{ padding: '60px 0', background: 'var(--bg-page)' }}>
        <div className="site-container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {STATUS_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-tab btn-touch ${filter === f ? 'active' : ''}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: filter === f ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: filter === f ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                  color: filter === f ? 'var(--primary)' : 'var(--text-body)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Count */}
          {!loading && (
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 20, fontWeight: 500 }}>
              Showing <strong style={{ color: 'var(--primary)' }}>{filteredJobs.length} jobs</strong>
            </p>
          )}

          {/* Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', fontWeight: 500 }}>No jobs found matching your criteria.</p>
              <Link href="/" className="btn-primary btn-touch" style={{ display: 'inline-flex', marginTop: 24 }}>
                Back to Home
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {filteredJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
      </>
      )}
    </div>
  );
}
