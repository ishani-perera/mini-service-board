'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutPage() {
  const features = [
    { icon: '✅', title: 'Verified Professionals', desc: 'All tradespeople are verified and background checked for your safety' },
    { icon: '⭐', title: 'Quality Guaranteed', desc: 'Rated professionals with proven track records and customer reviews' },
    { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges - get fair quotes from multiple professionals' },
    { icon: '⏱️', title: 'Quick Response', desc: 'Get multiple job bids within 24 hours from available professionals' },
    { icon: '🛡️', title: 'Secure & Safe', desc: 'Secure payment processing and protection for both homeowners and professionals' },
    { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer support to help resolve any issues' },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 soft-nude-bg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black mb-6 leading-tight" style={{color: 'var(--text-heading)'}}>
            About SourceTradesman
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed" style={{color: 'var(--text-body)'}}>
            Sri Lanka's most trusted home services marketplace connecting homeowners with verified professionals.
            Get quality services, fair prices, and peace of mind.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6" style={{color: 'var(--text-heading)'}}>Our Mission</h2>
              <p className="text-lg mb-4 leading-relaxed" style={{color: 'var(--text-body)'}}>
                We believe that finding reliable home services shouldn't be complicated or risky. Our platform empowers
                homeowners to connect directly with skilled, verified professionals in their area.
              </p>
              <p className="text-lg leading-relaxed" style={{color: 'var(--text-body)'}}>
                Whether you need an electrician, plumber, carpenter, or any other tradesperson, we've made it easy to
                compare options, read reviews, and hire with confidence.
              </p>
            </div>
            <div className="card-clean rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-2xl font-bold" style={{color: 'var(--text-heading)'}}>
                Making Home Repairs Simple & Reliable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{color: 'var(--text-heading)'}}>Why Choose SourceTradesman?</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{color: 'var(--text-muted)'}}>
              We've built the platform homeowners and professionals trust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card-clean rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{color: 'var(--text-heading)'}}>{feature.title}</h3>
                <p style={{color: 'var(--text-body)'}} className="leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black" style={{color: 'var(--primary-mid)'}}>50K+</div>
              <p className="font-semibold" style={{color: 'var(--text-muted)'}}>Jobs Completed</p>
            </div>
            <div>
              <div className="text-5xl font-black" style={{color: 'var(--primary-mid)'}}>10K+</div>
              <p className="font-semibold" style={{color: 'var(--text-muted)'}}>Verified Professionals</p>
            </div>
            <div>
              <div className="text-5xl font-black" style={{color: 'var(--primary-mid)'}}>95%</div>
              <p className="font-semibold" style={{color: 'var(--text-muted)'}}>Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-5xl font-black" style={{color: 'var(--primary-mid)'}}>24/7</div>
              <p className="font-semibold" style={{color: 'var(--text-muted)'}}>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-6" style={{color: 'var(--text-heading)'}}>Ready to Get Started?</h2>
          <p className="text-xl mb-8 leading-relaxed" style={{color: 'var(--text-body)'}}>
            Whether you need a professional or want to offer your services, join thousands of satisfied users today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary bg-white text-slate-800 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
              Browse Jobs
            </Link>
            <Link href="/jobs/new" className="btn-primary px-8 py-3 rounded-full font-bold">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
