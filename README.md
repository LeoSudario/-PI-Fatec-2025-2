# Gym & Client Management App

This project is a **full-stack application** for managing gyms and clients, built with **React (frontend)** and **Node.js/Express with MongoDB (backend)**. It features user authentication (sign up & login), gym registration, client check-in/check-out, and secure API endpoints.

---

## Features

- **User Authentication:**  
  Secure sign up and login with JWT and password hashing.

- **Gym Management:**

  - Register new gyms.
  - Delete gyms.
  - View all registered gyms.
  - Track gym occupancy.

- **Client Management:**

  - Register new clients (check-in).
  - Check-out clients.
  - View all clients.

- **Protected Routes:**  
  All sensitive API endpoints are protected with JWT authentication.

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT, bcryptjs

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (running locally or via Atlas)

---

### Backend Setup

1. **Install dependencies:**

   ```bash
   npm install express cors mongoose jsonwebtoken bcryptjs
   ```

2. **Start MongoDB** (locally):

   ```bash
   mongod
   ```

3. **Run the server:**
   ```bash
   node server.js
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000).

---

### Frontend Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the React app:**
   ```bash
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000) by default.

---

## API Endpoints

### Authentication

- `POST /signup`  
  Register a new user.  
  **Body:** `{ "username": "user", "password": "pass" }`

- `POST /login`  
  Login existing user.  
  **Body:** `{ "username": "user", "password": "pass" }`  
  **Returns:** `{ "token": "JWT_TOKEN" }`

### Gyms

- `GET /gyms`  
  Get all gyms (protected).

- `POST /gyms`  
  Create a new gym (protected).  
  **Body:** `{ "name": "...", "address": "...", "phone": "...", "capacity": 20 }`

- `DELETE /gyms/:id`  
  Delete a gym by ID (protected).

### Clients

- `GET /clients`  
  Get all clients (protected).

- `POST /clients`  
  Register a new client (check-in) (protected).  
  **Body:** `{ "name": "...", "email": "...", "phone": "...", "gymName": "..." }`

- `POST /clients/checkout`  
  Check out a client (protected).  
  **Body:** `{ "name": "...", "gymName": "..." }`

---

## File Structure

```
backend/
  server.js
  models/
    User.js
    Gym.js
    Client.js

frontend/
  src/
    components/
      Login.js
      InputGym.js
      Inputs.js
      Dashboard.js
      NavBar.js
      ...
    App.js
    ...
```

---

## Security Notes

- Passwords are **hashed** before saving to the database.
- JWT is used for session management; tokens are stored in `localStorage` on the frontend.
- All gym and client endpoints require a valid JWT.

---

## License

MIT

---

## Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
