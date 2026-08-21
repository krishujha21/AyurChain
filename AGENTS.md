# AGENTS.md — AyurChain AI Agent Guidelines & System Protocols

> **IMPORTANT FOR ALL AI AGENTS**: Any AI assistant (Gemini, Claude, GPT, Cursor, etc.) modifying or extending this codebase **MUST** strictly adhere to the rules and architectural guidelines defined in this document.

---

## 🚀 1. Dual Environment Standard (Localhost & Production)

### Frontend (Vite + React)
- **NEVER** hardcode backend URLs (like `http://localhost:5000` or `https://ayurchain-5nx5.onrender.com`) directly inside components or API calls.
- **ALWAYS** import `API_BASE_URL` from `@/config/api.js` (or relative `../config/api.js`).
- Environment fallback logic:
  - Localhost (`localhost`, `127.0.0.1`): `http://localhost:5000`
  - Production (Vercel): `import.meta.env.VITE_API_BASE_URL` or Render production URL.

### Backend (Node.js + Express + Mongoose)
- CORS must support both production and local origins:
  ```js
  const allowedOrigins = [
    process.env.CORS_ORIGIN || 'https://ayur-chain-three.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000'
  ];
  ```
- Port handling: `const PORT = process.env.PORT || 5000;` (Render automatically assigns `process.env.PORT`).

---

## 🌿 2. Codebase Architecture & Design Rules

1. **Design Aesthetics**:
   - Maintain the premium Ayurvedic theme: Deep emerald greens (`#064e3b`, `#10b981`), dark slate/surface backgrounds, sleek glassmorphism, and gold accent badges.
   - Do **NOT** introduce plain basic colors or strip tailwind styling.

2. **Database & Data Fallback Policy**:
   - All backend API endpoints interacting with MongoDB **MUST** include proper `try/catch` error handling and return clean JSON `{ success: boolean, data?: any, error?: string }`.
   - Frontend components using backend APIs **MUST** gracefully fallback to `localStorage` or `mockData` if the backend is unreachable or returning errors.

3. **Routing Integrity**:
   - Keep `/` root route active in `server.js` for health checks (`GET /` and `GET /api/health`).
   - Frontend routing must preserve all 6 primary views:
     - `/` (Landing Page)
     - `/dashboard` (Role-based Dashboard)
     - `/trace/:batchId` (Botanical Timeline)
     - `/register` (Farmer/Herb Registration)
     - `/scan` (QR/NFC Verifier)
     - `/admin` (Regulator Fraud Panel)

---

## 🛠️ 3. Development Commands

| Command | Location | Description |
| :--- | :--- | :--- |
| `npm run dev` | `./frontend` | Starts Vite Dev Server (`http://localhost:5173`) |
| `npm run dev` / `npm start` | `./backend` | Starts Backend Express Server (`http://localhost:5000`) |

---

## 🔒 4. Security & Environment Variable Policy

- **NEVER** commit `.env` files containing real secrets (passwords, private keys) to Git.
- Always update `.env.example` when introducing a new environment variable.
