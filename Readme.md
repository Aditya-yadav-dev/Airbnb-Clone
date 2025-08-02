# 🏡 Airbnb Clone – MERN Stack Project

A full-stack Airbnb clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to sign up, log in, list properties for rent, and book homes with real-time image uploads using Cloudinary and secure authentication using JWT.

---

## ✨ Features

- 🔐 User Authentication (Sign up & Sign in using JWT)
- 🏘️ List Your Home with description, location, photos and can be Rated 
- 📤 Upload Images using Multer & Cloudinary
- 📅 Book Homes with check-in & check-out dates
- ✏️ Update or Delete listed homes
- 🔍 View listings by other users
- 📦 RESTful API architecture
- 📄 Clean UI (React-based frontend)

---

## 🛠️ Technologies Used

### 🚀 Frontend
- React.js
- Axios
- React Router

### 🌐 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for handling image uploads)
- Cloudinary (cloud image storage)
- JSON Web Tokens (JWT) for authentication
- bcrypt.js (password hashing)

---

## 🔐 Authentication

- JWT-based token authentication
- Secure routes for booking and listing
- Passwords hashed using bcrypt

---

## 📁 Project Structure

/client # React Frontend
├── /src/pages/ #pages
├── /src/context/ #contexts
├── /src/components # components
├── /src/App.jsx

/server # Express Backend
├── /routes # API Routes
├── /models # Mongoose Schemas
├── /controllers
├── /middlewares
├── /config # Cloudinary, multer 
|__ /index.js