# 🛡️ CrowdShield – Frontend  
### Smart Crowd Management & Pilgrim Guidance System

CrowdShield is a **modern, scalable, safety-first frontend web application** designed to **monitor, analyze, and guide crowd movement** during **large-scale public events** such as pilgrimages, festivals, rallies, and mass gatherings.

The system provides:
- **Real-time authority dashboards** for monitoring crowd density & flow
- **Pilgrim-friendly guidance interfaces** for safe navigation
- **Data-driven UI** built for future AI & real-time integrations

🌐 **Live Demo**  
🔗 https://crowdshield-system.netlify.app

---

## 📌 Table of Contents
- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [Screens Overview](#-screens-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Backend Integration](#-backend-integration)
- [Use Cases](#-use-cases)
- [Security & Privacy](#-security--privacy)
- [Future Enhancements](#-future-enhancements)
- [Deployment](#-deployment)
- [Contributors](#-contributors)

---

## 🎯 Problem Statement

Large public gatherings such as **religious pilgrimages, festivals, political rallies, and sporting events** face serious challenges:

- ❌ Overcrowding & bottlenecks  
- ❌ Poor real-time crowd visibility  
- ❌ Delayed emergency response  
- ❌ Lack of clear navigation for attendees  
- ❌ Manual & fragmented decision-making  

These issues often result in **panic situations, stampedes, confusion, and safety risks**.

---

## ✅ Solution Overview

**CrowdShield** solves these challenges by providing a **centralized, map-driven, real-time-ready frontend system** that:

- Helps **authorities monitor crowd conditions**
- Guides **pilgrims safely through routes**
- Enables **quick decision-making**
- Is **scalable, modular, and API-driven**

The frontend is designed to seamlessly integrate with **backend services, AI models, and live data sources**.

---

## 🚀 Key Features

### 🧭 Authority Dashboard
- Live crowd overview
- Zone-based density visualization
- Risk-level indicators (Safe / Moderate / Busy / Avoid)
- Flow rate & crowd statistics
- Alert & evacuation control panel
- Field officer coordination UI

### 🧑‍🤝‍🧑 Pilgrim Guidance Interface
- Live area crowd status
- Suggested safe paths
- Estimated waiting times
- Visual map-based guidance
- Emergency contact access (Police & Medical)
- Simple, multilingual UI

### 🌍 General Features
- ⚛️ Built with **React + Vite** for performance
- 🎨 **Tailwind CSS** for modern & responsive UI
- 🌐 **Multi-language support (i18n)**
- 🔗 **API-ready architecture**
- 📱 Fully responsive (mobile / tablet / desktop)
- 🧩 Modular & scalable component structure
- 🔐 Authentication-ready design

---

## 🖥️ Screens Overview

### 🏛️ Authority Dashboard
- Real-time crowd density map
- Zone monitoring
- Alert & evacuation controls

### 🚶 Pilgrim Guidance Screen
- Crowd-safe navigation
- Live movement status
- Suggested paths with wait times

*(All data shown is simulated / estimated for demo purposes)*

---

## 🛠️ Tech Stack

| Category              | Technology                         |
|----------------------|-------------------------------------|
| Frontend Framework   | React                              |
| Build Tool           | Vite                               |
| Styling              | Tailwind CSS                       |
| Routing              | React Router                       |
| Localization         | i18n                               |
| API Handling         | Fetch / Axios (API-ready)          |
| Maps                 | Leaflet / OpenStreetMap            |
| Deployment           | Netlify                            |

---

## 📂 Project Structure

```bash
client/
├── public/
│   ├── background.jpg
│   └── vite.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── authority/
│   │   ├── pilgrim/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── AuthorityDashboard.jsx
│   │   └── PilgrimGuidance.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── locales/
│   ├── App.jsx
│   └── main.jsx
│
├── vite.config.js
└── package.json
```
## ⚙️ Installation & Setup

Follow the steps below to run the CrowdShield Frontend locally on your system.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/VishakhaVB/crowdshield-frontend.git
cd crowdshield-frontend
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Run the Application Locally
```
npm run dev
```
---
📍 The application will be available at:

http://localhost:5173
🔗 Backend Integration
This frontend is fully API-driven and designed to integrate seamlessly with the CrowdShield Backend.
---
API Configuration
Update the backend base URL in the following file:

src/config.js
Example Configuration
API_BASE_URL = "https://your-backend-url/api";
---
⚠️ Ensure the backend server is running before testing live or dynamic features.
🔐 Security & Privacy
CrowdShield is designed with public safety and ethical data usage as top priorities.
🚫 No personal user tracking
🚫 No camera feeds or facial recognition
📊 Crowd data is estimated and aggregated
🔐 Architecture supports role-based access control
🧠 Designed for ethical AI and public safety systems
---
🎯 Use Cases
CrowdShield is ideal for managing and monitoring:

🕌 Religious events (Kumbh Mela, Yatra, Pilgrimages)

🎉 Large public festivals & celebrations

🏟️ Stadiums and sports events

🚨 Emergency and disaster-prone crowd scenarios

🏛️ Government and municipal monitoring systems
---
📈 Future Enhancements
Planned upgrades and roadmap features include:

🔴 Real-time crowd density using IoT sensors

🗺️ Live GPS-based route optimization

📊 Advanced analytics & insights dashboards

🔔 Emergency broadcast & alert system

🤖 AI-based crowd prediction & risk detection

🔐 Full role-based access control (RBAC)

📡 WebSockets for real-time data updates
---
🚀 Deployment
The CrowdShield Frontend is deployed on Netlify.

🌐 Production URL

https://crowdshield-system.netlify.app
