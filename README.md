# Trip System - Student Location Tracking

##  Overview
This project is a full-stack system developed for managing a school trip.

It allows teachers to:
- Register and log in
- View their students
- Track students' real-time locations on a map

Students send their location to the server every minute, and the system displays their updated positions on Google Maps.

---

##  Technologies Used

### Frontend
- Next.js (React)
- TypeScript
- Google Maps API (@react-google-maps/api)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)

---

##  Features

###  Authentication
- Login/Register for teachers and students
- JWT-based authentication
- <img width="489" height="696" alt="Screenshot 2026-04-30 201920" src="https://github.com/user-attachments/assets/efb66de5-2a2e-4982-be8a-bca20b7a820a" />


###  Teacher Dashboard
- View all students in the same class
- Interactive map displaying student locations
<img width="1293" height="833" alt="image" src="https://github.com/user-attachments/assets/c6ea76d1-7eca-47a9-ae84-10a720c7474c" />


###  Location Tracking
- Students send location in DMS format (Degrees, Minutes, Seconds)
- Server converts to decimal coordinates
- Only the latest location per student is stored (using upsert)

###  Map Integration
- Real-time updates (polling every 60 seconds)
- Markers for each student
- Teacher can visually track all students
  <img width="1826" height="888" alt="Screenshot 2026-04-30 201614" src="https://github.com/user-attachments/assets/f07420fe-f6b5-488d-ba78-a60adbfa25bb" />

---

##  API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Students
- GET /api/students
- GET /api/students/:id
- GET /api/students/class/:className

### Teachers
- GET /api/teachers
- GET /api/teachers/:id
- GET /api/teachers/:id/students

### Locations
- POST /api/locations
- GET /api/locations
- GET /api/locations/teacher/:teacherId

---

##  How to Run

### Backend
cd server
npm install
npm run dev

### Frontend
cd client
npm install
npm run dev

---

##  Environment Variables

### Backend (.env)
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret

### Frontend (.env)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

---

##  Author
Abigail Berk
