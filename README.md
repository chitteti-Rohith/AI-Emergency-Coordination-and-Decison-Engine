# 🤖 AI Emergency Coordination & Decision Engine

A **Multi-Agent AI Emergency Response Platform** that analyzes emergency incidents, assesses risk, coordinates specialized AI agents, retrieves emergency resources, maintains memory, and generates intelligent decision support with emergency email alerts.

---

# 📌 Overview

The AI Emergency Coordination & Decision Engine is an intelligent emergency response platform built using a **Multi-Agent AI Architecture**.

The system coordinates multiple AI agents to:

- Classify emergency incidents
- Assess risk severity
- Recommend emergency actions
- Retrieve nearby hospitals
- Fetch emergency contacts
- Get weather and location information
- Maintain short-term and long-term memory
- Send emergency email alerts

---

# 🚀 Features

## 🤖 Multi-Agent AI System

- Coordinator Agent
- Classification Agent
- Risk Assessment Agent
- Decision Agent
- Retrieval Agent

## 🚨 Emergency Intelligence

- Incident Classification
- Risk Assessment
- AI Decision Support
- Emergency Contacts
- Nearby Hospital Finder
- Weather Information
- Location Details

## 🧠 Memory System

### Short-Term Memory

- Session-based incident memory
- Context-aware decision making

### Long-Term Memory

- Persistent incident storage using JSON
- Retrieval of similar previous incidents
- Historical knowledge for AI decision support

## 📧 Emergency Alert System

- EmailJS Integration
- AI-generated emergency report
- Incident summary
- Risk level
- Nearby hospital
- Emergency contacts
- AI recommended actions

## 📊 Dashboard

- Modern React Dashboard
- Incident Analysis
- Resources
- Emergency Alerts
- Incident History
- About Project

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- CSS3
- Axios
- EmailJS

## Backend

- Python
- Flask
- LangChain
- Groq LLM

## AI Architecture

- Multi-Agent System
- Prompt Engineering
- Short-Term Memory
- Long-Term Memory

## APIs

- Browser Geolocation API
- OpenStreetMap Nominatim API
- OpenStreetMap Overpass API
- Open-Meteo API

---

# 📂 Project Structure

```text
AI_Emergency_Coordination_System/

├── backend/
│   ├── agents/
│   ├── memory/
│   ├── prompts/
│   ├── tools/
│   ├── app.py
│   └── config.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── styles/
│   │   └── api/
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Backend

```bash
cd backend

pip install -r requirements.txt

python app.py
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔄 Project Workflow

```text
User Incident
      │
      ▼
Coordinator Agent
      │
      ▼
Classification Agent
      │
      ▼
Risk Assessment Agent
      │
      ▼
Retrieval Agent
      │
      ▼
Decision Agent
      │
      ▼
Emergency Resources
      │
      ▼
Memory System
      │
      ▼
Email Alert
      │
      ▼
React Dashboard
```

---

# 🧠 Memory Architecture

```text
                  User Incident
                         │
                         ▼
                Coordinator Agent
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
Short-Term Memory                Long-Term Memory
(Session Memory)               (Persistent JSON Store)
        │                                 │
        └────────────────┬────────────────┘
                         ▼
                  Decision Agent
                         │
                         ▼
                 AI Recommended Action
```

---

# 📸 Application Modules

- 🏠 Dashboard
- 🔍 Analysis
- 🏥 Resources
- 📧 Emergency Alerts
- 📜 Incident History
- ℹ About

---

# ✅ Milestone Progress

- ✅ Milestone 1 – Foundation & AI Agent Setup
- ✅ Milestone 2 – Enterprise Tools Integration
- ✅ Milestone 3 – Agent Coordination & Memory Systems
- ✅ Milestone 4 – Final Integration, Deployment & Documentation

---
# 🌐 Deployment

The application has been successfully deployed and tested in a production environment.

### Frontend
- Platform: Vercel
- URL: https://ai-emergency-frontend.vercel.app/

### Backend
- Platform: Render
- URL: https://ai-emergency-backend-q40q.onrender.com

### Deployment Highlights

- ✅ React frontend deployed on Vercel
- ✅ Flask backend deployed on Render
- ✅ Frontend connected to the deployed backend API
- ✅ `/analyze` API tested successfully
- ✅ Production workflow validated
- ✅ MIT License added to the repository

# 🔮 Future Enhancements

- SMS Notifications
- Voice-Based Emergency Reporting
- Image-Based Incident Detection
- Mobile Application
- Real-Time Emergency Service Integration

---

# 👨‍💻 Developer

**Rohith Ch**

B.Tech – Computer Science & Engineering

NBKR Institute of Science & Technology

---

# 📜 License

This project was developed for educational and research purposes.
