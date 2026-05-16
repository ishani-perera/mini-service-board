const JobRequest = require('../models/JobRequest');

// Simple in-memory mock data used when DB is unavailable
const generateMockJobs = () => {
  const categories = [
    'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Roofing', 'Gardening', 
    'Cleaning', 'AC Technicians', 'Masons', 'Pest Control', 'Interior', 'Other'
  ];
  const statuses = ['Open', 'In Progress', 'Closed'];
  const locations = ['Colombo', 'Kandy', 'Galle', 'Gampaha', 'Negombo', 'Matara'];
  
  const jobs = [];
  let idCounter = 1;

  categories.forEach(cat => {
    for (let i = 1; i <= 4; i++) {
      jobs.push({
        _id: 'mock_' + idCounter,
        title: `${cat} Project - Job #${i}`,
        description: `This is a sample mock request for ${cat} services. Looking for an experienced professional to handle this job promptly. Please provide a quote.`,
        category: cat,
        location: locations[idCounter % locations.length],
        contactName: `User ${idCounter}`,
        contactEmail: `user${idCounter}@example.com`,
        budget: 1500 + (1000 * i * (idCounter % 3 + 1)),
        status: statuses[i % 3],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toISOString(),
      });
      idCounter++;
    }
  });

  return jobs;
};

const MOCK_JOBS = generateMockJobs();

// GET /api/jobs — get all jobs with optional filters
const getAllJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;

    // If DB is not connected, return mock jobs for development
    if (global.__DB_CONNECTED === false) {
      let results = MOCK_JOBS.slice();
      if (category && category !== 'All') results = results.filter(j => j.category === category);
      if (status && status !== 'All') results = results.filter(j => j.status === status);
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(j => j.title.toLowerCase().includes(s) || j.description.toLowerCase().includes(s));
      }
      return res.status(200).json({ success: true, count: results.length, data: results });
    }

    const filter = {};

    if (category && category !== 'All') filter.category = category;
    if (status && status !== 'All') filter.status = status;

    // Bonus: keyword search across title and description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs/:id — get single job
const getJobById = async (req, res, next) => {
  try {
    if (global.__DB_CONNECTED === false) {
      const job = MOCK_JOBS.find(j => j._id === req.params.id);
      if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
      return res.status(200).json({ success: true, data: job });
    }

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// POST /api/jobs — create new job
const createJob = async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail, budget } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    if (global.__DB_CONNECTED === false) {
      const newJob = {
        _id: 'mock_' + Date.now(),
        title,
        description,
        category: category || 'Other',
        location,
        contactName,
        contactEmail,
        budget: budget || null,
        status: 'Open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_JOBS.unshift(newJob);
      return res.status(201).json({ success: true, data: newJob });
    }

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      budget,
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/jobs/:id — update status only
const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Open', 'In Progress', 'Closed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    // If DB is not connected, update the in-memory mock jobs
    if (global.__DB_CONNECTED === false) {
      const idx = MOCK_JOBS.findIndex(j => j._id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
      MOCK_JOBS[idx].status = status;
      MOCK_JOBS[idx].updatedAt = new Date().toISOString();
      return res.status(200).json({ success: true, data: MOCK_JOBS[idx] });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/jobs/:id — delete a job
const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllJobs, getJobById, createJob, updateJobStatus, deleteJob };
