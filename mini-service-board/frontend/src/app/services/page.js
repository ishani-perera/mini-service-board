'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: hovered ? `1.5px solid ${service.color}50` : '1.5px solid rgba(226,232,240,0.8)',
        borderRadius: 24,
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 48px -12px ${service.color}25, 0 8px 16px -4px ${service.color}15`
          : '0 4px 12px -2px rgba(0,0,0,0.03)',
        height: '100%',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 6,
        background: service.color,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: service.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
          transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: hovered ? `0 8px 24px ${service.color}30` : 'none',
        }}>
          {service.icon}
        </div>
        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          color: '#1a0a3d',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {service.name}
        </h3>
      </div>

      <p style={{
        color: '#64748b',
        fontSize: 15,
        lineHeight: 1.6,
        marginBottom: 24,
        flexGrow: 1,
      }}>
        {service.description}
      </p>

      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Common Requests
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {service.tasks.map((task, i) => (
            <span key={i} style={{
              background: service.bg,
              color: service.color,
              fontSize: 13,
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 8,
              border: `1px solid ${service.color}20`,
            }}>
              {task}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/jobs?category=${service.category}`}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          background: hovered ? service.color : '#f8fafc',
          color: hovered ? '#ffffff' : service.color,
          fontWeight: 800,
          fontSize: 15,
          padding: '14px 0',
          borderRadius: 12,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? `0 8px 20px ${service.color}40` : 'none',
        }}
      >
        Browse {service.name} Jobs →
      </Link>
    </div>
  );
};

