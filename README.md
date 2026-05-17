# 🛠️ SourceTradesman - Mini Service Request Board

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, responsive full-stack service marketplace platform built as a technical assessment project for the **Full-Stack Developer Intern** role at GlobalTNA. The platform connects homeowners with trusted professionals for local services, allowing users to browse, post, and manage service requests seamlessly.

---

# 🚀 Live Demo & Links

🌐 **Frontend (Vercel):**  
https://sourcetradesman.vercel.app

⚙️ **Backend API:**  
https://mini-service-board.onrender.com *(Note: Deployed on Glitch/Render)*

📂 **GitHub Repository:**  
https://github.com/ishani-perera/mini-service-board

---

# ✨ Core Features

## 👨‍💻 User Features
- Modern responsive UI/UX (Glassmorphism design)
- Mobile, tablet, and desktop optimized
- Browse service categories with dynamic filtering
- Search professionals and services
- Job posting functionality with form validation
- Status management system (Open, In Progress, Closed)
- Authentication system (Login & Registration)
- Interactive navigation and layouts

## 🔐 Technical & Security Features
- JWT Authentication
- RESTful API architecture
- MongoDB Atlas integration
- Secure environment variables
- Password hashing with bcrypt
- Error handling middleware
- Protected API routes
- CORS configuration

---

# 🛠️ Tech Stack

## Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** | Frontend Framework (App Router) |
| **Tailwind CSS** | Utility-first Styling & Responsiveness |
| **JavaScript** | Frontend Logic |
| **Axios / Fetch**| API Requests |

## Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime Environment |
| **Express.js** | Backend Web Framework |
| **MongoDB Atlas**| Cloud Database |
| **Mongoose** | Object Data Modeling (ODM) |
| **JWT & Bcrypt** | Authentication & Security |

---

# 📁 Project Structure

```bash
mini-service-board/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── next.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── .env
│   └── server.js
│
├── glitch.json           # Backend Deployment Configuration
└── README.md
```

---

# ⚙️ Installation & Setup Guide

## Prerequisites
Make sure you have installed:
- Node.js (v18 or higher)
- Git
- MongoDB Atlas account (or local MongoDB)

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/ishani-perera/mini-service-board.git
cd mini-service-board
```

## 2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

## 3️⃣ Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=10000
```

Create a `.env.local` file inside the `frontend` folder and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:10000
```

---

# ▶️ Running the Project Locally

**Terminal 1: Start Backend**
```bash
cd backend
npm start
# Runs on http://localhost:10000
```

**Terminal 2: Start Frontend**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication Routes
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user & get JWT |

## Job Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET`  | `/api/jobs` | Get all jobs (supports filters `?category=` & `?status=`) |
| `GET`  | `/api/jobs/:id` | Get details of a single job |
| `POST` | `/api/jobs` | Create a new job request |
| `PATCH`| `/api/jobs/:id` | Update job status |
| `DELETE`| `/api/jobs/:id`| Delete a job listing |

---

# 🔒 Security Features
- JWT-based authorization for protected routes
- Password hashing before database storage
- Environment variable protection for sensitive keys
- MongoDB secure cloud connection
- Global Error Handling for API crash prevention

---

# 🚀 Future Improvements
- Real-time chat system between homeowners and professionals
- Payment gateway integration
- Ratings & reviews system
- Admin dashboard for content moderation
- Email/SMS Notifications
- Image uploads for job descriptions


# 👩‍💻 Author

## Ishani Perera
*Computer Science Undergraduate at IIT Sri Lanka*

### Connect With Me
- **GitHub:** [https://github.com/ishani-perera](https://github.com/ishani-perera)
- **Email:** [udayanganiishaniperera@gmail.com](mailto:udayanganiishaniperera@gmail.com)

---

# 📄 License
This project was developed for educational, portfolio, and internship assessment purposes.

---

# 🙌 Acknowledgements
Special thanks to the open-source communities:
- Next.js & React
- MongoDB Atlas
- Render & Glitch
- Vercel
- Tailwind CSS
```

