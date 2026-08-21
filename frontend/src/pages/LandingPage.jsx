import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Leaf, QrCode, ArrowRight, Award, Lock, Sparkles, CheckCircle2, MapPin, Layers } from 'lucide-react';

export const LandingPage = () => {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary relative overflow-hidden">
      
      {/* Background Animated Botanical SVG Particle Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="botanical-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 10 Q45 25 30 40 Q15 25 30 10 Z" fill="none" stroke="#3FB950" strokeWidth="1" />
              <circle cx="30" cy="25" r="2" fill="#F0A500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#botanical-pattern)" />
        </svg>
      </div>

      {/* Hero Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primaryGreen/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center space-y-8">
        
        {/* AYUSH Trust Badge Pill */}
        <div className="inline-flex items-center gap-2 bg-surface/80 border border-borderDark px-4 py-1.5 rounded-full text-xs font-mono text-accentGold backdrop-blur-md shadow-lg animate-fade-in">
          <ShieldCheck size={16} className="text-primaryGreen" />
          <span>AYUSH Ministry Standardized & SIH Prototype Submission</span>
          <span className="w-2 h-2 rounded-full bg-primaryGreen animate-ping"></span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-textPrimary leading-tight max-w-4xl mx-auto">
          From Forest to Formulation <br />
          <span className="bg-gradient-to-r from-primaryGreen via-emerald-400 to-accentGold bg-clip-text text-transparent">
            Every Herb Traced, Every Step Verified
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-textMuted max-w-2xl mx-auto leading-relaxed font-sans">
          {t('heroSub')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/trace/BATCH-2024-001"
            className="flex items-center gap-2 bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-90 text-bgDeep font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-primaryGreen/20 transition-all hover:scale-105"
          >
            <QrCode size={18} />
            <span>{t('scanCta')}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 bg-surface hover:bg-borderDark/50 border border-borderDark text-textPrimary font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all"
          >
            <Leaf size={18} className="text-primaryGreen" />
            <span>{t('registerCta')}</span>
          </Link>
        </div>

        {/* Live Stat Counter Bar */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-surface/60 backdrop-blur-md border border-borderDark p-5 rounded-2xl">
            <span className="text-3xl font-bold font-mono text-primaryGreen">12,450+</span>
            <p className="text-xs text-textMuted mt-1 font-medium">{t('herbsTracked')}</p>
          </div>
          <div className="bg-surface/60 backdrop-blur-md border border-borderDark p-5 rounded-2xl">
            <span className="text-3xl font-bold font-mono text-accentGold">1,820+</span>
            <p className="text-xs text-textMuted mt-1 font-medium">{t('farmersOnboarded')}</p>
          </div>
          <div className="bg-surface/60 backdrop-blur-md border border-borderDark p-5 rounded-2xl">
            <span className="text-3xl font-bold font-mono text-verifiedBlue">99.8%</span>
            <p className="text-xs text-textMuted mt-1 font-medium">{t('batchesVerified')}</p>
          </div>
        </div>

      </section>

      {/* How It Works Timeline Section */}
      <section className="py-16 px-4 md:px-8 bg-surface/40 border-y border-borderDark relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase text-primaryGreen tracking-widest">End-to-End Blockchain Custody</span>
            <h2 className="text-3xl font-bold font-display text-textPrimary">How AyurChain Works</h2>
            <p className="text-xs text-textMuted max-w-lg mx-auto">Six immutable checkpoints ensuring 0% adulteration & complete authenticity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "01", title: "Geo-Tag Harvest", desc: "Farmer logs location & GPS coordinates at collection point.", icon: MapPin },
              { step: "02", title: "Permit Verification", desc: "Forest license verified on-chain via smart contract.", icon: ShieldCheck },
              { step: "03", title: "Primary Drying", desc: "Moisture & weight logged at processing unit.", icon: Layers },
              { step: "04", title: "NABL Lab Test", desc: "Pesticide & alkaloid testing certificate pinned to IPFS.", icon: Award },
              { step: "05", title: "Formulation", desc: "Manufacturer seals inputs into retail Ayurvedic product.", icon: Lock },
              { step: "06", title: "QR Label Scan", desc: "Consumer scans QR code to verify entire Ethereum trace.", icon: QrCode },
            ].map((s, idx) => (
              <div key={idx} className="bg-surface border border-borderDark p-4 rounded-2xl space-y-2 hover:border-primaryGreen/50 transition-all group">
                <span className="text-xs font-mono font-bold text-accentGold">{s.step}</span>
                <s.icon size={20} className="text-primaryGreen group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-textPrimary">{s.title}</h4>
                <p className="text-[11px] text-textMuted leading-normal">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust & Government Badges Placeholder */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-surface border border-borderDark rounded-2xl p-6 flex flex-wrap items-center justify-around gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primaryGreen" size={24} />
            <span className="text-xs font-bold text-textPrimary uppercase tracking-wider">AYUSH Ministry Standardized</span>
          </div>
          <div className="w-px h-6 bg-borderDark hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-accentGold" size={24} />
            <span className="text-xs font-bold text-textPrimary uppercase tracking-wider">Smart India Hackathon Prototype</span>
          </div>
          <div className="w-px h-6 bg-borderDark hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-verifiedBlue" size={24} />
            <span className="text-xs font-bold text-textPrimary uppercase tracking-wider">Ethereum Mainnet Ledger</span>
          </div>
        </div>
      </section>

    </div>
  );
};
