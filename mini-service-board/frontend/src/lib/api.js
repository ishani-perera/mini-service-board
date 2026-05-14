import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem('app-user');
  if (savedUser) {
    const { token } = JSON.parse(savedUser);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getJobs = (params) => api.get('/jobs', { params });
export const getJob = (id) => api.get(`/jobs/${id}`);
export const createJob = (data) => api.post('/jobs', data);
export const updateJobStatus = (id, status) => api.patch(`/jobs/${id}`, { status });
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
