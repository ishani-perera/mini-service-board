# Mini Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse, manage, and update them. This project was built as a technical assessment for the Full-Stack Developer Intern role at GlobalTNA.

## 🚀 Features

- **Frontend**: Next.js 14 (App Router) with Tailwind CSS for a modern, responsive UI.
- **Backend**: Node.js & Express REST API with clear routing and error handling.
- **Database**: MongoDB with Mongoose ODM for structured data modeling.
- **Filtering & Search**: Support for category filters, status filters, and keyword search across titles and descriptions.
- **Job Management**: Complete CRUD operations (Create, Read, Update Status, Delete).
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **User Feedback**: Real-time toast notifications for all major actions.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Axios](https://axios-http.com/), [React Hot Toast](https://react-hot-toast.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **ODM**: [Mongoose](https://mongoosejs.com/)

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local or Atlas connection string)

### 2. Environment Variables

#### Backend (`/mini-service-board/backend/.env`)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

#### Frontend (`/mini-service-board/frontend/.env.local`)
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Installation

Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd mini-service-board/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 🏃‍♂️ Running the Application

### Seed the Database (Optional)
To populate the database with sample jobs:
```bash
cd mini-service-board/backend
npm run seed
```

### Start Backend
```bash
cd mini-service-board/backend
npm run dev
```
The API will be running at `http://localhost:5000`.

### Start Frontend
```bash
cd mini-service-board/frontend
npm run dev
```
The application will be accessible at `http://localhost:3000`.

---

## 📡 API Endpoints

- `GET /api/jobs` - List all jobs (Supports `?category=...`, `?status=...`, and `?search=...`)
- `GET /api/jobs/:id` - Get details for a single job
- `POST /api/jobs` - Create a new job request
- `PATCH /api/jobs/:id` - Update job status only (`Open`, `In Progress`, `Closed`)
- `DELETE /api/jobs/:id` - Delete a job request

---

## 📝 Submission Details
- **Candidate**: [Your Name]
- **Role**: Full-Stack Developer Intern Assessment
- **Company**: GlobalTNA
