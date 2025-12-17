🏢 BuildingPulse Frontend

BuildingPulse is a modern frontend web application built to monitor buildings, energy-related alerts, and operational status through a clean and interactive dashboard.
The project simulates a real-world monitoring platform by consuming data from a backend REST API and presenting it in a structured, user-friendly interface.

This project was designed to demonstrate frontend engineering fundamentals, API integration, state management, filtering, and scalable UI architecture.

🎯 Project Goals

Build a realistic dashboard-style web app

Integrate frontend UI with a backend API

Handle real-world concerns like loading states, errors, and filters

Keep the architecture scalable for future backend expansion

Create a project suitable for internship / entry-level software roles

🚀 Features
📊 Dashboard

High-level overview page

Designed to display KPIs such as alerts, usage, and building status

Acts as a foundation for future data visualizations

🏢 Buildings Page

Displays buildings fetched from an API

Shows building name, address, and type

Structured to support future metrics per building

🚨 Alerts Page

Fetches alerts dynamically from a backend API

Search alerts by title, description, or building

Filter alerts by:

Status (Open, In Progress, Resolved)

Severity (Low, Medium, High)

Update alert status using API calls

Handles loading and error states gracefully

🧰 Tech Stack
Frontend

React (with TypeScript)

Vite for fast development and bundling

Tailwind CSS for utility-first styling

React Router for navigation

Backend (Mock / Local)

JSON Server to simulate a REST API

Supports real HTTP methods (GET, PATCH)

🏗️ Project Structure
buildingpulse-frontend/
├── src/
│   ├── api.ts              # API helper functions
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── BuildingsPage.tsx
│   │   └── AlertsPage.tsx
│   ├── components/         # Reusable UI components
│   ├── data/               # Optional mock data
│   ├── App.tsx             # Application layout & routes
│   └── main.tsx            # Entry point
├── db.json                 # JSON Server database
├── package.json
├── vite.config.ts
└── README.md

🔌 API Architecture

The frontend communicates with a backend REST API using fetch.

API Endpoints (via JSON Server)
Method	Endpoint	Description
GET	/alerts	Fetch all alerts
PATCH	/alerts/:id	Update alert status
GET	/buildings	Fetch all buildings

A Vite proxy is used so the frontend can call /api/... without worrying about ports or CORS.

🛠️ Running the Project Locally
1️⃣ Clone the repository
git clone https://github.com/omsawant-git/buildingpulse-frontend.git
cd buildingpulse-frontend

2️⃣ Install dependencies
npm install

3️⃣ Run frontend + API together (recommended)
npm run dev:all


This starts:

JSON Server on http://localhost:4000

Vite dev server on http://localhost:517x

Alternative: Run separately

Terminal 1

npm run api


Terminal 2

npm run dev

🧪 Demo Behavior

Alerts are fetched dynamically from the API

Status updates are reflected immediately in the UI

Filters and search update results in real time

Page reloads re-fetch data from the backend

💡 Design Decisions

JSON Server was chosen to simulate a real backend without backend complexity

API helpers are centralized in api.ts

UI state is managed using React hooks

Tailwind CSS ensures fast iteration and consistent styling

Project is structured to allow easy migration to a real backend (Express / FastAPI)

🔮 Future Improvements

Authentication & role-based access

Pagination or infinite scroll for alerts

Charts and analytics on the dashboard

Real backend integration (Node.js / FastAPI)

Deployment using Vercel or Netlify

📄 License

This project is open-source and available under the MIT License.

👤 Author

Om Sawant
Master’s Student – Data Science
Frontend & Software Engineering Enthusiast

GitHub: https://github.com/omsawant-git