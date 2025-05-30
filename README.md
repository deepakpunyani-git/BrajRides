# 🚀 BrajRides - Vehicle Booking API

**Braj Rides** is a modern vehicle rental platform that offers RESTful APIs for users and administrators to manage and book vehicles such as bikes and scooties. It includes features like real-time availability checking, smart filtering, secure payments, Google authentication, and more.

---

## ✨ Features

- 🚗 **Vehicle Listings** – View and filter bikes/scooties by type, electric status, and location
- 📅 **Booking System** – Book vehicles with conflict detection and proper status management
- 💳 **Payment Integration** – Secure payment via Authorize.Net (sandbox environment)
- 🔐 **JWT-based Authentication** – Secure login for Users, Admins, and Staff
- 📩 **Email Notifications** – SMTP integration via Gmail for user alerts
- 🔐 **Google OAuth Login** – One-click login using Google
- 🧠 **Smart Filters** – Filter vehicles by availability date, type, and electric preference
- 🧾 **Admin/Staff Panel** – Manage vehicles, bookings, and user information from the dashboard

---

## 🌐 Live URLs

- **Client (User Access)**: [https://braj-rides.vercel.app/](https://braj-rides.vercel.app/)
- **Admin & Staff Panel**: [https://braj-rides-apis.vercel.app/](https://braj-rides-apis.vercel.app/)

---

## 📁 Project Structure

braj-rides/ 
├── client/ # React frontend (User interface) 
├── server/ # Node.js/Express backend API and Admin interface 


---

## ⚙️ Environment Variables

### 🔐 Server `.env`

```env
PORT=
MONGODB_URI=
JWT_SECRET=

# Email Configuration
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=

# Client App
CLIENT_URL=

# SMS API
FAST2SMS_API_KEY=

# Authorize.Net Payment Gateway
AUTHORIZE_NET_API_LOGIN_ID=
AUTHORIZE_NET_TRANSACTION_KEY=
AUTHORIZE_NET_ENVIRONMENT=sandbox

# Development Flag
DEV=1