export default function ServicesPage() {
  const services = [
    {
      icon: '⚡', category: 'ELECTRICAL', name: 'Electrical Services',
      bg: '#FEFCE8', color: '#a16207', iconBg: '#FEF9C3',
      description: 'Licensed electricians for wiring, repairs, and full installations.',
      tasks: ['Light Installation', 'Ceiling Fans', 'Rewiring', 'DB Upgrades']
    },
    {
      icon: '🚰', category: 'PLUMBING', name: 'Plumbing',
      bg: '#EFF6FF', color: '#1d4ed8', iconBg: '#DBEAFE',
      description: 'Expert plumbing services for leak fixes and new pipe installations.',
      tasks: ['Pipe Repairs', 'Drain Cleaning', 'Water Tanks', 'Bathrooms']
    },
    {
      icon: '🎨', category: 'PAINTING', name: 'Painting',
      bg: '#FFF1F5', color: '#be185d', iconBg: '#FCE7F3',
      description: 'Professional painting for interior spaces and exterior facades.',
      tasks: ['Interior Paint', 'Exterior Paint', 'Wall Texturing', 'Finishes']
    },
    {
      icon: '🪚', category: 'JOINERY', name: 'Carpentry',
      bg: '#F0FDF4', color: '#047857', iconBg: '#D1FAE5',
      description: 'Skilled carpenters for custom furniture, cabinets, and woodwork.',
      tasks: ['Cabinets', 'Wardrobes', 'Shelving', 'Repairs']
    },
    {
      icon: '🏠', category: 'ROOFING', name: 'Roofing',
      bg: '#F5F3FF', color: '#6d28d9', iconBg: '#EDE9FE',
      description: 'Professional roofing services, leak repairs, and full replacements.',
      tasks: ['Tile Replacement', 'Leak Repairs', 'Waterproofing', 'Inspections']
    },
    {
      icon: '🌿', category: 'GARDENING', name: 'Landscaping',
      bg: '#F0FDF4', color: '#15803d', iconBg: '#DCFCE7',
      description: 'Professional lawn care, garden maintenance, and landscaping.',
      tasks: ['Lawn Mowing', 'Landscaping', 'Tree Trimming', 'Design']
    },
    {
      icon: '✨', category: 'CLEANING', name: 'Cleaning',
      bg: '#F0F9FF', color: '#0369a1', iconBg: '#E0F2FE',
      description: 'Comprehensive cleaning services for homes, apartments, and offices.',
      tasks: ['Deep Cleaning', 'Carpet Wash', 'Windows', 'Offices']
    },
    {
      icon: '❄️', category: 'AC_TECH', name: 'AC & Cooling',
      bg: '#EFF9FF', color: '#0284c7', iconBg: '#E0F2FE',
      description: 'Air conditioning installation, maintenance, and emergency repairs.',
      tasks: ['AC Service', 'Gas Refill', 'Installations', 'Maintenance']
    },
    {
      icon: '🧱', category: 'MASONS', name: 'Masonry',
      bg: '#FFFBEB', color: '#b45309', iconBg: '#FEF3C7',
      description: 'Professional construction, bricklaying, and detailed masonry work.',
      tasks: ['Walls', 'Tile Work', 'Plastering', 'Concrete']
    },
    {
      icon: '🐛', category: 'PEST_CONTROL', name: 'Pest Control',
      bg: '#FFF0F5', color: '#be185d', iconBg: '#FCE7F3',
      description: 'Safe, fast, and effective pest control solutions for your home.',
      tasks: ['Termites', 'Mosquitoes', 'General Pests', 'Inspection']
    },
    {
      icon: '🛋️', category: 'INTERIOR', name: 'Interior Design',
      bg: '#FAF5FF', color: '#7e22ce', iconBg: '#F3E8FF',
      description: 'Professional interior design and space decoration services.',
      tasks: ['Space Planning', 'Furniture', 'Color Consult', 'Renovation']
    },
    {
      icon: '🔧', category: 'OTHER', name: 'General Repairs',
      bg: '#F9FAFB', color: '#475569', iconBg: '#F3F4F6',
      description: 'General handyman services for all minor home repairs.',
      tasks: ['Door Locks', 'Hardware', 'Minor Fixes', 'Handyman']
    }
  ];

  const MARKET_RATES = [
    { title: 'Electrical', icon: '⚡', items: [['Light Fixture', 'Rs1,000–3,000'], ['House Rewiring', 'Rs80,000+']] },
    { title: 'Plumbing', icon: '🚰', items: [['Pipe Repair', 'Rs3,000–8,000'], ['Water Tank', 'Rs40,000+']] },
    { title: 'Painting', icon: '🎨', items: [['Per Sq Ft', 'Rs80–150'], ['Full Room', 'Rs10,000+']] },
    { title: 'Joinery', icon: '🔨', items: [['Door Hang', 'Rs2,500+'], ['Wardrobe', 'Rs45,000+']] },
    { title: 'Roofing', icon: '🏠', items: [['Leak Repair', 'Rs5,000+'], ['Tile Replace', 'Rs15,000+']] },
    { title: 'Gardening', icon: '🌿', items: [['Lawn Mowing', 'Rs2,000+'], ['Landscaping', 'Rs20,000+']] },
    { title: 'Cleaning', icon: '✨', items: [['Deep Clean', 'Rs8,000+'], ['Sofa Wash', 'Rs3,500+']] },
    { title: 'AC Tech', icon: '❄️', items: [['AC Service', 'Rs3,500+'], ['Installation', 'Rs8,000+']] },
    { title: 'Masons', icon: '🧱', items: [['Wall Build', 'Rs250/sqft'], ['Tiling', 'Rs120/sqft']] },
    { title: 'Pest Control', icon: '🐛', items: [['General Pest', 'Rs4,000+'], ['Termite', 'Rs12,000+']] },
    { title: 'Interior', icon: '🛋️', items: [['Consultation', 'Rs5,000+'], ['3D Design', 'Rs25,000+']] },
    { title: 'Other', icon: '🔧', items: [['Lock Replace', 'Rs1,500+'], ['Appliance Fix', 'Rs2,500+']] }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(to right, #5B21B6, #9333EA, #F9A8D4)', // Soft Aurora Section 1
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow effects */}
        <div style={{ position: 'absolute', top: '-10%', right: '0%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(232,121,249,0.15)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '0%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', filter: 'blur(60px)' }} />

        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '6px 18px', marginBottom: 28 }}>
            <span style={{ fontSize: 15 }}>✨</span>
            <span style={{ color: '#ffffff', fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Professional Services Catalogue</span>
          </div>

          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Expert Solutions for <br />
            <span style={{ color: '#E879F9' }}>Every Home Need</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 19, maxWidth: 650, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Browse our comprehensive range of professional home services. Find exactly what you need with vetted, top-rated tradespeople across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{
        padding: '80px 20px',
        position: 'relative',
        background: 'linear-gradient(to right, #1E1B4B, #4C1D95, #A855F7)', // Soft Aurora Section 2
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Cost Guide Preview */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(to right, #312E81, #7C3AED, #E879F9)', // Soft Aurora Section 3
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 900, color: '#ffffff', marginBottom: 16 }}>
              Average Market Rates
            </h2>
            <p style={{ color: '#64748b', fontSize: 18, fontWeight: 500 }}>Transparent pricing guide for common services across Sri Lanka.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {MARKET_RATES.map((cat, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '24px 20px',
                border: '1px solid rgba(226,232,240,0.8)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{cat.icon}</span> {cat.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{item[0]}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{item[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: 'linear-gradient(to right, #0F172A, #312E81, #581C87)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(232,121,249,0.15) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: 20, letterSpacing: '-0.02em' }}>
            Ready to find a Professional?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 20, marginBottom: 40, fontWeight: 500 }}>
            Post your job today and get competitive quotes from vetted professionals in minutes.
          </p>
          <Link href="/jobs/new" style={{
            display: 'inline-flex',
            background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 16,
            padding: '16px 40px',
            borderRadius: 99,
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.3)';
            }}>
            Post a Job Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
