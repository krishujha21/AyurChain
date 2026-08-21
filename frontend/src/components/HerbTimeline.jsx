import React from 'react';
import { Leaf, Factory, FlaskConical, Boxes, PackageCheck, CheckCircle2, AlertTriangle, ExternalLink, MapPin, FileCheck, ShieldCheck } from 'lucide-react';
import { GeoMap } from './GeoMap';

const getStageIcon = (iconName) => {
  switch (iconName) {
    case 'Leaf': return <Leaf className="text-primaryGreen" size={20} />;
    case 'Factory': return <Factory className="text-accentGold" size={20} />;
    case 'FlaskConical': return <FlaskConical className="text-cyan-400" size={20} />;
    case 'Boxes': return <Boxes className="text-purple-400" size={20} />;
    case 'PackageCheck': return <PackageCheck className="text-amber-400" size={20} />;
    case 'CheckCircle2': return <CheckCircle2 className="text-verifiedBlue" size={20} />;
    case 'AlertTriangle': return <AlertTriangle className="text-errorRed animate-bounce" size={20} />;
    default: return <Leaf className="text-primaryGreen" size={20} />;
  }
};

export const HerbTimeline = ({ batch }) => {
  if (!batch || !batch.stages) return null;

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 before:md:left-1/2 before:-ml-px before:w-0.5 before:bg-gradient-to-b before:from-primaryGreen/80 before:via-accentGold/50 before:to-verifiedBlue/80">
      {batch.stages.map((stage, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div key={idx} className="relative flex items-center md:justify-between group">
            {/* Timeline node icon center */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-surface border-2 border-borderDark flex items-center justify-center shadow-lg group-hover:border-primaryGreen group-hover:scale-110 transition-all z-10">
              {getStageIcon(stage.icon)}
            </div>

            {/* Left side card (desktop) / full width on mobile */}
            <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-8 md:text-right' : 'md:col-start-2 md:pl-8 md:ml-auto'}`}>
              <div className={`bg-surface/90 backdrop-blur-md border ${batch.isSuspicious && idx === batch.stages.length - 1 ? 'border-errorRed/80 shadow-errorRed/10' : 'border-borderDark hover:border-primaryGreen/50'} p-5 rounded-2xl shadow-xl transition-all`}>
                <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                  <span className="bg-primaryGreen/10 text-primaryGreen border border-primaryGreen/30 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
                    Stage {idx + 1}
                  </span>
                  <span className="text-xs text-textMuted font-mono">{stage.timestamp}</span>
                </div>

                <h4 className="text-lg font-bold text-textPrimary flex items-center gap-2 font-display">
                  <span>{stage.stage}</span>
                  <ShieldCheck size={16} className="text-verifiedBlue inline" />
                </h4>

                <p className="text-xs text-accentGold font-medium mt-1">
                  Actor: <span className="text-textPrimary">{stage.actor}</span>
                </p>

                {stage.details && (
                  <p className="text-xs text-textMuted mt-2 bg-bgDeep/50 p-2.5 rounded-lg border border-borderDark/40">
                    {stage.details}
                  </p>
                )}

                {/* Metadata badges */}
                <div className={`mt-3 flex flex-wrap gap-2 text-xs font-mono ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                  {stage.location && (
                    <span className="flex items-center gap-1 bg-bgDeep border border-borderDark px-2.5 py-1 rounded-md text-textMuted">
                      <MapPin size={12} className="text-primaryGreen" />
                      {stage.location}
                    </span>
                  )}

                  {stage.wallet && (
                    <span className="flex items-center gap-1 bg-bgDeep border border-borderDark px-2.5 py-1 rounded-md text-textMuted">
                      <span className="text-verifiedBlue font-bold">ETH</span> {stage.wallet}
                    </span>
                  )}
                </div>

                {/* Blockchain Links */}
                <div className={`mt-3 pt-3 border-t border-borderDark/50 flex flex-wrap items-center gap-3 text-xs ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                  {stage.txHash && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${stage.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-verifiedBlue hover:underline font-mono text-[11px]"
                    >
                      <ExternalLink size={12} />
                      Tx: {stage.txHash.substring(0, 10)}...
                    </a>
                  )}

                  {stage.ipfs && (
                    <a
                      href={`https://ipfs.io/ipfs/${stage.ipfs}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-accentGold hover:underline font-mono text-[11px]"
                    >
                      <FileCheck size={12} />
                      IPFS Doc
                    </a>
                  )}
                </div>

                {/* Embedded Mini Map for each stage */}
                <div className="mt-4 rounded-lg overflow-hidden border border-borderDark/60">
                  <GeoMap markers={[{ gps: stage.gps, stage: stage.stage, location: stage.location }]} height="140px" zoom={9} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
