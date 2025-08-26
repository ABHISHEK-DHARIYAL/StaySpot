# 🌍 StaySpot

StaySpot is a **full-stack MERN project** inspired by Airbnb, enhanced with additional tools like real-time weather integration and responsive utilities to make travel planning more seamless.

- 🏠 Listing and Posting Reviews
- 🌦 Added anyother Project of **Weather Widget** (React + Vite + EJS)
- 🔒 User authentication and authorization for Login, Logout and Signin Feature 
- 📍 Map-based location search and geolocation through MapLibre.

---

## 🚀 Features

### **Core Platform**
- 🏠 **Listings Management** – Create, edit, and delete property listings.  
- 🖼 **Image Upload** – Upload and manage images for each listing.  
- 🗺 **Map Integration** – Display property locations using latitude and longitude.  
- 🔒 **User Authentication** – Secure login, signup, logout, and session management.  
- 📅 **Booking System** – Reserve listings with start and end dates.  

---

### **Weather Integration**
- ⛅ **React Weather Widget** built with **Vite**.  
- 🌦 Real-time weather data for any city or location.  
- 🔗 Embedded into **EJS templates** for seamless SSR integration.  

---

### **Core Functionalities**
1. **Responsive Navigation**  
   - Desktop: Inline menu.  
   - Mobile: Collapsible hamburger menu with red toggle button.  
   - Dark theme adjustments.

2. **Mobile Search Toggle**  
   - Compact icon toggles a hidden search bar.  
   - Optimized for smaller screens (**≤400px** and **≤320px**).

3. **Budget Filter Popup**  
   - Dropdown filter with fade-in animation.  
   - Supports dark/light themes.  
   - Multiple budget checkboxes with a **Clear Filter** option.

4. **Theme Switching**  
   - `dark-theme` class support for navbar, filters, and search components.

5. **Hotel Search & Filtering**  
   - Search hotels by name or location.  
   - Filter listings dynamically by budget.

6. **Responsive Breakpoints**  
   - **≤767px**: Mobile layout with stacked menu.  
   - **≤575px**: Compact paddings and smaller icons.  
   - **≤400px / ≤320px**: Ultra-compact layout for tiny screens.

7. **Animations & Transitions**  
   - Smooth fade-in and hover animations for popups, filters, and toggles.

8. **Interactive JavaScript**  
   - Class toggling for menus, filters, and search.  
   - Event listeners for navbar and search toggle buttons.

---

## 🛠 Tech Stack

| Layer        | Technology                             |
| ------------ | -------------------------------------- |
| **Frontend** | EJS, Tailwind CSS, React (Vite)        |
| **Backend**  | Node.js, Express.js                    |
| **Database** | MongoDB, Mongoose                      |
| **Maps**     | MapLibre, Mapbox, or Leaflet           |
| **Auth**     | Passport.js / JWT                      |

---

## 📂 Project Setup

1️⃣ Clone the repository
git clone https://github.com/ABHISHEK-DHARIYAL/StaySpot.git

2️⃣ Install dependencies
# Install server dependencies <br>
npm install

3️⃣ Create a .env file
In the project root, create a .env file and configure it with your credentials:

# 🌐 Database
ATLASDB_URL=your_mongodb_connection_string

# 🔒 Authentication
SECERT=your_jwt_secret

# ☁️ Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name <br>
CLOUD_API_KEY=your_cloudinary_api_key <br>
CLOUD_API_SECRET=your_cloudinary_api_secret <br>

# 🌦 Weather API
VITE_Weather_API_URL= <br>
VITE_Weather_API_KEY=your_weather_api_key <br>

4️⃣ **Start the website** <br>
node app.js
