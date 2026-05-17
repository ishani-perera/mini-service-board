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
