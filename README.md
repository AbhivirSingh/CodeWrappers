# Health and Fitness Tracker App

Welcome to the GitHub repository for our **Health and Fitness Tracker App**! This application is designed to help users monitor their health, set fitness goals, and receive personalized recommendations to maintain a healthy lifestyle. The backend for this app is built with simplicity and functionality in mind, ensuring users can effectively track and manage their fitness journey.

---

## Features

The backend of the app supports the following key functionalities:

1. **User Authentication and Management**
   - User registration and login using email or social media accounts (Google, Facebook).
   - Storage of user data like age, weight, and height in a database (MongoDB).

2. **Health Metric Tracking**
   - API endpoints to log and manage health metrics (weight, BMI, heart rate, and calories burned).
   - Secure and efficient storage of health data for retrieval and updates.

3. **Fitness Goal Setting**
   - APIs for creating, updating, and viewing user fitness goals.
   - Goal progress tracking to ensure motivation and accountability.

4. **Personalized Recommendations**
   - Basic logic to provide workout and nutrition recommendations tailored to user profiles.
   - Focus on simplicity and user preferences.

5. **Activity Tracking**
   - Logging daily activities like steps taken and calories burned.
   - Helping users maintain an overview of their routines.

6. **Push Notifications and Reminders**
   - Integration with Firebase Cloud Messaging for reminders about workouts, hydration, and meals.

7. **Offline Mode Support**
   - Offline logging of activities with local device storage.
   - Syncing data with the server when online.

8. **Basic AI Integration and Data Analysis**
   - Simple insights into user habits.
   - Suggestions for adjustments in workouts or nutrition plans.

9. **Security and Compliance**
   - Encryption methods to protect sensitive user data.
   - Adherence to standard security practices.

---

## Tech Stack

- **Frontend:** HTML, CSS, JS  
- **Backend:** Node.js  
- **Database:** MongoDB  
- **APIs:** Third-party APIs for wearable data and health insights  

---

## API Endpoints

Here are the main API endpoints implemented in the backend:

| Method | Endpoint               | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/register`         | User registration              |
| POST   | `/api/login`            | User login                     |
| GET    | `/api/users/{id}`       | Retrieve user profile          |
| PUT    | `/api/users/{id}`       | Update user profile            |
| POST   | `/api/metrics`          | Log health metrics             |
| GET    | `/api/goals`            | Get user's fitness goals       |
| POST   | `/api/goals`            | Set new fitness goals          |
| GET    | `/api/notifications`    | Retrieve notifications         |

---


