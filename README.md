# 🚀  ROLE BASED ACCESS CONTROL PLATFORM (RBAC)
# Full Stack Configurable Operations Platform

Live Frontend:
https://rolebasedcontrol.netlify.app/

Live Backend:
https://role-base-access-controller.onrender.com/

------------------------------------------------------------
ABOUT THE PROJECT
------------------------------------------------------------

Role Based Access Control Platform is a full-stack MERN application
designed to demonstrate production-level authentication, authorization,
and dynamic role-permission management.

This system allows organizations to:

- Register and manage users
- Assign roles to users
- Attach permissions to roles
- Dynamically control feature visibility
- Secure backend APIs with middleware
- Render frontend UI based on permission keys

The architecture follows real-world enterprise RBAC design principles.

------------------------------------------------------------
TECH STACK
------------------------------------------------------------

Frontend:
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS
- Styled Components
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

Deployment:
- Backend → Render
- Frontend → Netlify
- Database → MongoDB Atlas

------------------------------------------------------------
SYSTEM ARCHITECTURE
------------------------------------------------------------

User → Role → Permissions

- Each User has one Role
- Each Role contains multiple Permissions
- Backend validates permission for every protected API
- Frontend dynamically renders UI using permission keys

Authorization is enforced server-side.
Frontend visibility is controlled using Permission Guards.

------------------------------------------------------------
FEATURES
------------------------------------------------------------

Authentication:
- User Registration
- Login with JWT
- Token-based authentication
- Protected Routes
- Logout

Admin Features:
- View Users
- Activate / Deactivate Users
- Assign Roles
- Create Roles
- Update Role Permissions
- Create Permissions
- View Permission Usage

Frontend Controls:
- Permission-based UI rendering
- Role-based navigation
- Protected routing
- Clean SaaS-style dashboard layout

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

backend/
  controllers/
  models/
  routes/
  middlewares/
  config/
  server.js
  .env

frontend/
  src/
    components/
    pages/
    services/
    features/
    app/
    styles/
  vite.config.js

------------------------------------------------------------
LOCAL DEVELOPMENT SETUP
------------------------------------------------------------

1) Clone repository

- git clone https://github.com:Manohar7730/Role-Base-Access-Controller.git

- cd Role-Base-Access-Controller

------------------------------------------------------------
BACKEND SETUP
------------------------------------------------------------

cd backend
npm install

Create .env file inside backend:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/RBAC
JWT_SECRET=your_secret_key

Run backend:

npm run dev

Backend runs at:
http://localhost:5000

------------------------------------------------------------
FRONTEND SETUP
------------------------------------------------------------

- cd frontend
- npm install
- npm run dev

- Frontend runs at:
http://localhost:5173

------------------------------------------------------------
API SECURITY
------------------------------------------------------------

All protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

- Example Endpoints:

- GET    /api/users
- PATCH  /api/users/:id/status
- PATCH  /api/users/:id/role
- GET    /api/roles
- POST   /api/roles
- PATCH  /api/roles/:id
- GET    /api/permissions
- POST   /api/permissions

------------------------------------------------------------
DEPLOYMENT GUIDE
------------------------------------------------------------

1) MongoDB Atlas

- Create cluster
- Create DB user
- Allow IP access: 0.0.0.0/0
- Copy connection string

Example:

mongodb+srv://username:password@cluster.mongodb.net/RBAC

------------------------------------------------------------

2) Deploy Backend (Render)

- Create Web Service
- Connect GitHub repository
- Root directory: backend
- Build Command: npm install
- Start Command: npm start

Add Environment Variables:
MONGO_URI
JWT_SECRET
PORT=5000

------------------------------------------------------------

3) Configure Frontend API

In frontend/src/services/api.js:

baseURL: "https://role-base-access-controller.onrender.com"

------------------------------------------------------------

4) Build Frontend

cd frontend
npm run build

------------------------------------------------------------

5) Deploy Frontend (Netlify)

Option 1:
Drag & drop dist folder into Netlify

Option 2 CLI:
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist

------------------------------------------------------------
SECURITY DESIGN PRINCIPLES
------------------------------------------------------------

- Backend enforces authorization using middleware
- Permission keys are validated server-side
- Frontend visibility does not replace backend security
- Role-based control prevents direct permission assignment to users
- Clean separation of concerns between UI and API

------------------------------------------------------------
WHY THIS PROJECT MATTERS
------------------------------------------------------------

This project demonstrates:

- Real-world RBAC implementation
- Secure API architecture
- Authentication & Authorization flows
- Redux state management
- Middleware design
- Production deployment
- SaaS dashboard design principles

------------------------------------------------------------
RESUME ENTRY
------------------------------------------------------------

Built a full-stack RBAC admin platform using MERN stack with JWT authentication,
permission-based authorization middleware, dynamic role-permission management,
and deployed the system to cloud infrastructure (Render & Netlify).

------------------------------------------------------------
FUTURE ENHANCEMENTS
------------------------------------------------------------

- Password policy enforcement
- Global error handling middleware
- Toast notification system
- Token versioning for forced logout
- Audit logs
- Multi-tenant support
- CI/CD pipeline
- Docker containerization

------------------------------------------------------------
LICENSE
------------------------------------------------------------

@Manohar7730

------------------------------------------------------------
AUTHOR
------------------------------------------------------------

Manohar Pediredla
