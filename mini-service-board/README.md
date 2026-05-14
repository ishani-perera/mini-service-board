# 🔧 Mini Service Request Board

A full-stack web application where homeowners can post service requests (plumbing, electrical, painting, etc.) and tradespeople can browse, update status, and delete job listings.

Built as part of the GlobalTNA Full-Stack Developer Intern technical assessment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
mini-service-board/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # Error handler
│   ├── models/         # Mongoose schema
│   ├── routes/         # Express routes
│   ├── seed.js         # Sample data seeder
│   ├── server.js       # Entry point
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/        # Next.js pages (App Router)
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # Axios API helper
│   └── .env.example
└── README.md
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mini-service-board?retryWrites=true&w=majority
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Installation & Running Locally

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-service-board.git
cd mini-service-board
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Set up the Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if your backend runs on a different port
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Seed sample data (optional)

```bash
cd backend
npm run seed
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs (supports `?category=`, `?status=`, `?search=`) |
| GET | `/api/jobs/:id` | Get single job by ID |
| POST | `/api/jobs` | Create a new job |
| PATCH | `/api/jobs/:id` | Update job status only |
| DELETE | `/api/jobs/:id` | Delete a job |

### Example Request — Create Job

```json
POST /api/jobs
{
  "title": "Fix leaking tap",
  "description": "Kitchen tap dripping constantly",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "John Doe",
  "contactEmail": "john@example.com"
}
```

---

## Deployment

### Frontend → Vercel

1. Push the whole project repository to GitHub
2. Import into [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

### Backend → Render

1. Push the whole project repository to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set environment variables: `MONGODB_URI`, `PORT`, `NODE_ENV=production`
4. Build command: `npm install`
5. Start command: `node server.js`

### Database → MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist all IPs (`0.0.0.0/0`) for Render compatibility
3. Copy the connection string into your backend `.env`

---

## Features

- Post service requests with category, location, and contact details
- Browse and filter jobs by category and status
- Keyword search across job titles and descriptions
- Update job status (Open → In Progress → Closed)
- Delete jobs with confirmation dialog
- Skeleton loaders during data fetching
- Empty state UI when no jobs match filters
- Toast notifications for user feedback
- Fully responsive — mobile and desktop
- Global error handling on backend
- Seed script for sample data
