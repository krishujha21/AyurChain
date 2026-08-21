import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Download, Printer, CheckCircle } from 'lucide-react';

export const QRGenerator = ({ batch }) => {
  const [downloaded, setDownloaded] = useState(false);
  const traceUrl = `${window.location.origin}/trace/${batch.batchId}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-surface border border-borderDark rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primaryGreen/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Printable Label Preview Box */}
        <div id="printable-label" className="bg-white text-slate-900 p-5 rounded-xl border-2 border-emerald-600 shadow-md w-full md:w-72 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-emerald-800 font-extrabold text-xs tracking-wider uppercase mb-1">
            <ShieldCheck size={16} className="text-emerald-600" />
            AYUSH Verified Botanical
          </div>
          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{batch.herb}</h4>
          <p className="text-[10px] text-slate-500 italic mb-3">{batch.scientificName || "Authenticated Species"}</p>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 shadow-inner my-1">
            <QRCodeSVG
              value={traceUrl}
              size={120}
              bgColor="#ffffff"
              fgColor="#0d1117"
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="mt-3 font-mono text-[10px] bg-slate-100 px-2 py-1 rounded border border-slate-300 w-full text-slate-700">
            Batch: {batch.batchId}
          </div>
          <p className="text-[9px] text-slate-500 mt-1 font-mono">Scan QR for Sepolia Blockchain Certificate</p>
        </div>

        {/* Action Controls */}
        <div className="flex-1 space-y-4">
          <div>
            <span className="text-xs uppercase font-semibold text-primaryGreen tracking-wider">Product Seal & Packaging</span>
            <h3 className="text-xl font-bold text-textPrimary font-display mt-0.5">Blockchain QR Label Generated</h3>
            <p className="text-xs text-textMuted mt-1">
              Affix this label to final Ayurvedic formulation packages. Consumers can scan to view the complete 6-stage chain of custody on Ethereum.
            </p>
          </div>

          <div className="bg-bgDeep p-3 rounded-lg border border-borderDark font-mono text-xs text-textMuted flex items-center justify-between">
            <span className="truncate max-w-[220px]">{traceUrl}</span>
            <span className="text-[10px] text-verifiedBlue bg-verifiedBlue/10 px-2 py-0.5 rounded">Sepolia Testnet</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-90 text-bgDeep font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg"
            >
              <Printer size={15} />
              Print Label Sticker
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(traceUrl);
                setDownloaded(true);
                setTimeout(() => setDownloaded(false), 3000);
              }}
              className="flex items-center gap-2 bg-surface border border-borderDark hover:border-primaryGreen text-textPrimary font-medium text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              {downloaded ? <CheckCircle size={15} className="text-primaryGreen" /> : <Download size={15} />}
              {downloaded ? 'Link Copied!' : 'Copy Verification URL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
