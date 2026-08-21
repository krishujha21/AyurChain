import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Building, 
  FileText, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Eye, 
  EyeOff
} from 'lucide-react';

export const LoginPage = () => {
  const { login, register, connectWallet, isAuthLoading, role, setRole } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: role || 'Farmer',
    organization: '',
    licenseNumber: '',
    walletAddress: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const roles = [
    { id: 'Farmer', label: 'Farmer / Collector', icon: '🌾', desc: 'Harvest & GPS logging' },
    { id: 'Lab', label: 'Quality Test Lab', icon: '🧪', desc: 'NABL test certificates' },
    { id: 'Manufacturer', label: 'Manufacturer', icon: '🏭', desc: 'Processing & Batch QR' },
    { id: 'Regulator', label: 'AYUSH Officer', icon: '⚖️', desc: 'Regulatory oversight' },
    { id: 'Consumer', label: 'Consumer / Buyer', icon: '🔍', desc: 'Purity verification' },
  ];

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errorMsg) setErrorMsg('');
  };

  const handleRoleSelect = (r) => {
    setFormData(prev => ({ ...prev, role: r }));
    setRole(r);
  };

  // One-click demo credential autofill for fast testing
  const handleQuickDemo = (demoRole) => {
    const demoMap = {
      Farmer: { email: 'ramesh.farmer@ayurchain.org', password: 'Password@123', name: 'Ramesh Kumar (Herbalist)' },
      Lab: { email: 'dr.sharma@nabllabs.in', password: 'Password@123', name: 'Dr. Neha Sharma (QC Head)' },
      Manufacturer: { email: 'operations@patanjali-ayur.com', password: 'Password@123', name: 'AyurPharma Industries' },
      Regulator: { email: 'director.ayush@gov.in', password: 'Password@123', name: 'Director (AYUSH Compliance)' },
      Consumer: { email: 'aarav.consumer@gmail.com', password: 'Password@123', name: 'Aarav Patel' }
    };
    const cred = demoMap[demoRole];
    setFormData(prev => ({
      ...prev,
      email: cred.email,
      password: cred.password,
      name: cred.name,
      role: demoRole
    }));
    setRole(demoRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setErrorMsg('Please provide both email and password.');
        return;
      }
      const res = await login({
        email: formData.email,
        password: formData.password,
        roleOverride: formData.role
      });
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(res.error || 'Invalid email or password');
      }
    } else {
      // Register
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMsg('Name, email, and password are required.');
        return;
      }
      const res = await register(formData);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(res.error || 'Registration failed');
      }
    }
  };

  const handleWalletLogin = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      const res = await login({ walletAddress: wallet, roleOverride: formData.role });
      if (res.success) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primaryGreen/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accentGold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-xl bg-surface/90 border border-borderDark backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primaryGreen to-accentGold shadow-lg mb-2">
            <Leaf size={26} className="text-bgDeep font-bold" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-textPrimary tracking-tight">
            {mode === 'login' ? 'Welcome Back to AyurChain' : 'Create AyurChain Account'}
          </h1>
          <p className="text-xs sm:text-sm text-textMuted max-w-sm mx-auto">
            {mode === 'login' 
              ? 'Access verified supply chain telemetry, lab logs, and cryptographic certificates' 
              : 'Join the decentralized botanical network as a verified herbal stakeholder'}
          </p>
        </div>

        {/* Tab Toggle Login / Register */}
        <div className="flex bg-bgDeep/80 p-1 rounded-xl border border-borderDark text-xs font-medium">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-lg transition-all text-center ${
              mode === 'login' 
                ? 'bg-primaryGreen text-bgDeep font-bold shadow-md' 
                : 'text-textMuted hover:text-textPrimary'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-lg transition-all text-center ${
              mode === 'register' 
                ? 'bg-primaryGreen text-bgDeep font-bold shadow-md' 
                : 'text-textMuted hover:text-textPrimary'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Stakeholder Role Picker */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-textMuted flex items-center justify-between">
            <span>Select Stakeholder Role</span>
            <span className="text-accentGold font-bold font-sans">{formData.role}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roles.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  formData.role === r.id
                    ? 'border-primaryGreen bg-primaryGreen/15 text-textPrimary shadow-sm shadow-primaryGreen/10 ring-1 ring-primaryGreen/50'
                    : 'border-borderDark bg-bgDeep/50 text-textMuted hover:border-borderDark/80 hover:text-textPrimary'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span>{r.icon}</span>
                  <span className="truncate">{r.id}</span>
                </div>
                <span className="text-[10px] text-textMuted mt-1 leading-tight">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Demo Credentials Autofill */}
        {mode === 'login' && (
          <div className="bg-bgDeep/60 border border-borderDark/70 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-accentGold">
              <span className="flex items-center gap-1">
                <Sparkles size={13} />
                Quick Demo Accounts (1-Click Fill)
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Farmer', 'Lab', 'Manufacturer', 'Regulator'].map(demoRole => (
                <button
                  key={demoRole}
                  type="button"
                  onClick={() => handleQuickDemo(demoRole)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-surface border border-borderDark hover:border-primaryGreen text-textPrimary hover:text-primaryGreen transition-colors"
                >
                  ⚡ {demoRole}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-errorRed/10 border border-errorRed/40 p-3 rounded-xl text-xs text-errorRed flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-textMuted mb-1">Full Name / Practitioner Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark focus:border-primaryGreen rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-textMuted mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted" />
              <input
                type="email"
                required
                placeholder="name@ayurchain.org"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-bgDeep border border-borderDark focus:border-primaryGreen rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-textMuted mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full bg-bgDeep border border-borderDark focus:border-primaryGreen rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textPrimary"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Organization / Enterprise (Optional)</label>
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    type="text"
                    placeholder="e.g. Patanjali Research Foundation"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark focus:border-primaryGreen rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">AYUSH / NABL License Number (Optional)</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    type="text"
                    placeholder="e.g. AYUSH-MH-2024-771"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark focus:border-primaryGreen rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-95 text-bgDeep font-bold text-sm rounded-xl shadow-lg shadow-primaryGreen/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isAuthLoading ? (
              <span className="w-5 h-5 border-2 border-bgDeep border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Portal' : 'Complete Registration'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-borderDark"></div>
          <span className="text-[11px] font-mono text-textMuted uppercase">or authenticate with Web3</span>
          <div className="flex-1 h-px bg-borderDark"></div>
        </div>

        {/* Web3 Instant Wallet Login */}
        <button
          type="button"
          onClick={handleWalletLogin}
          className="w-full py-2.5 px-4 bg-surface hover:bg-bgDeep border border-borderDark hover:border-verifiedBlue text-textPrimary font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Wallet size={18} className="text-verifiedBlue" />
          <span>Connect MetaMask / Web3 Wallet</span>
        </button>

        {/* Footer Security Note */}
        <div className="pt-2 text-center text-[11px] text-textMuted flex items-center justify-center gap-1">
          <ShieldCheck size={14} className="text-primaryGreen" />
          <span>Secured by Ethereum Smart Contracts & SHA-256 Auth</span>
        </div>

      </div>
    </div>
  );
};
