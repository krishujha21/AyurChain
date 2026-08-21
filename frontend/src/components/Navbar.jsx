import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WalletConnector, RoleSelector } from './WalletSelectorComponents';
import { 
  ShieldCheck, 
  Leaf, 
  Globe, 
  LogIn, 
  LogOut, 
  User, 
  Menu, 
  X, 
  LayoutDashboard, 
  Search, 
  FileCheck, 
  PlusCircle, 
  Lock 
} from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLanguage, t, user, logout, isAuthenticated } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/dashboard', label: t('navDashboard') },
    { path: '/trace/BATCH-2024-001', label: t('navTrace') },
    { path: '/register', label: t('navRegister') },
    { path: '/scan', label: t('navScan') },
    { path: '/admin', label: t('navAdmin') },
  ];

  return (
    <nav className="bg-surface/95 backdrop-blur-md border-b border-borderDark sticky top-0 z-40 px-3 sm:px-6 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primaryGreen to-accentGold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Leaf size={20} className="text-bgDeep font-bold" />
          </div>
          <div>
            <span className="font-display font-extrabold text-base sm:text-lg text-textPrimary tracking-tight flex items-center gap-1">
              AyurChain
              <span className="text-[10px] font-mono font-normal text-accentGold bg-accentGold/10 px-1.5 py-0.2 rounded border border-accentGold/20">v1.0</span>
            </span>
            <p className="text-[8px] sm:text-[9px] font-mono text-textMuted uppercase tracking-wider -mt-0.5">Botanical Traceability</p>
          </div>
        </Link>

        {/* Desktop Navigation Items */}
        <div className="hidden xl:flex items-center gap-1 bg-bgDeep/60 p-1 rounded-xl border border-borderDark/60">
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

        {/* Right Action Tools: Language, Auth, Role & Wallet */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-surface border border-borderDark hover:border-primaryGreen text-xs font-mono px-2 py-1.5 rounded-lg text-textPrimary transition-colors"
            title="Toggle Language"
          >
            <Globe size={13} className="text-accentGold" />
            <span className="hidden sm:inline">{lang === 'en' ? 'EN' : 'हिन्दी'}</span>
          </button>

          <div className="hidden sm:block">
            <RoleSelector />
          </div>

          <div className="hidden md:block">
            <WalletConnector />
          </div>

          {/* User Auth Pill / Login Link */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-1.5 bg-bgDeep border border-borderDark px-2.5 py-1.5 rounded-xl">
              <div className="w-5 h-5 rounded-full bg-primaryGreen/20 text-primaryGreen flex items-center justify-center text-[10px] font-bold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block text-left leading-none">
                <span className="text-[11px] font-bold text-textPrimary block truncate max-w-[90px]">{user.name}</span>
                <span className="text-[9px] text-accentGold font-mono">{user.role}</span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="text-textMuted hover:text-errorRed p-1 transition-colors"
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-surface hover:bg-bgDeep border border-borderDark hover:border-primaryGreen text-xs font-semibold px-3 py-1.5 rounded-xl text-primaryGreen transition-all shadow-sm"
            >
              <LogIn size={14} />
              <span>{t('navLogin')}</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-surface border border-borderDark text-textMuted hover:text-textPrimary focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>

      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-borderDark/80 space-y-3 animate-fade-in">
          
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            <RoleSelector />
            <WalletConnector />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.startsWith('/trace') && location.pathname.startsWith('/trace'));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl text-center transition-all ${
                    isActive
                      ? 'bg-primaryGreen/15 text-primaryGreen font-semibold border border-primaryGreen/30'
                      : 'bg-bgDeep/50 text-textMuted hover:text-textPrimary hover:bg-surface border border-borderDark/40'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth Button */}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primaryGreen to-emerald-600 text-bgDeep font-bold text-xs py-2.5 rounded-xl shadow-md"
            >
              <LogIn size={15} />
              <span>Sign In / Create Account</span>
            </Link>
          )}
        </div>
      )}

    </nav>
  );
};
