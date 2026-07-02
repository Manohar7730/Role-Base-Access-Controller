# 🔐 Role-Based Access Control Platform (RBAC)
### Full-Stack Enterprise Access Management System | MERN Stack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify)]([https://rolebasedcontrol.netlify.app](https://rolebasedcontrol.netlify.app/))
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)]([https://role-base-access-controller.onrender.com](https://role-base-access-controller.onrender.com))
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)]([https://github.com/Manohar7730/Role-Base-Access-Controller](https://github.com/Manohar7730/Role-Base-Access-Controller))

---

## 🌐 Live Links

| Resource | URL |
|---|---|
| 🖥️ Frontend (Netlify) |[ https://rolebasedcontrol.netlify.app](https://rolebasedcontrol.netlify.app/) |
| ⚙️ Backend API (Render) | [https://role-base-access-controller.onrender.com](https://role-base-access-controller.onrender.com) |
| 📂 GitHub Repository | [https://github.com/Manohar7730/Role-Base-Access-Controller](https://github.com/Manohar7730/Role-Base-Access-Controller) |

> ⚠️ **Note:** Backend is hosted on Render free tier. First request may take 30–50 seconds to wake up the server.

---

# 📌 About The Project

RBAC Platform is a full-stack MERN application implementing real-world enterprise Role-Based Access Control.

The system allows organizations to:

- Register and manage users
- Create roles and permissions
- Assign roles dynamically
- Enforce permission-based API security
- Render UI conditionally based on permissions

Built following real-world enterprise RBAC design principles.

---

# 🏗️ System Architecture

```text
┌─────────────┐     JWT Token      ┌─────────────────┐
│    User     │ ─────────────────► │   Express API   │
│  (Browser)  │                    │   (Node.js)     │
└─────────────┘                    └────────┬────────┘
                                            │
                                   Auth Middleware
                                   Permission Check
                                            │
                              ┌─────────────▼────────────┐
                              │        MongoDB            │
                              │ Users / Roles / Permissions
                              └──────────────────────────┘

Permission Model:

User ──► Role ──► Permissions[]
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React (Vite) | UI framework |
| Redux Toolkit | State management |
| React Router | Routing |
| Tailwind CSS | Styling |
| Styled Components | Component styling |
| Axios | API calls |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | API framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password hashing |

## Deployment

| Service | Purpose |
|---|---|
| Netlify | Frontend |
| Render | Backend |
| MongoDB Atlas | Database |

---

# ✨ Features

## Authentication

- User registration
- Login with JWT
- Session management
- Protected routes
- Logout
- Change password

## Admin Features

- View users
- Activate/deactivate users
- Assign roles
- Create roles
- Update permissions
- Create permissions

## Security

- JWT middleware
- Permission authorization
- bcrypt hashing
- Environment variables
- CORS

## Frontend Controls

- PermissionGuard
- ProtectedRoute
- PublicRoute
- Dynamic sidebar

---

# 📁 Project Structure

```text
Role-Base-Access-Controller/

backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── seed/
├── utils/
└── server.js

frontend/
└── src/
    ├── app/
    ├── components/
    ├── features/
    ├── pages/
    ├── routes/
    └── services/

README.md
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint |
|---|---|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/change-password |

## Users

| Method | Endpoint |
|---|---|
| GET | /api/users |
| PATCH | /api/users/:id/status |
| PATCH | /api/users/:id/role |

## Roles

| Method | Endpoint |
|---|---|
| GET | /api/roles |
| POST | /api/roles |
| PATCH | /api/roles/:id |

## Permissions

| Method | Endpoint |
|---|---|
| GET | /api/permissions |
| POST | /api/permissions |

## Dashboard

| Method | Endpoint |
|---|---|
| GET | /api/dashboard |

---

# ⚙️ Local Development Setup

## Prerequisites

- Node.js v18+
- MongoDB
- Git

## Clone Repository

```bash
git clone https://github.com/Manohar7730/Role-Base-Access-Controller.git
cd Role-Base-Access-Controller
```

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/RBAC
JWT_SECRET=your_secret_key_here
```

Run backend

```bash
npm run dev
```

Seed database

```bash
node seed/seedDatabase.js
```

## Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

# 🚀 Deployment Guide

## MongoDB Atlas

```text
1. Create cluster
2. Create DB user
3. Allow network access
4. Copy connection string
```

## Render Backend

```text
1. Create Web Service
2. Connect GitHub
3. Root: backend
4. Build: npm install
5. Start: npm start
6. Add environment variables
```

## Configure Frontend

```javascript
baseURL: "https://your-render-url.onrender.com"
```

## Netlify Frontend

```bash
npm run build
```

or

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

# 🔒 Security Principles

- Backend authorization enforcement
- Permission-level access control
- JWT secrets in environment variables
- bcrypt password hashing
- Token validation on every request
- CORS restrictions

---

# 🧪 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | superadmin@gmail.com | Admin@123 |

---

# 🔮 Future Enhancements

- [ ] Audit logs
- [ ] Multi-tenant support
- [ ] Token versioning
- [ ] GitHub Actions
- [ ] Docker support
- [ ] Jest tests

---

# 👨‍💻 Author

**Manohar Pediredla**

- LinkedIn: https://linkedin.com/in/manoharpediredla
- GitHub: https://github.com/Manohar7730
- Portfolio: https://manoharp.netlify.app

---

Built as a learning project demonstrating enterprise RBAC concepts using the MERN stack.
