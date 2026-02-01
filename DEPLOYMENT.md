# Deployment Guide (Vercel frontend + Render/Atlas backend)

Quick overview:

- Frontend: Deploy the `frontend` folder on Vercel. Use the default Vite build command `npm run build` and output `dist`.
- Backend: Deploy the `backend` folder on Render or Render's web service. Ensure `NODE_ENV=production` and `MONGODB_URI` environment variable points to MongoDB Atlas.

Steps (high level):

1. Create a MongoDB Atlas cluster and note the connection string.
2. Push the repo to GitHub.
3. On Render: Create a new Web Service, connect the repo, choose `backend` subdirectory, set `npm install` and `npm start` (or `npm run dev` for staging). Add `MONGODB_URI` in environment settings.
4. On Vercel: Import the repo, set the root directory to `frontend`. Set build command `npm run build` and output directory `dist`. For production, point any API calls to the deployed backend URL (replace `/api` calls or configure environment variable).

Notes:
- The dev `vite.config.js` proxy is only for local development.
- Secure your production MongoDB credentials; do not commit them to source control.
