const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      enum: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Roofing', 'Gardening', 'Cleaning', 'AC Technicians', 'Masons', 'Pest Control', 'Interior', 'Other'],
      default: 'Other',
    },
    location: {
      type: String,
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
    budget: {
      type: Number,
      min: 0,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('JobRequest', jobRequestSchema, 'jobRequests');
