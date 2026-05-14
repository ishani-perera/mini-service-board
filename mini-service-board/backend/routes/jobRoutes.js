const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require('../controllers/jobController');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobById).patch(updateJobStatus).delete(deleteJob);

module.exports = router;
