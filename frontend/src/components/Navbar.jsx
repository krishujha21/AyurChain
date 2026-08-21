import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WalletConnector, RoleSelector } from './WalletSelectorComponents';
import { ShieldCheck, Leaf, Globe, Layers, UserCheck, QrCode, SlidersHorizontal } from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLanguage, t } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/dashboard', label: t('navDashboard') },
    { path: '/trace/BATCH-2024-001', label: t('navTrace') },
    { path: '/register', label: t('navRegister') },
    { path: '/scan', label: t('navScan') },
    { path: '/admin', label: t('navAdmin') },
  ];

  return (
    <nav className="bg-surface/90 backdrop-blur-md border-b border-borderDark sticky top-0 z-40 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primaryGreen to-accentGold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Leaf size={20} className="text-bgDeep font-bold" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg text-textPrimary tracking-tight flex items-center gap-1">
              AyurChain
              <span className="text-xs font-mono font-normal text-accentGold bg-accentGold/10 px-1.5 py-0.5 rounded border border-accentGold/20">v1.0</span>
            </span>
            <p className="text-[9px] font-mono text-textMuted uppercase tracking-wider -mt-0.5">Botanical Blockchain Traceability</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="hidden lg:flex items-center gap-1 bg-bgDeep/60 p-1 rounded-xl border border-borderDark/60">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path.startsWith('/trace') && location.pathname.startsWith('/trace'));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-primaryGreen/15 text-primaryGreen font-semibold border border-primaryGreen/30'
                    : 'text-textMuted hover:text-textPrimary hover:bg-borderDark/30'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Action Tools: Language, Role & Wallet */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-surface border border-borderDark hover:border-primaryGreen text-xs font-mono px-2.5 py-1.5 rounded-lg text-textPrimary transition-colors"
            title="Toggle Language"
          >
            <Globe size={14} className="text-accentGold" />
            <span>{lang === 'en' ? 'EN' : 'हिन्दी'}</span>
          </button>

          <RoleSelector />
          <WalletConnector />
        </div>

      </div>
    </nav>
  );
};
