# ⭐ Store Rating App

## 🔐 Demo Credentials

### 👨‍💼 Admin

* **Email:admin@gmail.com
* **Password:** Admin@123

### 👤 User

* **Email:user@gmail.com
* **Password:** Admin@123

* 
### 🏪 Owner

* **Email:** owner@gmail.com
* **Password:** Admin@123



---

## 🌐 Live Demo

* 🔗 **Frontend:** https://store-rating-app-1-t7r5.onrender.com
* 🔗 **Backend API:** https://store-rating-app-u442.onrender.com

---

## 📌 Project Overview

Store Rating App is a full-stack web application where users can explore stores, rate them, and view ratings. It supports **role-based access control** for Admin, Owner, and User.

---

## 🚀 Features

### 👤 User

* Signup & Login (JWT Authentication)
* View all stores
* Submit & update ratings (1–5 ⭐)
* View average ratings

### 🏪 Store Owner

* View own store dashboard
* See ratings given by users
* Check average rating of store

### 👨‍💼 Admin

* Dashboard (total users, stores, ratings)
* View all users
* View all stores with ratings
* Add new stores
* Create store owners

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Axios
* React Router

### Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT Authentication
* Bcrypt (Password hashing)

### Database

* MySQL (Cloud via Railway)

### Deployment

* Frontend: Render
* Backend: Render
* Database: Railway

---

## 📁 Project Structure

```
store-rating-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api/
│
└── README.md
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/store-rating-app.git
cd store-rating-app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
DB_NAME=your_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=your_port
```

Run backend:

```
nodemon server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🌱 Seed Data

To populate database with demo data:

```
cd backend
node seed.js
```

⚠️ Note: This will reset database (only use in development)

---

## 🔐 Authentication Flow

* User logs in → JWT token generated
* Token stored in localStorage
* Protected routes verified using middleware
* Role-based access enforced (admin / owner / user)

---

## 📊 Architecture

```
Frontend (React)
        ↓
Backend (Node + Express)
        ↓
Database (MySQL - Railway)
```

---

## 💡 Future Improvements

* ⭐ UI enhancements (animations, better design)
* 🔍 Store search & filters
* 📱 Mobile responsiveness
* 📊 Charts for admin dashboard
* 🔔 Notifications system

---

## 👨‍💻 Author

**Raviranjan Pathak**

* GitHub: https://github.com/Raviranjanpathak
* LinkedIn: https://linkedin.com

---

## 📄 License

This project is for educational and portfolio purposes.
 #screenshots
 <img width="1908" height="897" alt="Screenshot 2026-04-16 184628" src="https://github.com/user-attachments/assets/9fe2252d-8f1c-4eee-951f-ceace2cd2a23" />
<img width="1919" height="902" alt="Screenshot 2026-04-16 184718" src="https://github.com/user-attachments/assets/92a49c4b-4cfb-4f16-a400-99fa5287ac98" />
<img width="1919" height="907" alt="Screenshot 2026-04-16 184809" src="https://github.com/user-attachments/assets/f2d5e8d9-a607-40a6-9e69-d21e59ce9353" />
<img width="1915" height="897" alt="Screenshot 2026-04-16 185122" src="https://github.com/user-attachments/assets/a0709c36-2da4-40d8-8f82-0a0bf4d59b55" />
<img width="1910" height="890" alt="Screenshot 2026-04-30 213738" src="https://github.com/user-attachments/assets/fd12057f-9172-4eef-915e-8f041dbc16d9" />
<img width="1903" height="893" alt="Screenshot 2026-04-30 213723" src="https://github.com/user-attachments/assets/a9928bee-a9a5-4edc-925b-134db72e9547" />

 
