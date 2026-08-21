import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogIn, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeatureLockBanner = ({ 
  title = "Authentication Required for Full Access",
  description = "You are currently viewing this portal in public preview mode. Sign in to your verified stakeholder account to log new batches, modify records, sign lab certificates, and execute blockchain transactions.",
  actionName = "Sign In / Register"
}) => {
  const { setRole } = useApp();

  return (
    <div className="bg-gradient-to-r from-surface via-bgDeep to-surface border border-accentGold/40 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accentGold/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primaryGreen/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
        
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accentGold/15 border border-accentGold/30 flex items-center justify-center text-accentGold flex-shrink-0 shadow-lg">
            <Lock size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-accentGold/20 text-accentGold px-2 py-0.5 rounded border border-accentGold/30">
                🔒 Preview Mode
              </span>
              <span className="text-xs text-textMuted font-mono hidden sm:inline">Read-Only Demonstration</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display text-textPrimary mt-1">
              {title}
            </h3>
            <p className="text-xs text-textMuted max-w-2xl mt-0.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-95 text-bgDeep font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-primaryGreen/20 transition-all hover:scale-105"
          >
            <LogIn size={15} />
            <span>{actionName}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

    </div>
  );
};
