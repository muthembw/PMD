
# 🛍️ Product Management Dashboard

A full-stack Product Management Dashboard for managing products, orders, and reports efficiently. Built using the MERN stack (MongoDB, Express, React, Node.js), this dashboard allows authenticated users to perform CRUD operations, view order summaries, and download reports — all with a clean UI and intuitive flow.

## ✨ Features

- ✅ User Authentication (Register / Login)
- 📦 Product Listing from public API
- 🧾 Order Management & Tracking
- 📊 Sales Report with download option
- 🔍 Product Filtering and Sorting
- 📁 Protected Routes and Role-based Views
- 🧠 Context API for Global State Management

---

## ⚙️ Tech Stack

| Frontend         | Backend         | Database        |
|------------------|------------------|------------------|
| React + Tailwind CSS | Node.js + Express.js | MongoDB (Compass) |

Other tools:
- Axios for API calls
- JWT for Authentication
- React Router DOM for navigation
- Vercel & Render for deployment

---

## 🚀 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/product-management-dashboard.git
cd product-management-dashboard
2. Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev
3. Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
Make sure to create a .env file inside the server folder with:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/PMD
JWT_SECRET=your_jwt_secret
🌐 Deployment Links
🔗 Frontend: Vercel Deployment: https://pmd-frontend.onrender.com/

🔗 Backend: Render Deployment:  https://pmd-backend.onrender.com/

📁 Folder Structure
/backend
│── /config           # Database & environment config
│── /controllers      # Business logic (handling API requests)
│── /models           # Mongoose models (Product, Order, User)
│── /routes           # API routes (products, orders, auth)
│── /middleware       # Authentication & error handling middleware
│── server.js
│── env

/frontend
product-dashboard/
├── public/
├── src/
│   ├── assets/                # Images, logos, icons, etc.
│   ├── components/            # Reusable UI components (Navbar, Sidebar, Cards, Table)
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── ProductTable.jsx
│   │   └── OrderList.jsx
│   ├── pages/                 # Pages/views for different routes
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   ├── Reports.jsx
│   │   └── Login.jsx
│   ├── context/               # Global state management (e.g., Auth, Products, Orders)
│   │   └── AuthContext.jsx
│   ├── routes/                # All app routes and route protection
│   │   └── AppRoutes.jsx
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind base styles
├── tailwind.config.js
├── postcss.config.js
├── .env
├── package.json
└── vite.config.js

🙌 Author
Bridget Masila
Full-Stack Developer | Coffee-Loving Coder
📧 masilabridget6@gmail.com


