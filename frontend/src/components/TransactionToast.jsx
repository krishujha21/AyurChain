import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, ExternalLink, X } from 'lucide-react';

export const TransactionToast = () => {
  const { txToast } = useApp();

  if (!txToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-surface border border-primaryGreen/50 p-4 rounded-2xl shadow-2xl backdrop-blur-lg animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        {txToast.type === 'error' ? (
          <AlertCircle className="text-errorRed flex-shrink-0 mt-0.5" size={20} />
        ) : (
          <CheckCircle2 className="text-primaryGreen flex-shrink-0 mt-0.5" size={20} />
        )}

        <div className="flex-1">
          <h5 className="text-xs font-bold text-textPrimary uppercase tracking-wider">{txToast.title}</h5>
          <p className="text-xs text-textMuted mt-0.5">{txToast.message}</p>

          {txToast.txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${txToast.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-verifiedBlue hover:underline"
            >
              <ExternalLink size={12} />
              View Tx on Sepolia Etherscan
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
