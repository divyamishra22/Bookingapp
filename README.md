
# Booking App 📅

A full-stack booking application built with **Node.js**, **Express**, **MongoDB**, and **React**. It allows businesses to manage appointments, customers to book, update, or delete their bookings, and integrates with **Google My Business (GMB)** for real-time synchronization (mocked API response). Business owners can see all appointments made to them.

## 🚀 Features
- **User Authentication** (JWT-based, using bcrypt for password hashing)  
- **Business Management** (Owners can create & manage businesses)  
- **Service Listings** (Multiple businesses per service)  
- **Appointment Booking** (Customers can book, update, or cancel)  
- **Real-Time Availability** (via  database validation)  
- **Google My Business (GMB) Sync** (Mocked API response)    
  - Fetch & sync appointments  
  
- **Admin Dashboard** (For business owners)  
- **Form Validations** (Proper validation applied to all input forms)  
- **Deployed on Vercel** (Frontend - React.js, Backend - Node.js & Express)

---

## 🛠 Tech Stack
- **Frontend**: React, Context API, CSS  
- **Backend**: Node.js, Express.js, MongoDB (Atlas)  
- **Authentication**: JWT, bcrypt for secure password storage, 
- **Real-Time Updates**: with database validation for availability 
- **External APIs**: Mocked Google My Business API  
- **Deployment**: Vercel (Frontend), Backend hosted separately

---

## 🔧 Installation
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/booking-app.git
   cd booking-app
   ```

2. Install dependencies for both **backend** and **frontend**:  
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in both **backend** and **frontend** directories and add the required environment variables.

---

## 🔑 Environment Variables

### **Backend (.env)**  
```
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=divya  

```

### **Frontend (.env)**  
```
REACT_APP_API_URL=http://localhost:5000  

```

---

## 🚀 Running the App
1. Start the **backend**:  
   ```bash
   cd backend  
   nodemon index.js
   ```

2. Start the **frontend**:  
   ```bash
   cd frontend  
   npm start  
   ```

3. The app will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

| Endpoint                 | Method | Description                  |
|--------------------------|--------|------------------------------|
| `/auth/register`         | POST   | Register a new user         |
| `/auth/login`            | POST   | User login                  |
| `/businesses`            | POST   | Create a new business       |
| `/businesses`            | GET    | Get all businesses          |
| `/customer/appointments` | POST   | Create a new appointment    |
| `/customer/update`       | PUT    | Update an appointment       |
| `/api/delete`            | DELETE | Delete an appointment       |

_For a full list, see [API Documentation](./API_DOCS.md)._

---

## 🔥 Real-Time Booking with **database check**
- When a user tries to book an appointment, **database check** ensures real-time availability updates.
- If another user books the same slot, others will see it as **unavailable** instantly.
- **Real-time availability is also validated with the database** to ensure that no two users can book the same time slot. When a booking is attempted, the system checks whether the given time already has a booking. If it does, the user will be notified that the time slot is taken.

---

## 📜 License  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


