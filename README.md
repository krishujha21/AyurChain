# 🌿 AyurChain — Blockchain Botanical Traceability System

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Web3](https://img.shields.io/badge/Blockchain-Ethers.js_%2B_IPFS-3C3C3D?logo=ethereum)](https://ethers.org/)
[![Express](https://img.shields.io/badge/Backend-Node.js_%2B_Express-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?logo=vercel)](https://ayur-chain-three.vercel.app/)

> **AyurChain** is an end-to-end, immutable Web3 supply chain transparency platform designed for Ayurvedic herbs and botanical formulations. It tracks medicinal herbs from wild forest harvesting and organic cultivation through processing, lab testing, manufacturing, packaging, and retail distribution.

---

## 📌 Table of Contents
- [✨ Key Features](#-key-features)
- [📸 Application Screenshots](#-application-screenshots)
- [🏗 Architecture & Workflow](#-architecture--workflow)
- [⚡ Tech Stack](#-tech-stack)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🌐 Deployment & Live Links](#-deployment--live-links)
- [📄 License](#-license)

---

## ✨ Key Features

- **🌱 Farm-to-Pharma Traceability**: Track every stage of botanical sourcing with precise geo-location metadata, harvest timestamps, collector details, and batch certificates.
- **🔗 Decentralized Storage & Verification**: IPFS integration for storing tamper-proof quality control lab reports, organic certifications, and herb identity documentation.
- **🗺 Interactive Geo-Mapping**: Integrated geographical mapping to view exact harvesting regions across India and forest collection zones.
- **📱 Consumer QR Code Verification**: Instantly scan product QR codes to view full lineage, lab test results, carbon footprint metrics, and authentic harvest history.
- **🛡 Regulatory & Admin Dashboard**: Dedicated portals for quality control inspectors, lab verifiers, state forest departments, and AYUSH compliance regulators.
- **🔐 Secure Role-Based Authentication**: JWT & bcrypt powered authentication supporting Email/Password and instant Web3 MetaMask single-sign-on with 1-click evaluation demo accounts.
- **🦊 Multi-Wallet Support**: Seamless Web3 wallet connectivity via MetaMask, WalletConnect, and Coinbase Wallet.
- **⚡ Dual Environment & Smart Failover**: Production-ready architecture with seamless failover between primary/secondary backends and offline demo fallback (`mockData`).

---

## 📸 Application Screenshots

### 1. 🌐 Home Landing Portal
*Hero overview of the AyurChain ecosystem highlighting verified batch stats, live supply chain metrics, and botanical authenticity.*

![AyurChain Landing Page](docs/screenshots/landing.png)

---

### 2. 📍 Interactive Botanical Traceability Timeline
*Granular timeline showing complete herb provenance—from forest collection to quality inspection, extraction, and retail packaging.*

![Traceability Timeline](docs/screenshots/traceability.png)

---

### 3. 📊 Supply Chain Operations Dashboard
*Live batch status monitoring, active inventory metrics, quality control status, and supply chain stage tracking.*

![Dashboard Overview](docs/screenshots/dashboard.png)

---

### 4. 📲 Consumer QR Scanner & Batch Lookup
*Direct QR scanning and manual batch lookup interface for consumers and retailers to verify herb purity.*

![QR Scanner & Batch Lookup](docs/screenshots/scan.png)

---

### 5. 👥 Stakeholder Onboarding & Registration
*Registration interface for farmers, collectors, processors, testing labs, and manufacturers.*

![Stakeholder Registration](docs/screenshots/registration.png)

---

### 6. 🏛 Regulatory & Compliance Portal
*Admin dashboard for AYUSH officers and quality auditors to inspect pending verification requests and issue certifications.*

![Admin Compliance Portal](docs/screenshots/admin.png)

---

## 🏗 Architecture & Workflow

```mermaid
flowchart LR
    A[🌲 Herb Collector / Farmer] -->|Geo-Tag & Harvest Data| B(📦 Batch Generation)
    B -->|Upload Lab Certs| C[🌐 IPFS / Decentralized Storage]
    B -->|Mint Provenance Record| D[⛓ Smart Contract / Blockchain]
    D --> E[🏭 Processing & Extraction]
    E --> F[🧪 Quality Testing Lab]
    F --> G[💊 Manufacturing & Packaging]
    G -->|Unique QR Code| H[🏪 Consumer & Retailer Scan]
```

---

## ⚡ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite, React Router v7 |
| **Styling & UI** | Tailwind CSS, Lucide Icons, Framer Motion |
| **Blockchain & Web3** | Ethers.js v6, IPFS, Web3 Wallet Connectors |
| **Maps & Data Visualization** | Leaflet, React-Leaflet, Recharts |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB Atlas / Mongoose |
| **Deployment** | Vercel (Frontend), Render (Backend API) |

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/krishujha21/AyurChain.git
cd AyurChain
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend app will launch at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd ../backend
npm install
npm run dev
```
The backend API server will run at `http://localhost:5000`.

---

## 🌐 Deployment & Live Links

- **Frontend Application (Vercel)**: [https://ayur-chain-three.vercel.app](https://ayur-chain-three.vercel.app)
- **Backend API (Render)**: [https://ayurchain-5nx5.onrender.com](https://ayurchain-5nx5.onrender.com)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
