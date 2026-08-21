import React from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, CheckCircle2, ShieldCheck, ChevronDown } from 'lucide-react';

export const WalletConnector = () => {
  const { account, connectWallet, disconnectWallet } = useApp();

  if (account) {
    return (
      <div className="flex items-center gap-2 bg-surface border border-borderDark px-3 py-1.5 rounded-lg shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-primaryGreen animate-pulse"></div>
        <span className="font-mono text-xs text-textPrimary">
          {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </span>
        <button
          onClick={disconnectWallet}
          className="text-xs text-textMuted hover:text-errorRed ml-1 transition-colors"
          title="Disconnect Wallet"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="flex items-center gap-2 bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-90 text-bgDeep font-semibold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md shadow-primaryGreen/10"
    >
      <Wallet size={15} />
      <span>Connect MetaMask</span>
    </button>
  );
};

export const RoleSelector = () => {
  const { role, setRole, t } = useApp();

  const roles = [
    { name: 'Farmer', icon: '🌾' },
    { name: 'Lab', icon: '🧪' },
    { name: 'Manufacturer', icon: '🏭' },
    { name: 'Consumer', icon: '🔍' },
    { name: 'Regulator', icon: '⚖️' },
  ];

  return (
    <div className="relative group inline-block">
      <div className="flex items-center gap-2 bg-surface border border-borderDark px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:border-primaryGreen/50 transition-colors">
        <span className="text-textMuted">{t('selectRole')}:</span>
        <span className="text-accentGold font-bold flex items-center gap-1">
          {roles.find(r => r.name === role)?.icon} {role}
        </span>
        <ChevronDown size={14} className="text-textMuted" />
      </div>
      <div className="absolute right-0 top-full mt-1 w-44 bg-surface border border-borderDark rounded-xl shadow-xl z-50 hidden group-hover:block p-1">
        {roles.map(r => (
          <button
            key={r.name}
            onClick={() => setRole(r.name)}
            className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center gap-2 transition-colors ${
              role === r.name ? 'bg-primaryGreen/10 text-primaryGreen font-semibold' : 'text-textPrimary hover:bg-borderDark/40'
            }`}
          >
            <span>{r.icon}</span>
            <span>{r.name} View</span>
          </button>
        ))}
      </div>
    </div>
  );
};
