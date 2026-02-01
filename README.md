# Online Stakeholders Feedback — Full Stack (React + Node + MongoDB)

This repository contains a simple public feedback system for university stakeholders.

Run the backend and frontend locally:

- Backend (in c:/Users/SREER/Documents/Feedbaack/backend):

```powershell
cd backend
npm install
# copy .env.example to .env and set MONGODB_URI if needed
npm run dev
```

- Frontend (in c:/Users/SREER/Documents/Feedbaack/frontend):

```powershell
cd frontend
npm install
npm run dev
```

By default, the frontend calls `/api/feedback` on the same origin. During development the Vite dev server is configured to proxy `/api` to `http://localhost:5000` so you can run the frontend and backend independently.

Local dev tips:

```powershell
# Start backend
cd backend
npm install
npm run dev

# In a separate terminal start frontend
cd frontend
npm install
npm run dev
```

If you deploy frontend and backend to different hosts, update the Vite proxy or set the full backend URL in requests.

See `DEPLOYMENT.md` for a short deployment guide (Vercel frontend + Render/Atlas backend).
