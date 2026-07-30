# Travely - Travel Booking Website

## Project Overview

Travely is a full-stack travel booking web application designed to simplify travel planning by bringing hotels, flights, taxis, attractions, and rental cars together on a single platform. The system allows users to search, compare, and book travel services in real time, while also managing their reservations through a personal dashboard.

This project demonstrates the integration of modern web development practices, secure authentication, RESTful API design, and database management to create a complete travel booking ecosystem. By consolidating multiple travel services into one platform, the system reduces the time and effort users spend planning a trip.

---

## Objectives

* Provide a single platform for booking hotels, flights, taxis, attractions, and rental cars.
* Implement secure user authentication and token-based booking.
* Enable real-time availability checking for all travel services.
* Offer a centralized dashboard for managing and tracking bookings.
* Demonstrate full-stack development using the MERN-style stack (React, Node.js, Express, MongoDB).

---

## Features

* User registration and login with input validation and error handling.
* Search and book hotels by name or city with check-in/check-out and guest selection.
* Search and book flights by source and destination with real-time listings.
* Search and book rental cars by name, passenger capacity, or luggage capacity.
* Search and book tourist attractions by name and description.
* Search and book airport taxis based on passengers, pickup location, and destination.
* Token-based, authenticated booking flow across all services.
* Centralized dashboard showing booking statistics, total amount spent, and quick actions.
* Ability to cancel existing hotel, flight, car, attraction, or taxi bookings directly from the dashboard.
* Loading states, no-results handling, and form validation across all booking pages.

---

## Technologies Used

| Technology  | Purpose                                     |
| ----------- | -------------------------------------------- |
| React       | Frontend UI and client-side logic            |
| Node.js     | Backend runtime environment                  |
| Express     | REST API and server-side routing             |
| MongoDB     | Database for users, services, and bookings   |
| Mongoose    | Object Data Modeling (ODM) for MongoDB       |
| JWT (Token) | Secure, token-based authentication           |

---

## System Architecture

The system consists of:

* React frontend for user interaction and booking flows
* Express REST API for handling requests and business logic
* MongoDB database (via Mongoose) for storing users, listings, and bookings
* Token-based authentication layer for secure access
* Admin-facing functionality for managing listed services and viewing booking data

### Workflow

1. A user registers or logs in to the platform.
2. The user searches for a service (hotel, flight, car, attraction, or taxi).
3. The frontend fetches real-time availability data from the backend.
4. The user selects a service and submits a booking request with an authentication token.
5. The backend validates the request and stores the booking in the database.
6. The user views, tracks, and manages all bookings from the dashboard, including cancellations.

---

## Screenshots

> Screenshots have not been added to this repository yet. Once available, add them to a `screenshots/` folder at the project root and reference them below, for example:
>
> ```markdown
> ### Home Page
> ![Home Page](screenshots/home-page.png)
> ```
>
> Planned pages to capture: Sign Up, Sign In, Home, Hotel Booking, Flight Booking, Car Rental, Attractions, Airport Taxi, Dashboard.

---

## Repository Structure

```text
Travel_Website/
│
├── README.md
├── backend/                # Node.js + Express API
│   ├── config/             # Database connection setup
│   ├── controllers/        # Route logic for each service
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── server.js           # App entry point
│   └── .gitignore          # Excludes node_modules and .env
│
├── frontend/                # React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Header, Footer, TaxiBooking, etc.
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Home, Hotels, Flights, CarRental,
│   │   │                    # Attractions, Taxi, Dashboard, Login, Register
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .gitignore
│
└── Project_Report.pdf       # Detailed project documentation (to be added)
```

---

## How to Run

### Backend

1. Navigate to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file (not committed to Git) with your MongoDB connection string and JWT secret, e.g.:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run `npm start` (or `npx nodemon server.js` for development) to launch the backend server.

### Frontend

1. Navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to launch the Vite development server.
4. Open the app in your browser and begin searching and booking travel services.

---

## Applications

* Travel Agencies
* Tourism Platforms
* Airlines and Hotel Chains
* Car Rental Companies
* Travel Startups and Aggregators

---

## Future Enhancements

* Payment gateway integration.
* Mobile application version.
* Admin analytics dashboard.
* Email/SMS booking confirmations.
* AI-based travel recommendations.
* Multi-language and multi-currency support.

---

## Documentation

Detailed project documentation will be available in `Project_Report.pdf` once added to the repository. Planned contents:

* Problem Statement
* System Design
* Implementation Details
* Page-by-Page Feature Breakdown
* Conclusion

---

## License

This project is developed for educational and academic purposes. No formal open-source license has been applied yet; add a `LICENSE` file (e.g. MIT) if you intend to make this reusable by others.
