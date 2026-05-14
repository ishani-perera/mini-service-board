const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobById).patch(protect, updateJobStatus).delete(protect, deleteJob);

module.exports = router;
