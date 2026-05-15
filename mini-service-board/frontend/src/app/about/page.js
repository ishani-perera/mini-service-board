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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black mb-6 leading-tight">
            About SourceTradesman
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Sri Lanka's most trusted home services marketplace connecting homeowners with verified professionals. 
            Get quality services, fair prices, and peace of mind.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                We believe that finding reliable home services shouldn't be complicated or risky. Our platform empowers 
                homeowners to connect directly with skilled, verified professionals in their area.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Whether you need an electrician, plumber, carpenter, or any other tradesperson, we've made it easy to 
                compare options, read reviews, and hire with confidence.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-2xl font-bold text-slate-900">
                Making Home Repairs Simple & Reliable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Why Choose SourceTradesman?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We've built the platform homeowners and professionals trust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">50K+</div>
              <p className="text-slate-600 font-semibold">Jobs Completed</p>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">10K+</div>
              <p className="text-slate-600 font-semibold">Verified Professionals</p>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">95%</div>
              <p className="text-slate-600 font-semibold">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-2">24/7</div>
              <p className="text-slate-600 font-semibold">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Whether you need a professional or want to offer your services, join thousands of satisfied users today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
              Browse Jobs
            </Link>
            <Link href="/jobs/new" className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-400 transition-all">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
