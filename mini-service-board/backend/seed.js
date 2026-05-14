require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const JobRequest = require('./models/JobRequest');
const User = require('./models/User');

const demoUser = {
  name: 'Admin Tradesman',
  email: 'admin@example.com',
  password: '123456', // Will be hashed by pre-save hook
  role: 'tradesman',
};

const sampleJobs = [
  {
    title: 'Fix leaking kitchen tap in Colombo',
    description: 'Kitchen tap has been dripping for a week. Need a plumber to fix or replace the washer. Water is wasting rapidly.',
    category: 'Plumbing',
    location: 'Colombo 03',
    contactName: 'Nimal Perera',
    contactEmail: 'nimal@example.com',
    status: 'Open',
    budget: 2500,
  },
  {
    title: 'AC Servicing for Living Room',
    description: 'Inverter AC needs full servicing and gas refill. It has not been cleaned for 6 months.',
    category: 'AC Technicians',
    location: 'Kandy',
    contactName: 'Kamal Silva',
    contactEmail: 'kamal@example.com',
    status: 'Open',
    budget: 4500,
  },
  {
    title: 'Full House Interior Painting',
    description: 'Looking for professional painters to repaint a 3-bedroom house. High quality finish required. Materials can be discussed.',
    category: 'Painting',
    location: 'Galle',
    contactName: 'Sunil Fernando',
    contactEmail: 'sunil@example.com',
    status: 'In Progress',
    budget: 75000,
  },
  {
    title: 'Repair broken garden wall',
    description: 'Masonry work needed to repair a collapsed section of the boundary wall (approx 5ft section).',
    category: 'Masons',
    location: 'Negombo',
    contactName: 'Ruwan Kumara',
    contactEmail: 'ruwan@example.com',
    status: 'Open',
    budget: 15000,
  },
  {
    title: 'Cockroach and Termite Control',
    description: 'Urgent pest control needed for a residential apartment. Must be eco-friendly chemicals.',
    category: 'Pest Control',
    location: 'Mount Lavinia',
    contactName: 'Anura De Silva',
    contactEmail: 'anura@example.com',
    status: 'Open',
    budget: 8000,
  },
  {
    title: 'Garden clearance and landscaping',
    description: 'Overgrown garden needs full clearance — weeding, hedge trimming, and lawn mowing.',
    category: 'Gardening',
    location: 'Matara',
    contactName: 'Deepika Jayaweera',
    contactEmail: 'deepika@example.com',
    status: 'Open',
    budget: 12000,
  },
  {
    title: 'Install new kitchen cabinet doors',
    description: 'Current cabinet doors are damaged. Need a joiner to manufacture and install new MDF doors.',
    category: 'Joinery',
    location: 'Jaffna',
    contactName: 'V. Ramanathan',
    contactEmail: 'rama@example.com',
    status: 'Open',
    budget: 35000,
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await JobRequest.deleteMany();
    await User.deleteMany();
    
    await JobRequest.insertMany(sampleJobs);
    await User.create(demoUser);

    console.log('✅ Database seeded successfully with localized jobs and demo admin!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
