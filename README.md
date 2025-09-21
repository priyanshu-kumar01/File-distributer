# Task Distribution App (MERN Stack)

## Overview
A MERN stack app for admin login, agent management, and CSV task distribution.  
Admins can add agents, upload CSV files, and distribute tasks evenly.

## Features
- Admin login with JWT
- Add/list agents
- Upload CSV (`.csv`, `.xlsx`, `.xls`)
- Distribute tasks to agents
- Responsive UI (Tailwind CSS)

## Tech
- React.js + Tailwind CSS
- Node.js + Express.js
- MongoDB
- JWT + bcrypt
- PapaParse for CSV

## Setup

## Frontend 
cd client
npm install
npm run dev


### Backend
cd server
npm install
# Create .env with MONGO_URL, JWT_SECRET, PORT
npm run dev
