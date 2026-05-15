'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  const services = [
    {
      icon: '⚡',
      name: 'Electrical Services',
      color: 'from-yellow-400 to-amber-300',
      bgColor: 'bg-yellow-50',
      description: 'Licensed electricians for wiring, repairs, and installations',
      tasks: ['Light Installation', 'Ceiling Fans', 'Electrical Rewiring', 'Distribution Board Upgrades']
    },
    {
      icon: '🚰',
      name: 'Plumbing',
      color: 'from-blue-400 to-cyan-300',
      bgColor: 'bg-blue-50',
      description: 'Expert plumbing services for leaks and installations',
      tasks: ['Pipe Repairs', 'Drain Cleaning', 'Water Tank Installation', 'Bathroom Fittings']
    },
    {
      icon: '🎨',
      name: 'Painting',
      color: 'from-rose-400 to-pink-300',
      bgColor: 'bg-rose-50',
      description: 'Professional painting for interior and exterior',
      tasks: ['Interior Painting', 'Exterior Painting', 'Wall Texturing', 'Decorative Finishes']
    },
    {
      icon: '🔨',
      name: 'Carpentry & Joinery',
      color: 'from-orange-400 to-amber-300',
      bgColor: 'bg-orange-50',
      description: 'Skilled carpenters for furniture and custom woodwork',
      tasks: ['Kitchen Cabinets', 'Wardrobes', 'Shelving', 'Furniture Repair']
    },
    {
      icon: '🏠',
      name: 'Roofing',
      color: 'from-slate-400 to-stone-300',
      bgColor: 'bg-slate-50',
      description: 'Professional roofing services and leak repairs',
      tasks: ['Tile Replacement', 'Leak Repairs', 'Waterproofing', 'Roof Inspection']
    },
    {
      icon: '🌿',
      name: 'Gardening & Landscaping',
      color: 'from-emerald-400 to-green-300',
      bgColor: 'bg-emerald-50',
      description: 'Professional lawn and garden maintenance services',
      tasks: ['Lawn Mowing', 'Landscaping', 'Tree Trimming', 'Garden Design']
    },
    {
      icon: '✨',
      name: 'Cleaning Services',
      color: 'from-cyan-400 to-blue-300',
      bgColor: 'bg-cyan-50',
      description: 'Professional cleaning services for homes and offices',
      tasks: ['Deep Cleaning', 'Carpet Shampooing', 'Window Cleaning', 'Office Cleaning']
    },
    {
      icon: '❄️',
      name: 'AC & Refrigeration',
      color: 'from-indigo-400 to-purple-300',
      bgColor: 'bg-indigo-50',
      description: 'AC installation, maintenance, and repair services',
      tasks: ['AC Service', 'Gas Refill', 'Installation', 'Maintenance Contracts']
    },
    {
      icon: '🧱',
      name: 'Masonry & Construction',
      color: 'from-stone-400 to-slate-300',
      bgColor: 'bg-stone-50',
      description: 'Professional construction and masonry work',
      tasks: ['Wall Construction', 'Tile Work', 'Plastering', 'Concrete Work']
    },
    {
      icon: '🦟',
      name: 'Pest Control',
      color: 'from-purple-400 to-violet-300',
      bgColor: 'bg-purple-50',
      description: 'Safe and effective pest control solutions',
      tasks: ['Termite Treatment', 'Mosquito Control', 'General Pest Control', 'Inspection']
    },
    {
      icon: '🛋️',
      name: 'Interior Design',
      color: 'from-fuchsia-400 to-pink-300',
      bgColor: 'bg-fuchsia-50',
      description: 'Professional interior design and decoration services',
      tasks: ['Space Planning', 'Furniture Selection', 'Color Consultation', 'Renovation']
    },
    {
      icon: '🔧',
      name: 'General Repairs',
      color: 'from-slate-400 to-gray-300',
      bgColor: 'bg-slate-50',
      description: 'General home repair and maintenance services',
      tasks: ['Door Locks', 'Hardware Repairs', 'Minor Fixes', 'Maintenance']
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 soft-nude-bg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-6" style={{color: 'var(--text-heading)'}}>Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: 'var(--text-body)'}}>
            Browse our comprehensive range of professional home services. Find exactly what you need with qualified tradespeople ready to help.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className={`card-clean rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <div className="text-6xl mb-4" style={{color: 'var(--primary-mid)'}}>{service.icon}</div>
                <h3 className="text-2xl font-black mb-2" style={{color: 'var(--text-heading)'}}>{service.name}</h3>
                <p style={{color: 'var(--text-body)'}} className="mb-6 leading-relaxed">{service.description}</p>
                
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase mb-3" style={{color: 'var(--text-muted)'}}>Common Tasks:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tasks.map((task, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full font-semibold" style={{background: 'var(--accent-light)', color: 'var(--text-heading)'}}>
                        {task}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/" className="btn-primary inline-block px-6 py-2.5 rounded-full font-bold">
                  Find Professionals →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Guide Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center" style={{color: 'var(--text-heading)'}}>Average Service Costs in Sri Lanka</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-clean rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--text-heading)'}}>⚡ Electrical</h3>
              <div className="space-y-3" style={{color: 'var(--text-body)'}}>
                <div className="flex justify-between">
                  <span>Light Fixture</span>
                  <span className="font-bold">₨1,000 - 3,000</span>
                </div>
                <div className="flex justify-between">
                  <span>House Rewiring</span>
                  <span className="font-bold">₨80,000 - 200,000</span>
                </div>
              </div>
            </div>

            <div className="card-clean rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--text-heading)'}}>🚰 Plumbing</h3>
              <div className="space-y-3" style={{color: 'var(--text-body)'}}>
                <div className="flex justify-between">
                  <span>Pipe Repair</span>
                  <span className="font-bold">₨3,000 - 8,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Installation</span>
                  <span className="font-bold">₨5,000 - 15,000</span>
                </div>
              </div>
            </div>

            <div className="card-clean rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--text-heading)'}}>🎨 Painting</h3>
              <div className="space-y-3" style={{color: 'var(--text-body)'}}>
                <div className="flex justify-between">
                  <span>Per Sq Ft</span>
                  <span className="font-bold">₨80 - 150</span>
                </div>
                <div className="flex justify-between">
                  <span>Full Room</span>
                  <span className="font-bold">₨10,000 - 25,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-6" style={{color: 'var(--text-heading)'}}>Need a Professional?</h2>
          <p className="text-xl mb-8" style={{color: 'var(--text-body)'}}>Post your job today and get quotes from vetted professionals in your area</p>
          <Link href="/jobs/new" className="btn-primary inline-block px-8 py-3 rounded-full font-bold">
            Post a Job Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
