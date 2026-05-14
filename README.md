# CommerceX – Full Stack E-Commerce Platform

## Overview

CommerceX is a modern full-featured e-commerce web application that provides a complete online shopping experience for customers along with a powerful admin dashboard for managing products, orders, and store operations.

The platform includes secure authentication, cart and order management, online payments using Stripe, email verification, password recovery, and role-based authorization for administrators.

---

# Features

## Customer Features

- User Registration & Login
- JWT Authentication
- OTP Email Verification
- Forgot Password & Reset Password
- Browse Products
- Product Categories
- Shopping Cart System
- Place Orders
- Stripe Checkout Integration
- View Order History
- User Profile Management
- Responsive UI
- Protected Routes

---

## Admin Features

- Admin Dashboard
- Add & Manage Products
- Manage Orders
- Update Order Status
- View Order Details
- Statistics
- Role-based Authorization

---

# Tech Stack

## Frontend

- Angular 21 
- TypeScript
- Bootstrap

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication & Security

- JWT Authentication
- Role-based Authorization
- Helmet Security
- Rate Limiting
- CORS Protection
- Error Handling Middleware

## Payment Integration

- Stripe Checkout
- Stripe Webhook

---

# Project Structure

```bash
CommerceX/
│
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/OsamaSobhy2006/CommerceX.git
```

---

## 2. Navigate to Project Folder

```bash
cd CommerceX
```

---

## 3. Setup Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend will run on:

```bash
http://localhost:4200
```

---

## 4. Setup Backend

Open another terminal:

```bash
cd backend
npm install
npm start
```

Backend will run on:

```bash
http://localhost:8000
```

---

# Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
PORT=8000
MONGO_URL=your_mongodb_url // if you want to work with local database with mongoDB campass
PRODUCION_URL = your_mongodbAtlas_url // if you want to work with a global database with atlas
JWT_SECRET=your_jwt_secret
STRIPE_SECRET=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

# Screenshots

## Home Page
<img width="1884" height="917" alt="Screenshot 2026-05-14 143640" src="https://github.com/user-attachments/assets/1e93943c-54bb-41ba-a435-f7532e233cf5" />


## Products Page
<img width="1891" height="915" alt="Screenshot 2026-05-14 143747" src="https://github.com/user-attachments/assets/dd8ca557-8c02-4e5d-8df2-c671dd134f85" />


## Cart Page
<img width="1888" height="910" alt="Screenshot 2026-05-14 143930" src="https://github.com/user-attachments/assets/08e0bcd7-77b0-44ed-9286-11ed49e2c959" />


## Admin Dashboard
<img width="1878" height="911" alt="Screenshot 2026-05-14 145023" src="https://github.com/user-attachments/assets/5076e0ec-1b08-4542-af90-290d1c0a69a3" />


---

# Created By

### Osama Sobhy 
