require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const JobRequest = require('./models/JobRequest');

const sampleJobs = [
  {
    title: 'Fix leaking kitchen tap',
    description: 'Kitchen tap has been dripping for a week. Need a plumber to fix or replace the washer.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'Sarah Connor',
    contactEmail: 'sarah@example.com',
    status: 'Open',
  },
  {
    title: 'Replace faulty light switches',
    description: 'Three light switches in the living room are flickering. Needs an electrician to inspect and replace.',
    category: 'Electrical',
    location: 'Edinburgh',
    contactName: 'James McLaren',
    contactEmail: 'james@example.com',
    status: 'Open',
  },
  {
    title: 'Paint entire living room',
    description: 'Looking for a painter to repaint the living room walls and ceiling. Approx 4m x 5m room.',
    category: 'Painting',
    location: 'Manchester',
    contactName: 'Emma Wilson',
    contactEmail: 'emma@example.com',
    status: 'In Progress',
  },
  {
    title: 'Fix broken fence panels',
    description: 'Storm damaged three fence panels in the back garden. Need replacement and refit.',
    category: 'Joinery',
    location: 'Leeds',
    contactName: 'Tom Hardy',
    contactEmail: 'tom@example.com',
    status: 'Open',
  },
  {
    title: 'Roof tile repair',
    description: 'Several roof tiles displaced after recent storm. Need inspection and repair before winter.',
    category: 'Roofing',
    location: 'Birmingham',
    contactName: 'Lisa Chen',
    contactEmail: 'lisa@example.com',
    status: 'Closed',
  },
  {
    title: 'Garden clearance and tidy',
    description: 'Overgrown garden needs full clearance — weeding, hedge trimming, and lawn mowing.',
    category: 'Gardening',
    location: 'Bristol',
    contactName: 'Mark Spencer',
    contactEmail: 'mark@example.com',
    status: 'Open',
  },
  {
    title: 'Install new bathroom extractor fan',
    description: 'Current bathroom fan is broken and causing damp. Needs a qualified electrician to install a replacement.',
    category: 'Electrical',
    location: 'Glasgow',
    contactName: 'Diane Ross',
    contactEmail: 'diane@example.com',
    status: 'Open',
  },
];

const seedDB = async () => {
  await connectDB();
  await JobRequest.deleteMany();
  await JobRequest.insertMany(sampleJobs);
  console.log('Database seeded with sample jobs!');
  process.exit();
};

seedDB();
