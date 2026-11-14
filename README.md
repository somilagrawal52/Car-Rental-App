# 🚗 DriveLuxe — Premium Self-Drive Car Rental & Fleet Management Platform

[![React](https://img.shields.io/badge/Frontend-React%2019-blue?logo=react)](https://react.dev/)
[![Redux](https://img.shields.io/badge/State-Redux%20Toolkit-purple?logo=redux)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Mongoose-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-orange)](#)

> **A turnkey, production-ready, high-converting commercial web application and fleet management software for car rental businesses, self-drive startups, and mobility entrepreneurs.**

---

## 🌟 Key Selling Points & Business Value

| Commercial Selling Point | Business Impact |
| :--- | :--- |
| **High-Converting Landing Page** | Features an interactive Quick-Search booking widget, curated fleet categories, trust signals, and promo discounts. |
| **Transparent Fare Breakdown** | Dynamic multi-day pricing calculator with promo code engine (`DRIVELUXE20`), taxes, zero-deposit guarantee, and itemized billing. |
| **Comprehensive Fleet Management** | Dedicated Fleet Administrator portal to add new vehicles (URL/file upload, technical specs, pricing) and update booking statuses. |
| **Instant 1-Click Demo Switcher** | Prospective clients, buyers, or recruiters can switch between **Admin Mode** and **Customer Mode** with one click—zero registration required. |
| **Digital Reservation Vouchers** | Printable, formatted booking invoices with unique reference numbers, trip timelines, and vehicle specifications. |
| **100% Robust Offline Showroom** | Automatic graceful fallback to curated showroom fleet if MongoDB is disconnected, guaranteeing zero blank screens during demos. |
| **Modern Design System** | Engineered with Inter & Plus Jakarta Sans typography, sleek glassmorphism, responsive mobile drawer, and Lucide SVG iconography. |

---

## 📸 Core Features Overview

### 1. Customer Experience
- **Interactive Search Widget**: Filter by pickup city (Delhi, Mumbai, Bengaluru, Goa, Pune, Hyderabad), dates, and vehicle category.
- **Dynamic Fleet Filter & Sort**: Search by brand/model, filter by Fuel (Petrol, Diesel, EV), Transmission (Automatic, Manual), and sort by price or model year.
- **Vehicle Detail Showcase**: 4-point spec matrix (Seats, Transmission, Fuel, Mileage), rental guidelines, and insurance inclusions.
- **Seamless Booking Flow**: Real-time duration calculation, validation against past dates, and instant confirmation toast.
- **Customer Dashboard**: Overview of past & active trips, member status tiers, account settings, and printable reservation vouchers.
- **Corporate About & Support Hub**: 24/7 hotline numbers, WhatsApp concierge, regional hubs list, and interactive FAQ accordion.

### 2. Fleet Administration & SaaS Capabilities
- **Fleet Inventory Control**: Add new vehicles directly from the UI with real-time photo preview and specs.
- **Reservation Pipeline**: Review incoming customer bookings and update status (`Pending` ➔ `Confirmed` ➔ `Completed` ➔ `Cancelled`).
- **Secure Authentication**: JWT-based session security with bcrypt password hashing and role-based route middleware (`AdminAuth`).

---

## 🛠️ Technology Stack

- **Client**: React 19, Redux Toolkit, React Router v7, Lucide Icons, Bootstrap 5.3, Vite, Axios, React Hot Toast.
- **Server**: Node.js, Express 5, Mongoose ODM, JSON Web Tokens (JWT), BcryptJS, Multer, Morgan, Dotenv.
- **Database**: MongoDB (Local or MongoDB Atlas Cloud).

---

## 🚀 Quick Start Guide (Run in 2 Minutes)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local service or MongoDB Atlas connection string)

### 1. Database Setup & Seeding
```bash
# Navigate to the server directory
cd server

# Install dependencies (if not already installed)
npm install

# Seed the database with 10 pristine cars, admin account, and demo customer
npm run seed
```

### 2. Start Backend Server
```bash
# From within the server directory
npm start
# Server runs on http://localhost:8000
```

### 3. Start Frontend Client
```bash
# In a new terminal, navigate to the client directory
cd client

# Install dependencies
npm install

# Launch Vite development server
npm run dev
# Client runs on http://localhost:5173
```

---

## 🔑 Default Credentials for Testing & Demo

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Fleet Administrator** | `admin@cardrive.com` | `admin123` | Full access: Add cars, manage all reservations, view stats |
| **Verified Customer** | `alex@example.com` | `user123` | Book vehicles, view personal dashboard, edit profile |

*(Tip: You can also click the **"Demo Login"** pill in the top navigation bar to sign in instantly without typing!)*

---

## 📂 Project Architecture

```
Car-Rental/
├── client/                     # Frontend Single Page Application
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── api/                # Axios instance & token session storage
│   │   ├── assets/             # Branding illustrations
│   │   ├── Components/         # Reusable UI widgets (Header, Footer, CarCard, Modals)
│   │   ├── Data/               # Offline showroom dataset (10 luxury/SUV/EV models)
│   │   ├── pages/
│   │   │   ├── Auth/           # Login & Register views with 1-click demo access
│   │   │   ├── Car/            # Fleet listing (Cars.jsx) & Detail view (CarDetail.jsx)
│   │   │   ├── User/           # Customer & Admin Portal (Profile.jsx)
│   │   │   ├── About.jsx       # Corporate mission, stats & core pillars
│   │   │   ├── Contact.jsx     # Customer support hub & interactive FAQ accordion
│   │   │   └── Home.jsx        # High-converting landing page with search bar
│   │   ├── Store/              # Redux Toolkit store & Car slice
│   │   ├── utils/              # Image & URL formatting helpers
│   │   ├── App.css             # Unified modern SaaS design system
│   │   └── main.jsx            # React root mount
│   └── vite.config.js
│
└── server/                     # Backend REST API Server
    ├── Config/                 # MongoDB database connection
    ├── Controller/             # Car, Booking, and User business logic
    ├── Middleware/             # JWT authentication & Multer image handling
    ├── Model/                  # Mongoose schemas (Car, Booking, User)
    ├── Routes/                 # Express API routes (/api/car, /api/book, /api/user)
    ├── Service/                # Token generation & verification utilities
    ├── seed.js                 # Automatic fleet & user database seed script
    └── server.js               # Express application entrypoint
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
