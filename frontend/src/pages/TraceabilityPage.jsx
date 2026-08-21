import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HerbTimeline } from '../components/HerbTimeline';
import { QRGenerator } from '../components/QRGenerator';
import { ShieldCheck, AlertTriangle, ExternalLink, ArrowLeft, Leaf, Award, CheckCircle2 } from 'lucide-react';

export const TraceabilityPage = () => {
  const { batchId } = useParams();
  const { batches } = useApp();

  const batch = batches[batchId] || batches["BATCH-2024-001"];

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary pb-20 pt-6 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-xs text-textMuted hover:text-primaryGreen transition-colors">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <span className="flex items-center gap-1 text-xs font-mono text-verifiedBlue bg-verifiedBlue/10 border border-verifiedBlue/30 px-3 py-1 rounded-full">
            <ShieldCheck size={14} />
            Ethereum Contract Verified
          </span>
        </div>

        {/* Header Hero Banner */}
        <div className="bg-surface border border-borderDark rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primaryGreen/5 rounded-full blur-3xl pointer-events-none"></div>

          {batch.isSuspicious && (
            <div className="mb-6 bg-errorRed/10 border border-errorRed/50 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="text-errorRed flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-errorRed uppercase tracking-wider">⚠ Suspicious Supply Chain Route Flagged</h4>
                <p className="text-xs text-textMuted mt-1">{batch.suspiciousReason}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primaryGreen/10 text-primaryGreen border border-primaryGreen/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Leaf size={12} />
                  {batch.collectionMethod || "Wild Harvested"}
                </span>
                <span className="text-xs font-mono text-textMuted bg-bgDeep px-2.5 py-0.5 rounded border border-borderDark">
                  ID: {batch.batchId}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">{batch.herb}</h1>
              <p className="text-sm text-accentGold italic font-serif mt-1">{batch.scientificName || "Withania somnifera"}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-textMuted">
                <div>
                  <span className="text-textMuted block text-[10px] uppercase">AYUSH Registration</span>
                  <span className="text-textPrimary font-bold">{batch.ayushReg || "AYUSH-IND-2024-88492"}</span>
                </div>
                <div className="w-px h-8 bg-borderDark hidden sm:block"></div>
                <div>
                  <span className="text-textMuted block text-[10px] uppercase">Batch Weight</span>
                  <span className="text-textPrimary font-bold">{batch.weight || "150 kg"}</span>
                </div>
                <div className="w-px h-8 bg-borderDark hidden sm:block"></div>
                <div>
                  <span className="text-textMuted block text-[10px] uppercase">Quality Score</span>
                  <span className="text-primaryGreen font-bold flex items-center gap-1">
                    <Award size={13} />
                    {batch.qualityScore || 98.4}%
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Badge Header */}
            <div className="flex flex-col items-center justify-center bg-bgDeep/80 border border-primaryGreen/40 p-4 rounded-2xl text-center min-w-[180px]">
              <CheckCircle2 size={36} className="text-primaryGreen mb-1 animate-pulse" />
              <span className="text-xs font-bold text-primaryGreen tracking-wider uppercase">Authentic Herbalist Seal</span>
              <span className="text-[10px] text-textMuted mt-0.5">Immutable Ledger Entry</span>
            </div>
          </div>
        </div>

        {/* Chain of Custody Timeline Title */}
        <div className="text-center pt-4">
          <h2 className="text-2xl font-bold font-display text-textPrimary">Immutable 6-Stage Supply Chain Timeline</h2>
          <p className="text-xs text-textMuted mt-1">Geo-tagged GPS coordinates, timestamped wallet signatures & NABL lab certificates</p>
        </div>

        {/* Vertical Timeline */}
        <HerbTimeline batch={batch} />

        {/* QR Code Printable Product Label Component */}
        <div className="pt-8">
          <QRGenerator batch={batch} />
        </div>

        {/* Bottom Blockchain Badge */}
        <div className="bg-surface border border-borderDark rounded-2xl p-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-verifiedBlue">
            <ShieldCheck size={18} />
            <span>Verified on Ethereum Mainnet — Smart Contract #0x92A...8F10</span>
          </div>
          <p className="text-[11px] text-textMuted max-w-xl mx-auto">
            AyurChain leverages cryptographic hashing and distributed consensus to ensure that every gram of herb is zero-adulteration and ethically harvested.
          </p>
        </div>

      </div>
    </div>
  );
};
