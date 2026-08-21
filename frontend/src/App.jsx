import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { TransactionToast } from './components/TransactionToast';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TraceabilityPage } from './pages/TraceabilityPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ScanPage } from './pages/ScanPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-bgDeep text-textPrimary selection:bg-primaryGreen selection:text-bgDeep flex flex-col justify-between">
          <div>
            <Navbar />
            <main className="w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/trace/:batchId" element={<TraceabilityPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
          </div>
          <TransactionToast />
        </div>
      </Router>
    </AppProvider>
  );
}
