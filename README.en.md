# Task Manager — Frontend

Web interface for task management, consuming the [Task Manager API](https://github.com/ssergionp/task-manager-api). Portfolio project built to practice React, JWT authentication with automatic token refresh, and full frontend-backend integration in production.

🔗 **Live application:** https://task-manager-frontend-swart.vercel.app
🔗 **Backend repository:** https://github.com/ssergionp/task-manager-api

> Read in: [Português](README.md) | [English](README.en.md)

## Features

- Username/password login (JWT authentication)
- Persistent session (login survives page reload)
- Protected routes — unauthenticated users are redirected to `/login`
- Automatic token refresh via Axios interceptor: if a request fails with 401, the token is refreshed automatically and the original request is retried transparently
- Paginated task listing, with per-user data isolation
- Full task CRUD (create, edit, delete) directly through the UI
- Color-coded status badges (To Do, In Progress, Done)

## Stack

- **[React](https://react.dev/)** with **[Vite](https://vite.dev/)** as build tool
- **[React Router](https://reactrouter.com/)** for routing and protected routes
- **[Axios](https://axios-http.com/)** for HTTP requests, with custom interceptors
- **[Tailwind CSS v4](https://tailwindcss.com/)** for styling (modern setup via `@tailwindcss/vite`, no config file needed)
- React **Context API** for authentication state management

## Running locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- The [backend](https://github.com/ssergionp/task-manager-api) running locally (see that repository's README) — or pointing to the production instance, if preferred

### Steps

1. Clone the repository:
```bash
   git clone https://github.com/ssergionp/task-manager-frontend.git
   cd task-manager-frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env.local` file at the project root (this file is not version-controlled — each environment has its own):

VITE_API_URL=http://localhost:8080

Replace with the URL of whichever backend instance you want to use (local or production).

4. Start the development server:
```bash
   npm run dev
```

5. Open `http://localhost:5173` (or the port shown in the terminal).

## Environment variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` (local) or `https://task-manager-api-vcu3.onrender.com` (production) |

> **Why the `VITE_` prefix?** Vite only exposes environment variables prefixed with `VITE_` to browser-side code — this prevents accidentally leaking build secrets into the final bundle.

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server with hot-reload |
| `npm run build` | Generates the production build in the `dist/` folder |
| `npm run preview` | Serves the production build locally, for final testing |
| `npm run lint` | Runs ESLint over the project |

## Deployment

The application is deployed on [Vercel](https://vercel.com), with automatic deployment on every push to `main`. The `VITE_API_URL` environment variable is configured directly in the Vercel project dashboard, pointing to the production backend instance on [Render](https://render.com).

> **Note:** the backend runs on Render's free tier, which "sleeps" after 15 minutes of inactivity. The first request after that period may take 30-50 seconds to respond while the service wakes up.

## Author

Sérgio do Nascimento Pereira
