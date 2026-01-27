🛡️ CrowdShield – Frontend

CrowdShield is a modern, scalable frontend application designed to enhance crowd safety, monitoring, and guidance during large-scale public events.
It provides real-time dashboards for authorities and clear navigation & safety guidance for pilgrims, ensuring smooth coordination and risk reduction.

🌐 Live Demo

🔗 https://crowdshield-system.netlify.app

🎯 Problem Statement

Large public gatherings such as religious events, festivals, and rallies often face challenges like:

Overcrowding and bottlenecks

Poor real-time communication

Lack of clear guidance for attendees

Delayed decision-making by authorities

CrowdShield addresses these issues through an intuitive, data-ready frontend system built for safety-first operations.

🚀 Key Features

⚛️ React + Vite for lightning-fast performance

🎨 Tailwind CSS for a clean, responsive, and modern UI

🔐 Authentication-ready architecture

🧭 Authority Dashboard

Crowd monitoring UI

Control & management panels

🧑‍🤝‍🧑 Pilgrim Guidance Interface

Navigation assistance

Safety alerts & instructions

🌍 Multi-language support using i18n

🔗 API-driven design for seamless backend integration

📱 Fully responsive (mobile, tablet, desktop)

🧩 Scalable component-based architecture

🛠️ Tech Stack
```
| Category           | Technology                |
| ------------------ | ------------------------- |
| Frontend Framework | React                     |
| Build Tool         | Vite                      |
| Styling            | Tailwind CSS              |
| Routing            | React Router              |
| Localization       | i18n                      |
| API Handling       | Fetch / Axios (API-ready) |
| Deployment         | Netlify                   |
```
```
📂 Project Structure
client/
├─ public/
│  ├─ background.jpg
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ authority/
│  │  ├─ pilgrim/
│  │  ├─ layout/
│  │  └─ ui/
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ AuthorityDashboard.jsx
│  │  └─ PilgrimGuidance.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ locales/
│  ├─ App.jsx
│  └─ main.jsx
├─ vite.config.js
└─ package.json
```
⚙️ Installation & Setup
```
1️⃣ Clone the Repository
git clone https://github.com/VishakhaVB/crowdshield-frontend.git
cd crowdshield-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Run Locally
npm run dev
```

📍 Application will be available at:

http://localhost:5173

🔗 Backend Integration

This frontend is designed to work with the CrowdShield Backend API.

📌 Configure API base URL in:

src/config.js


Ensure the backend server is running before testing full functionality.

🎯 Use Cases

CrowdShield is ideal for:

🕌 Religious gatherings (pilgrimages, yatras)

🎉 Large public events & festivals

🏟️ Stadiums & mass assemblies

🚨 Crowd-sensitive safety environments

🏛️ Government & authority monitoring systems

📈 Future Enhancements

🔴 Real-time crowd density visualization

🗺️ Live maps & geolocation tracking

📊 Analytics dashboards

🔔 Emergency alert system

🤖 AI-based crowd prediction & risk detection

🔐 Role-based access control
