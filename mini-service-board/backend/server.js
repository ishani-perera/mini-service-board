require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/jobs', jobRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Mini Service Board API is running' });
});

// 404 handler — must be after all routes
app.use(notFound);

// Global error handler — must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
