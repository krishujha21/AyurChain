# 🛡️ AGENTS.md — AyurChain AI Agent Guidelines, Coding Standards & Boundaries

> **ATTENTION AI ASSISTANTS (Gemini, Claude, GPT, Cursor, Copilot, etc.)**: 
> You are working on **AyurChain**, a Web3 + IoT Ayurvedic Botanical Traceability Platform.
> Before making ANY changes to this repository, read and strictly adhere to these instructions.

---

## ⛔ 1. HARD LIMITATIONS & BOUNDARIES (What AI Agents MUST NEVER Do)

1. **NEVER STREAK OR DELETE EXISTING FEATURES**:
   - Do NOT replace real components or features with placeholder text like `// TODO: Implement later` or `/* rest of code unchanged */`.
   - Do NOT delete mock fallback data (`mockData.js`). The app must work 100% offline or when backend is down.

2. **NEVER HARDCODE BACKEND URLS**:
   - **WRONG**: `fetch('http://localhost:5000/api/batches')` or `fetch('https://ayurchain-5nx5.onrender.com/api/batches')`
   - **RIGHT**: Import `API_BASE_URL` from `@/config/api.js` (or `../config/api.js`) and fetch using `${API_BASE_URL}/api/batches`.

3. **NEVER BREAK THE TAILWIND & AYURVEDIC THEME**:
   - Do NOT introduce raw CSS files or plain basic Tailwind colors like `bg-blue-500` or `bg-white` for primary layouts.
   - Always use defined color tokens: `bg-bgDeep` (`#030712`), `bg-surface` (`#0b1329`), `text-primaryGreen` (`#10b981`), `border-borderDark` (`#1f2937`), and glassmorphism styling (`backdrop-blur-md`).

4. **NEVER BREAK EXISTING API & ROUTE CONTRACTS**:
   - Frontend Routes MUST stay preserved: `/`, `/dashboard`, `/trace/:batchId`, `/register`, `/scan`, `/admin`.
   - Backend APIs MUST return `{ success: true, data: ... }` on success or `{ success: false, error: ... }` on failure with status codes (200, 201, 400, 404, 500).

5. **NEVER COMMIT SECRETS OR `.env` FILES**:
   - `.env` containing real DB passwords or private keys MUST NEVER be committed to Git. Only update `.env.example`.

---

## 🎨 2. CODEWRITING INSTRUCTIONS (How AI Agents MUST Write Code)

### A. Frontend (React 18 + Vite + Tailwind)
- **Component Pattern**: Use functional components with clean hooks. Always handle loading and error states gracefully.
- **State & Context**: Global state lives in `src/context/AppContext.jsx`. When adding new global state, expose clean action methods.
- **API Fetching Pattern**:
  ```javascript
  import API_BASE_URL from '../config/api';

  async function fetchBatches() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/batches`);
      const json = await res.json();
      if (json.success) return json.data;
      throw new Error(json.error);
    } catch (err) {
      console.warn("Backend unavailable, using fallback:", err.message);
      // Fallback gracefully to localStorage or mockData!
      return getFallbackBatches();
    }
  }
  ```

### B. Backend (Node.js + Express + Mongoose)
- **Modular Route Structure**: Add routes inside `server.js` (or future `routes/` directory).
- **Mongoose Schema Standard**: Always define proper field types and default values (e.g. `isSuspicious: { type: Boolean, default: false }`).
- **Always Include Root & Health Routes**: Keep `GET /` and `GET /api/health` intact so Render health checks never fail.

---

## 📁 3. Directory Structure Quick Reference

```text
sihp1/
├── AGENTS.md                  <-- You are here (AI Instructions)
├── backend/
│   ├── server.js              <-- Main Express App & Mongoose Models
│   ├── .env.example           <-- Backend Env Template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── config/api.js      <-- Centralized Localhost/Prod Backend URL Switcher
    │   ├── context/AppContext.jsx <-- Global React App State
    │   ├── components/        <-- UI Components (Navbar, Cards, Scanners, etc.)
    │   ├── pages/             <-- Primary App Views (Landing, Dashboard, Trace, etc.)
    │   └── data/mockData.js   <-- Offline & Demo Fallback Data
    └── package.json
```

---

## 🚀 4. How to Run Locally

### Frontend (`./frontend`):
```bash
npm install
npm run dev
# Running on http://localhost:5173
```

### Backend (`./backend`):
```bash
npm install
npm run dev # or npm start
# Running on http://localhost:5000
```

---

## 💡 5. Summary Rule for AI Agents
**"Build for production, protect offline fallback, write self-documenting clean code, and never strip existing UI aesthetics."**
