# 🛡️ CrowdShield – Frontend

CrowdShield is a modern, scalable frontend application designed to support **crowd safety, monitoring, and guidance** during large-scale public events.  
This project provides intuitive dashboards for authorities and clear guidance interfaces for pilgrims, ensuring safety, coordination, and smooth navigation.

---

## 🌐 Live Demo
🔗 https://crowdshield-system.netlify.app

---

## 🚀 Features

- ⚛️ Built with **React + Vite** for fast development and performance
- 🎨 Clean and responsive UI using **Tailwind CSS**
- 🔐 Login and authentication-ready architecture
- 🧭 **Authority Dashboard** for monitoring and management
- 🧑‍🤝‍🧑 **Pilgrim Guidance** interface for navigation and safety updates
- 🌍 Multi-language support using **i18n**
- 🔗 API-based architecture for backend integration
- 📱 Fully responsive across devices

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|-----------|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Localization | i18n |
| Deployment | Netlify |

---
```
## 📂 Project Structure

client/
├─ public/
│ ├─ background.jpg
│ └─ vite.svg
├─ src/
│ ├─ assets/
│ ├─ components/
│ │ ├─ authority/
│ │ ├─ pilgrim/
│ │ ├─ layout/
│ │ └─ ui/
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ Login.jsx
│ │ ├─ AuthorityDashboard.jsx
│ │ └─ PilgrimGuidance.jsx
│ ├─ services/
│ │ └─ api.js
│ ├─ locales/
│ ├─ App.jsx
│ └─ main.jsx
├─ vite.config.js
└─ package.json

```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/VishakhaVB/crowdshield-frontend.git
cd crowdshield-frontend
2️⃣ Install dependencies
npm install
3️⃣ Run locally
npm run dev
The app will run on:

http://localhost:5173
🔗 Backend Integration
This frontend is designed to connect with the CrowdShield backend API.
Make sure the backend is running and the API base URL is correctly set in:

src/config.js
🎯 Use Case
CrowdShield is built for:

Large public events

Religious gatherings

Crowd-sensitive environments

Safety-focused monitoring systems

It helps authorities make informed decisions and assists pilgrims with guidance and safety information.
