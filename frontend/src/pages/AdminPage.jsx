import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, FileSpreadsheet, ExternalLink } from 'lucide-react';

export const AdminPage = () => {
  const { farmers, updateFarmerStatus, batches, showToast } = useApp();
  const batchList = Object.values(batches);

  const handleExportReport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(batchList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "AYUSH_AyurChain_SupplyChain_Audit_Report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Report Exported!', 'Downloaded complete compliance audit log as JSON', 'success');
  };

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-borderDark p-6 rounded-2xl shadow-xl">
          <div>
            <span className="text-xs uppercase font-bold text-accentGold tracking-wider">Government Regulatory Node</span>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-textPrimary mt-0.5">AYUSH Ministry Oversight Portal</h1>
            <p className="text-xs text-textMuted mt-1">Approve registrations, audit supply chain integrity, and handle fraud flags.</p>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-gradient-to-r from-accentGold to-amber-600 hover:opacity-90 text-bgDeep font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <FileSpreadsheet size={16} />
            Export Compliance Audit Report
          </button>
        </div>

        {/* Farmer Registrations Approval Table */}
        <div className="bg-surface border border-borderDark rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck size={16} className="text-primaryGreen" />
            Pending Farmer & Collector License Approvals
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-bgDeep text-textMuted uppercase font-mono border-b border-borderDark">
                <tr>
                  <th className="p-3">Farmer ID</th>
                  <th className="p-3">Collector Name</th>
                  <th className="p-3">State & District</th>
                  <th className="p-3">Primary Herb</th>
                  <th className="p-3">Wallet Address</th>
                  <th className="p-3">Verification Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderDark/40">
                {farmers.map(f => (
                  <tr key={f.id} className="hover:bg-bgDeep/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-accentGold">{f.id}</td>
                    <td className="p-3 font-semibold text-textPrimary">{f.name}</td>
                    <td className="p-3 text-textMuted">{f.state}, {f.district}</td>
                    <td className="p-3 font-medium text-primaryGreen">{f.herb}</td>
                    <td className="p-3 font-mono text-textMuted">{f.wallet}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        f.status === 'Approved' ? 'bg-primaryGreen/10 text-primaryGreen border border-primaryGreen/30' : 'bg-accentGold/10 text-accentGold border border-accentGold/30'
                      }`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {f.status !== 'Approved' && (
                        <button
                          onClick={() => updateFarmerStatus(f.id, 'Approved')}
                          className="bg-primaryGreen/10 text-primaryGreen hover:bg-primaryGreen/20 px-2.5 py-1 rounded-md text-[11px] font-bold border border-primaryGreen/30 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {f.status !== 'Rejected' && (
                        <button
                          onClick={() => updateFarmerStatus(f.id, 'Rejected')}
                          className="bg-errorRed/10 text-errorRed hover:bg-errorRed/20 px-2.5 py-1 rounded-md text-[11px] font-bold border border-errorRed/30 transition-colors"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flagged Batches Section */}
        <div className="bg-surface border border-errorRed/40 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-errorRed uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={16} />
            Supply Chain Anomaly & Flagged Batch Inspections
          </h3>

          <div className="space-y-3">
            {batchList.filter(b => b.isSuspicious).map(b => (
              <div key={b.batchId} className="bg-bgDeep p-4 rounded-xl border border-errorRed/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-errorRed">{b.batchId}</span>
                    <span className="text-[10px] bg-errorRed/20 text-errorRed px-2 py-0.5 rounded uppercase font-bold">Suspicious Route</span>
                  </div>
                  <h4 className="text-sm font-bold text-textPrimary mt-1">{b.herb}</h4>
                  <p className="text-xs text-textMuted mt-0.5">{b.suspiciousReason}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => showToast('Batch Revoked!', `Batch ${b.batchId} blacklisted on smart contract`, 'error')}
                    className="bg-errorRed text-bgDeep font-bold text-xs px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Blacklist Batch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
