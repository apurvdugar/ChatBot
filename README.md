# Scaler Persona Chatbot Assignment

![alt text](/screenshots/image1.png) ![alt text](/screenshots/image2.png) ![alt text](/screenshots/image3.png)


## Live Deployment

- Frontend: `https://chat-bot-frontend-bay.vercel.app/`
- Backend: `https://chat-bot-backend-beta.vercel.app/`

## Features

- Chat dashboard with user/bot bubbles
- Persona switcher:
  - Anshuman Singh
  - Kshitij Mishra
  - Abhimanyu Saxena
- Dark/Light mode toggle
- Suggestion chips per persona
- Persona persistence and backend persona sync

## Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```env
OPENROUTER_API_KEY=your_openrouter_key
APP_URL=https://chat-bot-frontend-bay.vercel.app
```

### 3) Run backend

```bash
node client.js
```

## Frontend Setup 

### 1) Install dependencies

```bash
cd frontend
npm install
```

### 2) Configure environment variables

```env
VITE_API_URL=https://chat-bot-backend-beta.vercel.app
```

### 3) Run frontend

```bash
npm run dev
```