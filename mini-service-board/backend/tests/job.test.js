const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const JobRequest = require('../models/JobRequest');

describe('Job API Endpoints', () => {
  beforeAll(async () => {
    // We assume the DB is already connected in server.js
    // For real tests, we would use a separate test DB
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/jobs', () => {
    it('should fetch all jobs', async () => {
      const res = await request(app).get('/api/jobs');
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/jobs', () => {
    it('should fail if title is missing', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .send({
          description: 'Missing title',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });
});
