import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GeoMap } from '../components/GeoMap';
import { IPFSUploader } from '../components/IPFSUploader';
import { HerbAutocomplete } from '../components/HerbAutocomplete';
import { QRGenerator } from '../components/QRGenerator';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  FlaskConical,
  Boxes,
  QrCode,
  AlertTriangle,
  FileText,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  ShieldCheck,
  Search
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const DashboardPage = () => {
  const { role, batches, addBatch, farmers, updateFarmerStatus, showToast } = useApp();
  const [showLogModal, setShowLogModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showMfgModal, setShowMfgModal] = useState(false);
  const [selectedBatchForQR, setSelectedBatchForQR] = useState(null);

  // New Collection State
  const [newHerb, setNewHerb] = useState('Ashwagandha (Withania somnifera)');
  const [weight, setWeight] = useState('120 kg');
  const [method, setMethod] = useState('Wild Harvested');
  const [gpsLocation, setGpsLocation] = useState([21.1458, 79.0882]);
  const [ipfsDoc, setIpfsDoc] = useState('');

  // Lab Test State
  const [selectedLabBatchId, setSelectedLabBatchId] = useState('');
  const [heavyMetals, setHeavyMetals] = useState('Passed (<0.05 ppm)');
  const [pesticides, setPesticides] = useState('Undetected');
  const [alkaloidContent, setAlkaloidContent] = useState('5.2%');
  const [labCertHash, setLabCertHash] = useState('');

  // Formulation State
  const [mfgProductName, setMfgProductName] = useState('AyurImmune Herbal Booster Capsules');
  const [inputBatchId, setInputBatchId] = useState('BATCH-2024-001');

  const batchList = Object.values(batches);

  const handleCreateCollection = (e) => {
    e.preventDefault();
    const batchId = `BATCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newBatchData = {
      batchId,
      herb: newHerb,
      scientificName: newHerb.split('(')[1]?.replace(')', '') || 'Botanical Species',
      ayushReg: `AYUSH-IND-${Math.floor(10000 + Math.random() * 90000)}`,
      weight,
      collectionMethod: method,
      qualityScore: 97.5,
      status: 'Collected',
      isSuspicious: false,
      stages: [
        {
          stage: 'Collection',
          icon: 'Leaf',
          actor: 'Logged Farmer / Collector',
          wallet: '0x71C...39A2',
          location: 'Geo-Tagged Field Location',
          gps: gpsLocation,
          timestamp: new Date().toLocaleString(),
          txHash: '0x' + Math.random().toString(16).substring(2, 40),
          ipfs: ipfsDoc || 'QmCollectionPermitDefaultHash123',
          details: `Harvested via ${method}. Weight logged: ${weight}.`
        }
      ]
    };
    addBatch(newBatchData);
    setShowLogModal(false);
  };

  const handleLabSubmit = (e) => {
    e.preventDefault();
    if (!selectedLabBatchId) return;

    const targetBatch = batches[selectedLabBatchId];
    if (!targetBatch) return;

    const updatedStages = [
      ...targetBatch.stages,
      {
        stage: 'Quality Testing',
        icon: 'FlaskConical',
        actor: 'NABL Certified AyurLab',
        wallet: '0x89F...4C22',
        location: 'Mumbai NABL Lab',
        gps: [19.0760, 72.8777],
        timestamp: new Date().toLocaleString(),
        txHash: '0x' + Math.random().toString(16).substring(2, 40),
        ipfs: labCertHash || 'QmLabCertHashDefault9988',
        details: `Heavy Metals: ${heavyMetals}. Pesticides: ${pesticides}. Active Alkaloids: ${alkaloidContent}.`
      }
    ];

    addBatch({
      ...targetBatch,
      status: 'Lab Certified',
      qualityScore: 98.9,
      stages: updatedStages
    });

    setShowLabModal(false);
    showToast('Lab Results Signed!', `Batch ${selectedLabBatchId} passed quality checks and logged to Ethereum.`, 'success');
  };

  const handleMfgSubmit = (e) => {
    e.preventDefault();
    const targetBatch = batches[inputBatchId];
    if (!targetBatch) return;

    const outputBatchId = `FORM-${Math.floor(1000 + Math.random() * 9000)}`;

    const updatedStages = [
      ...targetBatch.stages,
      {
        stage: 'Manufacturing & Formulation',
        icon: 'Boxes',
        actor: 'Himalaya Wellness Co.',
        wallet: '0x12D...7E99',
        location: 'Bengaluru Facility',
        gps: [12.9716, 77.5946],
        timestamp: new Date().toLocaleString(),
        txHash: '0x' + Math.random().toString(16).substring(2, 40),
        ipfs: 'QmFormulationBatchDoc123',
        details: `Formulated into ${mfgProductName}. Input batch ${inputBatchId} sealed.`
      },
      {
        stage: 'Final Label',
        icon: 'CheckCircle2',
        actor: 'AYUSH Certification Node',
        wallet: '0x001...AYUSH',
        location: 'New Delhi',
        gps: [28.6139, 77.2090],
        timestamp: new Date().toLocaleString(),
        txHash: '0x' + Math.random().toString(16).substring(2, 40),
        ipfs: 'QmAyushStampFinal',
        details: 'Issued 100% Genuine Ayurvedic Product QR Code Seal.'
      }
    ];

    const finalBatch = {
      ...targetBatch,
      batchId: outputBatchId,
      herb: mfgProductName,
      status: 'Ready for Retail',
      stages: updatedStages
    };

    addBatch(finalBatch);
    setShowMfgModal(false);
    setSelectedBatchForQR(finalBatch);
    showToast('Formulation Generated!', `New retail batch ${outputBatchId} QR generated.`, 'success');
  };

  // Analytics mock data for Regulator
  const analyticsData = [
    { month: 'Jul', batches: 40, verified: 38 },
    { month: 'Aug', batches: 65, verified: 62 },
    { month: 'Sep', batches: 90, verified: 88 },
    { month: 'Oct', batches: 120, verified: 118 },
    { month: 'Nov', batches: 160, verified: 155 },
  ];

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary pb-20 pt-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title with Active Role */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-borderDark p-6 rounded-2xl shadow-xl">
          <div>
            <span className="text-xs uppercase font-bold text-primaryGreen tracking-wider">AyurChain Operations Control</span>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-textPrimary mt-0.5">
              {role} Portal Overview
            </h1>
            <p className="text-xs text-textMuted mt-1">
              Logged in view. Immutable ledger synced with Ethereum node.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {role === 'Farmer' && (
              <button
                onClick={() => setShowLogModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-90 text-bgDeep font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <PlusCircle size={16} />
                Log New Collection
              </button>
            )}

            {role === 'Lab' && (
              <button
                onClick={() => setShowLabModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-bgDeep font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <FlaskConical size={16} />
                Upload Lab Test
              </button>
            )}

            {role === 'Manufacturer' && (
              <button
                onClick={() => setShowMfgModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-accentGold to-amber-600 hover:opacity-90 text-bgDeep font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <Boxes size={16} />
                Create Formulation
              </button>
            )}
          </div>
        </div>

        {/* ROLE VIEW 1: FARMER */}
        {role === 'Farmer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map of Collection Zones */}
              <div className="lg:col-span-2 bg-surface border border-borderDark p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={16} className="text-primaryGreen" />
                    My Harvesting & Collection Zones
                  </h3>
                  <span className="text-xs text-textMuted font-mono">Live GPS Markers</span>
                </div>
                <GeoMap
                  markers={batchList.map(b => ({
                    gps: b.stages[0]?.gps || [21.1458, 79.0882],
                    stage: b.herb,
                    location: b.stages[0]?.location
                  }))}
                  height="300px"
                />
              </div>

              {/* Quick Stats & Sync */}
              <div className="bg-surface border border-borderDark p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider">Collection Stats</h3>
                  <div className="mt-4 space-y-3">
                    <div className="bg-bgDeep p-3 rounded-xl border border-borderDark flex justify-between items-center">
                      <span className="text-xs text-textMuted">Logged Batches</span>
                      <span className="text-lg font-bold text-primaryGreen font-mono">{batchList.length}</span>
                    </div>
                    <div className="bg-bgDeep p-3 rounded-xl border border-borderDark flex justify-between items-center">
                      <span className="text-xs text-textMuted">Total Volume</span>
                      <span className="text-lg font-bold text-accentGold font-mono">430 kg</span>
                    </div>
                    <div className="bg-bgDeep p-3 rounded-xl border border-borderDark flex justify-between items-center">
                      <span className="text-xs text-textMuted">Collector License</span>
                      <span className="text-xs text-verifiedBlue font-mono font-bold">AYUSH-MH-992</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-borderDark">
                  <Link to="/scan" className="w-full bg-surface border border-primaryGreen hover:bg-primaryGreen/10 text-primaryGreen font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <QrCode size={16} />
                    Open Mobile Batch Scanner
                  </Link>
                </div>
              </div>
            </div>

            {/* Batches Table */}
            <div className="bg-surface border border-borderDark rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider">Recent Farm Collection Batches</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-bgDeep text-textMuted uppercase font-mono border-b border-borderDark">
                    <tr>
                      <th className="p-3">Batch ID</th>
                      <th className="p-3">Herb Name</th>
                      <th className="p-3">Weight</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">GPS Location</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderDark/40">
                    {batchList.map(b => (
                      <tr key={b.batchId} className="hover:bg-bgDeep/40 transition-colors">
                        <td className="p-3 font-mono font-bold text-accentGold">{b.batchId}</td>
                        <td className="p-3 font-semibold text-textPrimary">{b.herb}</td>
                        <td className="p-3 text-textMuted">{b.weight || '100 kg'}</td>
                        <td className="p-3 text-textMuted font-mono">{b.stages[0]?.timestamp || '2024-11-01'}</td>
                        <td className="p-3 font-mono text-textMuted">{b.stages[0]?.location || 'Nagpur'}</td>
                        <td className="p-3">
                          <span className="bg-primaryGreen/10 text-primaryGreen border border-primaryGreen/30 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Link to={`/trace/${b.batchId}`} className="text-verifiedBlue hover:underline font-semibold text-xs">
                            View Trace →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ROLE VIEW 2: LAB */}
        {role === 'Lab' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batchList.map(b => (
                <div key={b.batchId} className="bg-surface border border-borderDark p-5 rounded-2xl space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accentGold font-bold">{b.batchId}</span>
                    <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                      NABL Testing Queue
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-textPrimary">{b.herb}</h3>
                  <p className="text-xs text-textMuted">Harvest Location: {b.stages[0]?.location}</p>

                  <div className="bg-bgDeep p-3 rounded-xl border border-borderDark text-xs font-mono space-y-1">
                    <p className="text-textMuted">Current Stages Verified: <span className="text-primaryGreen font-bold">{b.stages.length}/6</span></p>
                    <p className="text-textMuted">Latest Tx: <span className="text-verifiedBlue">{b.stages[b.stages.length - 1]?.txHash.substring(0, 14)}...</span></p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedLabBatchId(b.batchId);
                      setShowLabModal(true);
                    }}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-bgDeep font-bold text-xs py-2.5 rounded-xl transition-colors"
                  >
                    Submit Quality Certificate & Gas Sign
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROLE VIEW 3: MANUFACTURER */}
        {role === 'Manufacturer' && (
          <div className="space-y-6">
            {selectedBatchForQR && (
              <div className="mb-6">
                <QRGenerator batch={selectedBatchForQR} />
              </div>
            )}

            <div className="bg-surface border border-borderDark rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider">Lab Approved Batches Ready for Packaging</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batchList.map(b => (
                  <div key={b.batchId} className="bg-bgDeep p-4 rounded-xl border border-borderDark flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-accentGold font-bold">{b.batchId}</span>
                        <span className="text-[10px] bg-primaryGreen/10 text-primaryGreen border border-primaryGreen/30 px-2 py-0.5 rounded-full">
                          Quality Score: {b.qualityScore}%
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-textPrimary mt-1">{b.herb}</h4>
                    </div>

                    <div className="flex justify-between items-center border-t border-borderDark/60 pt-3">
                      <span className="text-xs text-textMuted">Final QR Label Ready</span>
                      <button
                        onClick={() => setSelectedBatchForQR(b)}
                        className="bg-surface border border-borderDark hover:border-primaryGreen text-textPrimary font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Generate QR Seal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROLE VIEW 4: CONSUMER */}
        {role === 'Consumer' && (
          <div className="bg-surface border border-borderDark p-8 rounded-2xl text-center max-w-xl mx-auto space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-primaryGreen/10 border border-primaryGreen/30 rounded-2xl flex items-center justify-center mx-auto text-primaryGreen">
              <QrCode size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-textPrimary">Consumer Product Trace</h2>
              <p className="text-xs text-textMuted mt-1">Scan the QR code on your Ayurvedic jar to view 100% verified harvest provenance.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Batch ID (e.g. BATCH-2024-001)"
                defaultValue="BATCH-2024-001"
                id="consumer-batch-input"
                className="w-full bg-bgDeep border border-borderDark rounded-xl px-4 py-2.5 text-xs font-mono text-textPrimary outline-none focus:border-primaryGreen"
              />
              <Link
                to={`/trace/${document.getElementById('consumer-batch-input')?.value || 'BATCH-2024-001'}`}
                className="bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-90 text-bgDeep font-bold text-xs px-5 py-2.5 rounded-xl whitespace-nowrap"
              >
                Verify Now
              </Link>
            </div>
          </div>
        )}

        {/* ROLE VIEW 5: REGULATOR */}
        {role === 'Regulator' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface border border-borderDark p-5 rounded-2xl">
                <span className="text-xs text-textMuted uppercase font-bold">Total Verified Batches</span>
                <p className="text-3xl font-bold text-primaryGreen font-mono mt-1">1,248</p>
                <span className="text-[10px] text-textMuted flex items-center gap-1 mt-2">
                  <TrendingUp size={12} className="text-primaryGreen" /> +14.2% from last month
                </span>
              </div>
              <div className="bg-surface border border-borderDark p-5 rounded-2xl">
                <span className="text-xs text-textMuted uppercase font-bold">Active Onboarded Collectors</span>
                <p className="text-3xl font-bold text-accentGold font-mono mt-1">452</p>
                <span className="text-[10px] text-textMuted mt-2 block">12 States covered</span>
              </div>
              <div className="bg-surface border border-borderDark p-5 rounded-2xl border-l-4 border-l-errorRed">
                <span className="text-xs text-errorRed uppercase font-bold flex items-center gap-1">
                  <AlertTriangle size={14} /> Fraud Alerts
                </span>
                <p className="text-3xl font-bold text-errorRed font-mono mt-1">1 Suspicious</p>
                <span className="text-[10px] text-textMuted mt-2 block">Physically impossible route detected</span>
              </div>
            </div>

            {/* Recharts Analytics */}
            <div className="bg-surface border border-borderDark p-5 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider">Ayurvedic Herbal Volume & Verification Trends</h3>
              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="colorBatches" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3FB950" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3FB950" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                    <XAxis dataKey="month" stroke="#8B949E" fontSize={11} />
                    <YAxis stroke="#8B949E" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#E6EDF3' }} />
                    <Area type="monotone" dataKey="batches" stroke="#3FB950" fillOpacity={1} fill="url(#colorBatches)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Flagged Batches Section */}
            <div className="bg-surface border border-errorRed/40 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-errorRed uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Flagged Suspicious Batches (Anomaly Detection)
                </h3>
              </div>

              {batchList.filter(b => b.isSuspicious).map(b => (
                <div key={b.batchId} className="bg-bgDeep p-4 rounded-xl border border-errorRed/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-errorRed font-bold">{b.batchId}</span>
                    <h4 className="text-base font-bold text-textPrimary">{b.herb}</h4>
                    <p className="text-xs text-textMuted mt-0.5">{b.suspiciousReason}</p>
                  </div>
                  <Link to={`/trace/${b.batchId}`} className="bg-errorRed/10 border border-errorRed/50 text-errorRed font-semibold text-xs px-4 py-2 rounded-lg hover:bg-errorRed/20 transition-colors">
                    Inspect Anomaly Trace →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: FARMER COLLECTION LOG */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-borderDark rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold font-display text-textPrimary">Log New Botanical Collection</h3>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Select Herb Species</label>
                <HerbAutocomplete value={newHerb} onChange={setNewHerb} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Harvest Weight</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none focus:border-primaryGreen"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Collection Method</label>
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none focus:border-primaryGreen"
                  >
                    <option value="Wild Harvested">Wild Harvested</option>
                    <option value="Cultivated Organic">Cultivated Organic</option>
                  </select>
                </div>
              </div>

              <IPFSUploader onUploadComplete={(hash) => setIpfsDoc(hash)} label="Collection Forest Permit (PDF)" />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="w-full bg-bgDeep border border-borderDark text-textMuted font-semibold text-xs py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-primaryGreen text-bgDeep font-bold text-xs py-2.5 rounded-xl hover:opacity-90"
                >
                  Sign & Commit to Chain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LAB TEST */}
      {showLabModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-borderDark rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold font-display text-textPrimary">Submit NABL Lab Quality Certificate</h3>
            <form onSubmit={handleLabSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Target Batch ID</label>
                <select
                  value={selectedLabBatchId}
                  onChange={e => setSelectedLabBatchId(e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none focus:border-primaryGreen"
                >
                  <option value="">-- Select Batch --</option>
                  {batchList.map(b => (
                    <option key={b.batchId} value={b.batchId}>{b.batchId} - {b.herb}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Heavy Metals</label>
                  <input
                    type="text"
                    value={heavyMetals}
                    onChange={e => setHeavyMetals(e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Pesticide Residue</label>
                  <input
                    type="text"
                    value={pesticides}
                    onChange={e => setPesticides(e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Active Alkaloid Content %</label>
                <input
                  type="text"
                  value={alkaloidContent}
                  onChange={e => setAlkaloidContent(e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none"
                />
              </div>

              <IPFSUploader onUploadComplete={(hash) => setLabCertHash(hash)} label="Upload NABL Test Certificate (PDF)" />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLabModal(false)}
                  className="w-full bg-bgDeep border border-borderDark text-textMuted font-semibold text-xs py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-bgDeep font-bold text-xs py-2.5 rounded-xl hover:opacity-90"
                >
                  Cryptographically Sign Lab Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: MANUFACTURER FORMULATION */}
      {showMfgModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-borderDark rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-textPrimary">Create Ayurvedic Product Formulation</h3>
            <form onSubmit={handleMfgSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Select Input Certified Batch</label>
                <select
                  value={inputBatchId}
                  onChange={e => setInputBatchId(e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none"
                >
                  {batchList.map(b => (
                    <option key={b.batchId} value={b.batchId}>{b.batchId} - {b.herb}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Final Retail Product Name</label>
                <input
                  type="text"
                  value={mfgProductName}
                  onChange={e => setMfgProductName(e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2 text-xs text-textPrimary outline-none focus:border-accentGold"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMfgModal(false)}
                  className="w-full bg-bgDeep border border-borderDark text-textMuted font-semibold text-xs py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-accentGold text-bgDeep font-bold text-xs py-2.5 rounded-xl hover:opacity-90"
                >
                  Generate QR & Mint Label
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
