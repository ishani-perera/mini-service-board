const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JobRequest = require('./models/JobRequest');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/service-board';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await JobRequest.deleteMany();
    await User.deleteMany();

    // Create Admin User
    const hashedPassword = await bcrypt.hash('123456', 10);
    const admin = await User.create({
      name: 'Admin Tradesman',
      email: 'admin@example.com',
      password: hashedPassword,
    });
    console.log('✅ Demo Admin Created: admin@example.com / 123456');

    // Sample Jobs with Pictures
    const jobs = [
      {
        title: 'Leaking Pipe in Kitchen Sink',
        description: 'Need an urgent plumber to fix a burst pipe under the kitchen sink. The water is leaking rapidly and needs immediate attention. Professional tools required. I have 2 children so prefer someone who can work efficiently.',
        category: 'Plumbing',
        location: 'Colombo 07',
        budget: 5500,
        contactName: 'Nimal Perera',
        contactEmail: 'nimal@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Full House Electrical Wiring',
        description: 'New house construction in Kandy needs complete electrical wiring setup including main board installation and light fittings. Seeking a certified electrician with experience in modern homes. Project timeline is 2 weeks.',
        category: 'Electrical',
        location: 'Kandy',
        budget: 85000,
        contactName: 'Kasun Silva',
        contactEmail: 'kasun@example.com',
        status: 'In Progress',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Modern Living Room Painting',
        description: 'Looking for a skilled painter to apply premium silk finish paint to a large living room. I already have the paint (Dulux), just need the labor and expertise. The room is approximately 400 sq ft.',
        category: 'Painting',
        location: 'Negombo',
        budget: 12000,
        contactName: 'Ishani Fernando',
        contactEmail: 'ishani@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Teak Wood Kitchen Cabinets',
        description: 'Need custom teak wood cabinets for a modern kitchen layout. Professional finish and high-quality hinges are a priority. Dimensions: 12ft length, 8ft height. Design consultation needed.',
        category: 'Joinery',
        location: 'Galle',
        budget: 150000,
        contactName: 'Priyantha Bandara',
        contactEmail: 'priyantha@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Roof Leakage Repair (Tile Roof)',
        description: 'Several tiles are broken causing leaks during heavy rain. Need someone to replace tiles and apply waterproof sealant. Approximately 20 tiles need replacement. The roof area affected is about 200 sq ft.',
        category: 'Roofing',
        location: 'Battaramulla',
        budget: 25000,
        contactName: 'Saman Kumara',
        contactEmail: 'saman@example.com',
        status: 'Closed',
        imageUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Garden Landscaping & Maintenance',
        description: 'Need a complete garden cleanup and lawn mowing for a 20 perch land. Also looking for someone to plant some fruit trees (mango and coconut). Hedge trimming and lawn design consultation required.',
        category: 'Gardening',
        location: 'Rajagiriya',
        budget: 8000,
        contactName: 'Malani Jayasuriya',
        contactEmail: 'malani@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1558904541-efa8c191577e?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Deep Cleaning for Office Space',
        description: 'Urgent deep cleaning required for a 2000 sqft office before a corporate event. Carpet shampooing and window cleaning included. 50+ desks and conference room to clean. Timeline: 2 days.',
        category: 'Cleaning',
        location: 'Colombo 03',
        budget: 18000,
        contactName: 'Nuwan Perera',
        contactEmail: 'nuwan@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1581578731522-745d05cb9734?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'AC Service & Gas Refill',
        description: 'Two split unit ACs (12,000 BTU) need regular servicing and gas pressure check. One unit is making a rattling noise. Need preventive maintenance contract for 12 months.',
        category: 'AC Technicians',
        location: 'Dehiwala',
        budget: 10500,
        contactName: 'Roshan Dias',
        contactEmail: 'roshan@example.com',
        status: 'In Progress',
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35242f3174d?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Bathroom Renovation - Tiling & Fixtures',
        description: 'Complete bathroom renovation needed. New tiles for walls (200 sqft) and flooring (50 sqft). New bathtub, toilet, and sink installation. Plumbing connections needed. Budget includes materials and labor.',
        category: 'Plumbing',
        location: 'Mount Lavinia',
        budget: 95000,
        contactName: 'Chaminda Ranasinghe',
        contactEmail: 'chaminda@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Ceiling Fan Installation (5 units)',
        description: 'Install 5 ceiling fans throughout the house - living room, bedrooms (3), and kitchen. Different styles needed for each room. Electrical connections and wiring included. Timeline: 1 week.',
        category: 'Electrical',
        location: 'Wattala',
        budget: 18000,
        contactName: 'Dinesh Kumar',
        contactEmail: 'dinesh@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1564215298489-33efd302e2e1?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Exterior House Painting - 3 Story',
        description: 'Exterior painting for a 3-story house. Approximately 3000 sq ft. Need pressure washing, primer, and 2 coats of quality exterior paint. Color: Cream with brown trim. Scaffolding will be provided.',
        category: 'Painting',
        location: 'Colombo 05',
        budget: 65000,
        contactName: 'Amara Gunawardena',
        contactEmail: 'amara@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Custom Wooden Wardrobes for Bedroom',
        description: 'Custom wooden wardrobes for a master bedroom. Requirements: 2 large wardrobes (6ft width each), 1 dressing table. Teak wood preferred. Modern minimalist design. Include installation and finishing.',
        category: 'Joinery',
        location: 'Nugegoda',
        budget: 120000,
        contactName: 'Lakshmi Wijesinghe',
        contactEmail: 'lakshmi@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Gutter Cleaning and Roof Inspection',
        description: 'Gutters are clogged with leaves and debris. Need cleaning and inspection for any damage. Also check for algae growth and apply preventive coating. Single story home. Estimate: 6 hours work.',
        category: 'Roofing',
        location: 'Baddegama',
        budget: 8500,
        contactName: 'Gamini Perera',
        contactEmail: 'gamini@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1504385107118-1aa8a4faf00d?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Lawn Design with Sprinkler System',
        description: 'Design and install modern lawn with drip irrigation system. Approximately 2000 sqft area. Include ornamental plants, flower beds, and maintenance plan. Quarterly service included for 1 year.',
        category: 'Gardening',
        location: 'Matara',
        budget: 35000,
        contactName: 'Sunil Jayatissa',
        contactEmail: 'sunil@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1441696490222-92c01c1f5b74?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Post-Construction Deep Clean',
        description: 'Post-construction cleaning for newly built villa (3500 sqft). Heavy dust removal, window cleaning, floor polish, and sanitization required. Equipment and workers provided. Timeline: 3-4 days.',
        category: 'Cleaning',
        location: 'Colombo 04',
        budget: 42000,
        contactName: 'Sampath Abeysekera',
        contactEmail: 'sampath@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1633689149223-2ba8c6a1b40a?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'AC Installation - Brand New Unit',
        description: 'Install brand new 1.5 ton AC split unit in office. Need wall mounting, outdoor unit installation, and gas charging. Complete electrical wiring. Warranty registration and demo included.',
        category: 'AC Technicians',
        location: 'Jaffna',
        budget: 28000,
        contactName: 'Thushara Prabath',
        contactEmail: 'thushara@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1585422409397-21dc74f55e7b?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Underground Water Tank Installation',
        description: 'Install 5000-liter underground water tank for residential property. Includes excavation, civil work, plumbing connections, and safety cover. Need certified mason and plumber. Estimate: 1 week.',
        category: 'Plumbing',
        location: 'Gampaha',
        budget: 55000,
        contactName: 'Harsha Fernando',
        contactEmail: 'harsha@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Complete Kitchen Renovation',
        description: 'Full kitchen overhaul: new cabinets (teak), granite countertop, stove, sink, and lighting. Electrical work for new outlets. Approximately 200 sqft. Modern design consultation needed.',
        category: 'Joinery',
        location: 'Moratuwa',
        budget: 280000,
        contactName: 'Jayantha Bandara',
        contactEmail: 'jayantha@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Bedroom Wall Painting (Texture + Colors)',
        description: 'Paint 2 bedrooms with feature wall. Textured wall finish on one side, smooth matte on others. Color scheme: Master - Blue, Kids - Yellow. Total area: 600 sqft. Include primer and 2 coats.',
        category: 'Painting',
        location: 'Kalutara',
        budget: 16000,
        contactName: 'Nisha Perera',
        contactEmail: 'nisha@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1579181905449-aa3a12f0ed04?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Pest Control Service - Monthly Contract',
        description: 'Monthly pest control service for residential home. Includes cockroach, mosquito, and termite treatment. Chemical spraying and preventive measures. 12-month contract required. Quarterly inspection included.',
        category: 'Pest Control',
        location: 'Colombo 06',
        budget: 12000,
        contactName: 'Ravi Shankar',
        contactEmail: 'ravi@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1548872395-d2c3201371e7?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Wall Construction - Partition Walls',
        description: 'Construct 4 partition walls in office space for new departments. Brick masonry walls with plastering and painting. Total area: 800 sqft. Need structural drawings and approval documents.',
        category: 'Masons',
        location: 'Colombo 02',
        budget: 75000,
        contactName: 'Asanka Silva',
        contactEmail: 'asanka@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Interior Design Consultation + Execution',
        description: 'Complete interior design for villa - living room, dining, and master bedroom. Color scheme, furniture selection, lighting design, and execution supervision. Budget is for design + partial execution.',
        category: 'Interior',
        location: 'Colombo 08',
        budget: 180000,
        contactName: 'Priya Weerasekera',
        contactEmail: 'priya@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1574182645424-e4f5ad50e5d0?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Door Lock and Hardware Repair',
        description: 'Multiple door locks malfunctioning in house. Need repair or replacement of 8 door locks and hinges. Also install modern door handles and safety chains. Timeline: 1 day.',
        category: 'Other',
        location: 'Kandy',
        budget: 9500,
        contactName: 'Piyal Jayasinghe',
        contactEmail: 'piyal@example.com',
        status: 'Open',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      },
    ];

    await JobRequest.insertMany(jobs);
    console.log('✅ Database seeded with premium jobs and images!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
