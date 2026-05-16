'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

// ── 1. PREMIUM DARK BOUNCY SERVICE CARD ──
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
        background: hovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: hovered ? `2px solid ${service.color}` : '2px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '32px 24px',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 25px 50px -12px ${service.color}40, 0 0 0 1px ${service.color}30` : '0 10px 30px -10px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: `linear-gradient(90deg, ${service.color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
      }} />

      <div style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: `radial-gradient(circle, ${service.color}15 0%, transparent 50%)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: 'none'
      }} />

      <div style={{
        width: 80, height: 80, borderRadius: '24px',
        background: service.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hovered ? 'scale(1.15) rotate(10deg)' : 'scale(1)',
        border: `1px solid ${service.color}30`,
        boxShadow: hovered ? `0 10px 25px ${service.color}40` : 'none'
      }}>
        {service.icon}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          {service.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
          {service.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
        {service.tasks.slice(0, 3).map((task, i) => (
          <span key={i} style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#cbd5e1',
            fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {task}
          </span>
        ))}
      </div>

      <div style={{
        marginTop: 'auto',
        color: hovered ? service.color : '#a78bfa',
        fontWeight: 700, fontSize: '0.95rem',
        display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.3s'
      }}>
        Explore Jobs <span style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateX(6px)' : 'translateX(0)' }}>→</span>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const services = [
    { icon: '⚡', category: 'ELECTRICAL', name: 'Electrical', bg: '#FEFCE8', color: '#facc15', iconBg: 'rgba(250, 204, 21, 0.15)', description: 'Licensed electricians for wiring, repairs, and full installations.', tasks: ['Light Install', 'Wiring', 'DB Upgrades'] },
    { icon: '🚰', category: 'PLUMBING', name: 'Plumbing', bg: '#EFF6FF', color: '#42A5F5', iconBg: 'rgba(66, 165, 245, 0.15)', description: 'Expert plumbing services for leak fixes and new pipe installations.', tasks: ['Pipe Repairs', 'Drains', 'Bathrooms'] },
    { icon: '🎨', category: 'PAINTING', name: 'Painting', bg: '#FFF1F5', color: '#f472b6', iconBg: 'rgba(244, 114, 182, 0.15)', description: 'Professional painting for interior spaces and exterior facades.', tasks: ['Interior', 'Exterior', 'Textures'] },
    { icon: '🪚', category: 'JOINERY', name: 'Joinery', bg: '#F0FDF4', color: '#34d399', iconBg: 'rgba(52, 211, 153, 0.15)', description: 'Skilled carpenters for custom furniture, cabinets, and woodwork.', tasks: ['Cabinets', 'Doors', 'Repairs'] },
    { icon: '🏠', category: 'ROOFING', name: 'Roofing', bg: '#F5F3FF', color: '#7E57C2', iconBg: 'rgba(126, 87, 194, 0.15)', description: 'Professional roofing services, leak repairs, and full replacements.', tasks: ['Tiles', 'Leaks', 'Waterproof'] },
    { icon: '🌿', category: 'GARDENING', name: 'Gardening', bg: '#F0FDF4', color: '#4ade80', iconBg: 'rgba(74, 222, 128, 0.15)', description: 'Professional lawn care, garden maintenance, and landscaping.', tasks: ['Lawn', 'Landscaping', 'Trimming'] },
    { icon: '✨', category: 'CLEANING', name: 'Cleaning', bg: '#F0F9FF', color: '#38bdf8', iconBg: 'rgba(56, 189, 248, 0.15)', description: 'Comprehensive cleaning services for homes, apartments, and offices.', tasks: ['Deep Clean', 'Carpets', 'Windows'] },
    { icon: '❄️', category: 'AC_TECH', name: 'AC & Cooling', bg: '#EFF9FF', color: '#7dd3fc', iconBg: 'rgba(125, 211, 252, 0.15)', description: 'Air conditioning installation, maintenance, and emergency repairs.', tasks: ['Service', 'Gas Refill', 'Install'] },
    { icon: '🧱', category: 'MASONS', name: 'Masons', bg: '#FFFBEB', color: '#fbbf24', iconBg: 'rgba(251, 191, 36, 0.15)', description: 'Professional construction, bricklaying, and detailed masonry work.', tasks: ['Walls', 'Tiles', 'Concrete'] },
    { icon: '🐛', category: 'PEST_CONTROL', name: 'Pest Control', bg: '#FFF0F5', color: '#f9a8d4', iconBg: 'rgba(249, 168, 212, 0.15)', description: 'Safe, fast, and effective pest control solutions for your home.', tasks: ['Termites', 'Mosquitoes', 'General'] },
    { icon: '🛋️', category: 'INTERIOR', name: 'Interior', bg: '#FAF5FF', color: '#6A1B9A', iconBg: 'rgba(106, 27, 154, 0.15)', description: 'Professional interior design and space decoration services.', tasks: ['Planning', 'Furniture', 'Decor'] },
    { icon: '🔧', category: 'OTHER', name: 'Handyman', bg: '#F8FAFC', color: '#94a3b8', iconBg: 'rgba(148, 163, 184, 0.15)', description: 'General handyman services for all minor home repairs.', tasks: ['Locks', 'Hardware', 'Handyman'] }
  ];

  const MARKET_RATES = [
    { title: 'Electrical', icon: '⚡', color: '#facc15', items: [['Light Fixture', 'Rs1,000–3,000'], ['House Rewiring', 'Rs80,000+']] },
    { title: 'Plumbing', icon: '🚰', color: '#42A5F5', items: [['Pipe Repair', 'Rs3,000–8,000'], ['Water Tank', 'Rs40,000+']] },
    { title: 'Painting', icon: '🎨', color: '#f472b6', items: [['Per Sq Ft', 'Rs80–150'], ['Full Room', 'Rs10,000+']] },
    { title: 'Joinery', icon: '🔨', color: '#34d399', items: [['Door Hang', 'Rs2,500+'], ['Wardrobe', 'Rs45,000+']] },
    { title: 'Roofing', icon: '🏠', color: '#7E57C2', items: [['Leak Repair', 'Rs5,000+'], ['Tile Replace', 'Rs15,000+']] },
    { title: 'Gardening', icon: '🌿', color: '#4ade80', items: [['Lawn Mowing', 'Rs2,000+'], ['Landscaping', 'Rs20,000+']] },
    { title: 'Cleaning', icon: '✨', color: '#38bdf8', items: [['Deep Clean', 'Rs8,000+'], ['Sofa Wash', 'Rs3,500+']] },
    { title: 'AC Tech', icon: '❄️', color: '#7dd3fc', items: [['AC Service', 'Rs3,500+'], ['Installation', 'Rs8,000+']] },
    { title: 'Masons', icon: '🧱', color: '#fbbf24', items: [['Wall Build', 'Rs250/sqft'], ['Tiling', 'Rs120/sqft']] },
    { title: 'Pest Control', icon: '🐛', color: '#f9a8d4', items: [['General Pest', 'Rs4,000+'], ['Termite', 'Rs12,000+']] },
    { title: 'Interior', icon: '🛋️', color: '#6A1B9A', items: [['Consultation', 'Rs5,000+'], ['3D Design', 'Rs25,000+']] },
    { title: 'Other', icon: '🔧', color: '#94a3b8', items: [['Lock Replace', 'Rs1,500+'], ['Appliance Fix', 'Rs2,500+']] }
  ];

  return (
    <div className="min-h-screen font-sans text-white bg-[#120524] relative overflow-x-hidden">
      <Navbar />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes floatReverse { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-8deg); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0) rotate(-10deg); } 50% { transform: translateY(-15px) rotate(0deg); } }
      `}} />

      {/* ── 2. NEW DARK SPLIT-LAYOUT HERO SECTION (FIXED IMAGE CROPPING) ── */}
      <section style={{
        padding: '160px 20px 100px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url('/services-bg.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(40px)', opacity: 0.2, zIndex: 0,
        }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#120524]/90 via-[#4527A0]/30 to-[#120524]" />

        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-[#7C3AED] rounded-full blur-[120px] opacity-20 z-0 animate-floatSlow" />
        <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-[#FBBF24] rounded-full blur-[100px] opacity-10 z-0 animate-floatFast" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="flex-1 text-center lg:text-left">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(124, 58, 237, 0.1)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: 99, padding: '8px 24px', marginBottom: 24,
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)'
            }}>
              <span style={{ fontSize: 16 }}>✨</span>
              <span style={{ color: '#FBBF24', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Professional Services</span>
            </div>

            <h1 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 900, color: '#F5F3FF', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em',
            }}>
              Find the Perfect Pro for <br />
              <span style={{ color: '#FBBF24', textShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}>
                Every Home Need
              </span>
            </h1>

            <p style={{ color: '#A78BFA', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto lg:mx-0', lineHeight: 1.6, fontWeight: 500, marginBottom: 40 }}>
              Browse our comprehensive range of professional home services. Find exactly what you need with vetted, top-rated tradespeople.
            </p>

            <div className="flex justify-center lg:justify-start gap-4">
              <Link href="/jobs/new" style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: '#FBBF24', color: '#0F0817',
                fontWeight: 900, fontSize: 18, padding: '18px 40px', borderRadius: '100px',
                textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 191, 36, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.3)';
                }}>
                Post a Job <span style={{ fontSize: '22px' }}>🚀</span>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: PICTURE & STICKERS (FIXED IMAGE CROPPING) */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none mt-10 lg:mt-0">

            {/* Main Picture Frame */}
            <div style={{
              position: 'relative',
              width: '100%',
              minHeight: '550px', // <-- මෙතන උස වැඩි කරා පින්තූරය පැහැදිලිව පේන්න
              borderRadius: '3rem',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              border: '4px solid rgba(168, 85, 247, 0.3)'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: "url('/hero-worker.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center top', // <-- මෙතන 'top' දුන්න නිසා මූණ/ඔළුව කැපෙන්නේ නෑ!
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(18, 5, 36, 0.9) 100%)' }} />
            </div>

            {/* FLOATING 3D STICKERS */}
            <div className="absolute -top-6 -left-6 z-20" style={{ animation: 'float 5s infinite ease-in-out' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(30, 16, 51, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 15px 30px rgba(0,0,0,0.4)', border: '1px solid rgba(168, 85, 247, 0.4)', transform: 'rotate(-10deg)' }}>
                🚰
              </div>
            </div>

            <div className="absolute -bottom-8 -right-6 z-20" style={{ animation: 'floatReverse 6s infinite ease-in-out' }}>
              <div style={{ width: '90px', height: '90px', background: 'rgba(30, 16, 51, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', boxShadow: '0 15px 30px rgba(0,0,0,0.4)', border: '1px solid rgba(168, 85, 247, 0.4)', transform: 'rotate(15deg)' }}>
                ⚡
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute bottom-8 -left-12 z-20 hidden md:block" style={{ animation: 'float 7s infinite ease-in-out' }}>
              <div style={{ background: 'rgba(30, 16, 51, 0.8)', backdropFilter: 'blur(10px)', padding: '16px 24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                <span style={{ fontSize: '2.2rem' }}>🏆</span>
                <div>
                  <div style={{ fontWeight: 900, color: '#F5F3FF', fontSize: '1.2rem' }}>Top Rated</div>
                  <div style={{ color: '#FBBF24', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>Professionals</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES GRID SECTION ── */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        background: '#120524',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(69, 39, 160, 0.15) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COST GUIDE SECTION ── */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(to bottom, #120524, #1A0B2E)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
              💰 Average Market Rates
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Transparent pricing guide for common services across Sri Lanka.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {MARKET_RATES.map((cat, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '24px 20px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.boxShadow = `0 15px 30px ${cat.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24, background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px' }}>{cat.icon}</span>
                  {cat.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '10px' }}>
                      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{item[0]}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: cat.color }}>{item[1]}</span>
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
        padding: '100px 20px',
        textAlign: 'center',
        background: '#120524',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>

        <div className="max-w-4xl mx-auto relative z-10 bg-gradient-to-r from-[#4527A0] via-[#6A1B9A] to-[#42A5F5] p-12 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(66,165,245,0.2)] border border-white/20">
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: 20 }}>
            Got a Job? We've got Pros! 🚀
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: 40, fontWeight: 500 }}>
            Post your job today and get competitive quotes from vetted professionals in minutes.
          </p>
          <Link href="/jobs/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: '#ffffff', color: '#4527A0',
            fontWeight: 900, fontSize: 18, padding: '18px 40px', borderRadius: '100px',
            textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}>
            Post a Job Now <span style={{ fontSize: 22 }}>✨</span>
          </Link>
        </div>
      </section>
    </div>
  );
}