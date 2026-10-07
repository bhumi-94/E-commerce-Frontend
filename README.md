# 🛍️ Nexora — E-Commerce Frontend

Nexora is a modern, responsive e-commerce frontend built with **React.js and Vite**. It provides a complete shopping experience with authentication, product browsing, cart, wishlist, orders, profile management, and admin functionality.

## 🚀 Live Application

**Frontend:** https://e-commerce-frontend-six-neon.vercel.app/

**Backend API:** https://e-commerce-backend-71hj.onrender.com/

## ✨ Features

- 🔐 User registration and login
- 🔵 Google authentication
- 👤 Profile management
- 🛍️ Product browsing and search
- 🛒 Shopping cart
- ❤️ Wishlist
- 📦 Order management
- 💳 Payment method management
- 📍 Address management
- 🔔 Notifications
- ⚙️ User settings
- 👨‍💼 Admin product and user management
- 📱 Responsive design
- 🔗 REST API integration

## 🛠️ Tech Stack

- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Redux / state management
- Google Authentication
- Git & GitHub
- Vercel

## 📁 Project Structure

```text
src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── store/
├── utils/
├── assets/
├── App.jsx
└── main.jsx
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd nexora-ecommerce-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## 🔐 Environment Variables

Never commit `.env` files or secrets to GitHub.

Recommended `.gitignore` entries:

```gitignore
.env
.env.local
.env.*.local
node_modules/
dist/
```

## 🌐 Deployment

The frontend is deployed on **Vercel**.

Production environment variables should be configured in:

```text
Vercel → Project → Settings → Environment Variables
```

After changing `VITE_*` variables, redeploy the application.

## 🔗 Backend

The frontend consumes the Nexora REST API:

```text
https://e-commerce-backend-71hj.onrender.com/api
```

The API handles authentication, users, products, cart, wishlist, orders, addresses, payments, notifications, and admin operations.

## 🎯 Project Goal

Nexora was built to practice and demonstrate real-world frontend development, responsive UI design, authentication, state management, API integration, and production deployment.

## 👩‍💻 Author

**Bhoomi Kaushik**

B.Tech Computer Science & Engineering

GitHub: https://github.com/bhumi-94

---

⭐ If you like the project, consider giving the repository a star.
