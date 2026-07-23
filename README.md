# AI Emergency Coordination & Decision Engine

## Overview
AI Emergency Coordination & Decision Engine is a multi-agent AI system that analyzes emergency incidents, assesses risk, provides decision support, and retrieves enterprise resources such as emergency contacts, nearby hospitals, weather, and location information.

## Features
- Multi-Agent AI Architecture
- Incident Classification
- Risk Assessment
- Decision Support
- Emergency Contacts
- Nearby Hospital Finder
- Weather Information
- Location Details
- React Dashboard
- Flask Backend

## Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Axios

### Backend
- Python
- Flask
- LangChain
- Groq LLM

### APIs
- Browser Geolocation API
- OpenStreetMap Nominatim API
- OpenStreetMap Overpass API
- Open-Meteo API

## Project Structure

```
backend/
├── agents/
├── prompts/
├── memory/
├── tools/
├── app.py
├── config.py

frontend/
├── src/
├── public/
├── package.json
```

## Installation

### Backend
pip install -r requirements.txt
python app.py

### Frontend
cd frontend
npm install
npm run dev

## Project Workflow

User Input
↓
Coordinator Agent
↓
Classifier Agent
↓
Risk Assessment Agent
↓
Decision Support Agent
↓
Enterprise Tools
↓
React Dashboard

## Status

✅ Milestone 1 Completed

✅ Milestone 2 Completed
