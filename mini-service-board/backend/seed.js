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
        description: 'Need an urgent plumber to fix a burst pipe under the kitchen sink. The water is leaking rapidly and needs immediate attention. Professional tools required.',
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
        description: 'New house construction in Kandy needs complete electrical wiring setup including main board installation and light fittings. Seeking a certified electrician.',
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
        description: 'Looking for a skilled painter to apply premium silk finish paint to a large living room. I already have the paint (Dulux), just need the labor and expertise.',
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
        description: 'Need custom teak wood cabinets for a modern kitchen layout. Professional finish and high-quality hinges are a priority.',
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
        description: 'Several tiles are broken causing leaks during heavy rain. Need someone to replace tiles and apply waterproof sealant.',
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
        description: 'Need a complete garden cleanup and lawn mowing for a 20 perch land. Also looking for someone to plant some fruit trees.',
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
        description: 'Urgent deep cleaning required for a 2000 sqft office before an event. Carpet shampooing and window cleaning included.',
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
        description: 'Two split unit ACs (12,000 BTU) need regular servicing and gas pressure check. One unit is making a rattling noise.',
        category: 'AC Technicians',
        location: 'Dehiwala',
        budget: 10500,
        contactName: 'Roshan Dias',
        contactEmail: 'roshan@example.com',
        status: 'In Progress',
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35242f3174d?auto=format&fit=crop&q=80&w=800',
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
