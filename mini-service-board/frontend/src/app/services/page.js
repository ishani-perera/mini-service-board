'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

// ── 1. LUXURY PURPLE & GOLD GLASS CARD ──
function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/jobs?category=${service.category}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '280px',
        // Card BG: Glassmorphism effect with deep purple tint
        background: hovered ? 'rgba(30, 16, 51, 0.9)' : 'rgba(124, 58, 237, 0.08)',
        backdropFilter: 'blur(12px)',
        // Hover border becomes Gold for luxury accent
        border: hovered ? `1px solid #FBBF24` : '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '24px',
        padding: '32px 24px',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        // Glow Effect: Purple glow with a hint of gold on hover
        boxShadow: hovered ? `0 15px 35px rgba(124, 58, 237, 0.3), 0 0 20px rgba(251, 191, 36, 0.15)` : '0 10px 30px -10px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
      }}
    >
      {/* Top subtle line - Turns Gold on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: `linear-gradient(90deg, #7C3AED, #FBBF24)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
      }} />

      {/* Center Icon */}
      <div style={{
        width: 80, height: 80, borderRadius: '24px',
        // Keeping original icon colors so it doesn't get TOO monotonous
        background: service.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'scale(1.15) rotate(10deg)' : 'scale(1)',
        border: `1px solid rgba(168, 85, 247, 0.3)`,
        boxShadow: hovered ? `0 10px 25px rgba(124, 58, 237, 0.4)` : 'none'
      }}>
        {service.icon}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#F5F3FF', margin: 0 }}>
          {service.name}
        </h3>
        <p style={{ color: '#A78BFA', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
          {service.description}
        </p>
      </div>

      {/* Action Text - Turns Gold on Hover */}
      <div style={{
        marginTop: 'auto',
        color: hovered ? '#FBBF24' : '#A855F7',
        fontWeight: 800, fontSize: '0.95rem',
        display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.3s',
        textShadow: hovered ? '0 0 10px rgba(251, 191, 36, 0.5)' : 'none'
      }}>
        Explore Jobs <span style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateX(6px)' : 'translateX(0)' }}>→</span>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const services = [
    { icon: '⚡', category: 'ELECTRICAL', name: 'Electrical', iconBg: 'rgba(250, 204, 21, 0.15)', description: 'Licensed electricians for wiring, repairs, and full installations.', tasks: ['Light Install', 'Wiring', 'DB Upgrades'] },
    { icon: '🚰', category: 'PLUMBING', name: 'Plumbing', iconBg: 'rgba(66, 165, 245, 0.15)', description: 'Expert plumbing services for leak fixes and new pipe installations.', tasks: ['Pipe Repairs', 'Drains', 'Bathrooms'] },
    { icon: '🎨', category: 'PAINTING', name: 'Painting', iconBg: 'rgba(244, 114, 182, 0.15)', description: 'Professional painting for interior spaces and exterior facades.', tasks: ['Interior', 'Exterior', 'Textures'] },
    { icon: '🪚', category: 'JOINERY', name: 'Joinery', iconBg: 'rgba(52, 211, 153, 0.15)', description: 'Skilled carpenters for custom furniture, cabinets, and woodwork.', tasks: ['Cabinets', 'Doors', 'Repairs'] },
    { icon: '🏠', category: 'ROOFING', name: 'Roofing', iconBg: 'rgba(126, 87, 194, 0.15)', description: 'Professional roofing services, leak repairs, and full replacements.', tasks: ['Tiles', 'Leaks', 'Waterproof'] },
    { icon: '🌿', category: 'GARDENING', name: 'Gardening', iconBg: 'rgba(74, 222, 128, 0.15)', description: 'Professional lawn care, garden maintenance, and landscaping.', tasks: ['Lawn', 'Landscaping', 'Trimming'] },
    { icon: '✨', category: 'CLEANING', name: 'Cleaning', iconBg: 'rgba(56, 189, 248, 0.15)', description: 'Comprehensive cleaning services for homes, apartments, and offices.', tasks: ['Deep Clean', 'Carpets', 'Windows'] },
    { icon: '❄️', category: 'AC_TECH', name: 'AC & Cooling', iconBg: 'rgba(125, 211, 252, 0.15)', description: 'Air conditioning installation, maintenance, and emergency repairs.', tasks: ['Service', 'Gas Refill', 'Install'] },
    { icon: '🧱', category: 'MASONS', name: 'Masons', iconBg: 'rgba(251, 191, 36, 0.15)', description: 'Professional construction, bricklaying, and detailed masonry work.', tasks: ['Walls', 'Tiles', 'Concrete'] },
    { icon: '🐛', category: 'PEST_CONTROL', name: 'Pest Control', iconBg: 'rgba(249, 168, 212, 0.15)', description: 'Safe, fast, and effective pest control solutions for your home.', tasks: ['Termites', 'Mosquitoes', 'General'] },
    { icon: '🛋️', category: 'INTERIOR', name: 'Interior', iconBg: 'rgba(106, 27, 154, 0.15)', description: 'Professional interior design and space decoration services.', tasks: ['Planning', 'Furniture', 'Decor'] },
    { icon: '🔧', category: 'OTHER', name: 'Handyman', iconBg: 'rgba(148, 163, 184, 0.15)', description: 'General handyman services for all minor home repairs.', tasks: ['Locks', 'Hardware', 'Handyman'] }
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
    // MAIN BG: #0F0817 (Very Deep Purple/Black)
    <div className="min-h-screen font-sans text-white bg-[#0F0817] relative overflow-x-hidden">
      <Navbar />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes floatSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0) rotate(-10deg); } 50% { transform: translateY(-15px) rotate(0deg); } }
      `}} />

      {/* ── HERO SECTION ── */}
      <section style={{
        padding: '160px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #1E1033'
      }}>
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1E1033]/50 to-[#0F0817]" />

        {/* Big Glowing Orbs (Purple & Gold) */}
        <div className="absolute top-0 left-[15%] w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px] opacity-20 z-0 animate-floatSlow" />
        <div className="absolute bottom-0 right-[15%] w-80 h-80 bg-[#FBBF24] rounded-full blur-[120px] opacity-10 z-0 animate-floatFast" />

        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(124, 58, 237, 0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: 99, padding: '8px 24px', marginBottom: 32,
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)'
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ color: '#FBBF24', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Professional Services Catalogue</span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900, color: '#F5F3FF', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em',
          }}>
            Find the Perfect Pro for <br />
            {/* Accent Gold color for emphasis */}
            <span style={{ color: '#FBBF24', textShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}>
              Every Home Need 🏠
            </span>
          </h1>

          <p style={{ color: '#A78BFA', fontSize: '1.15rem', maxWidth: 650, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Browse our comprehensive range of professional home services. Find exactly what you need with vetted, top-rated tradespeople.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID SECTION ── */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        background: '#0F0817',
      }}>

        {/* Subtle mesh/dots */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }} />

        {/* CONTAINER */}
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION SEPARATION & COST GUIDE ── */}
      <section style={{
        padding: '100px 20px',
        // Slightly different shade for separation (#13091F)
        background: '#13091F',
        borderTop: '1px solid #3D1F66', // Subtle purple border
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, color: '#F5F3FF', marginBottom: 16 }}>
              <span style={{ color: '#FBBF24' }}>💰</span> Average Market Rates
            </h2>
            <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Transparent pricing guide for common services across Sri Lanka.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {MARKET_RATES.map((cat, idx) => (
              <div key={idx} style={{
                // Card Background: #1E1033
                background: '#1E1033',
                borderRadius: '20px',
                padding: '24px 20px',
                border: '1px solid #3D1F66',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                  e.currentTarget.style.borderColor = '#A855F7';
                  e.currentTarget.style.boxShadow = `0 15px 30px rgba(124, 58, 237, 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = '#3D1F66';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5F3FF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24, background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '6px', borderRadius: '12px' }}>{cat.icon}</span>
                  {cat.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, background: '#0F0817', padding: '10px 12px', borderRadius: '10px' }}>
                      <span style={{ fontSize: 12, color: '#A78BFA', fontWeight: 600 }}>{item[0]}</span>
                      {/* Price in Gold for Accent */}
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#FBBF24' }}>{item[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{
        padding: '120px 20px',
        textAlign: 'center',
        background: '#0F0817',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #3D1F66'
      }}>

        {/* Glow behind the CTA box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-[#7C3AED] rounded-full blur-[150px] opacity-20 z-0" />

        <div className="max-w-4xl mx-auto relative z-10 bg-[#1E1033] p-12 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#3D1F66]">
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#F5F3FF', marginBottom: 20 }}>
            Got a Job? We've got Pros! 🚀
          </h2>
          <p style={{ color: '#A78BFA', fontSize: '1.2rem', marginBottom: 40, fontWeight: 500 }}>
            Post your job today and get competitive quotes from vetted professionals in minutes.
          </p>
          <Link href="/jobs/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            // Button in Accent Gold
            background: '#FBBF24', color: '#0F0817',
            fontWeight: 900, fontSize: 18, padding: '18px 40px', borderRadius: '100px',
            textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 191, 36, 0.5)';
              e.currentTarget.style.background = '#FCD34D'; // Lighter gold on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.3)';
              e.currentTarget.style.background = '#FBBF24';
            }}>
            Post a Job Now <span style={{ fontSize: 22 }}>✨</span>
          </Link>
        </div>
      </section>
    </div>
  );
}