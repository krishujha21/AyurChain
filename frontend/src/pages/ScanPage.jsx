import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HerbAutocomplete } from '../components/HerbAutocomplete';
import { IPFSUploader } from '../components/IPFSUploader';
import { GeoMap } from '../components/GeoMap';
import { FeatureLockBanner } from '../components/FeatureLockBanner';
import { useNavigate, Link } from 'react-router-dom';
import { QrCode, MapPin, Wifi, WifiOff, ShieldCheck, Lock, LogIn } from 'lucide-react';

export const ScanPage = () => {
  const { addBatch, saveOfflineBatch, offlineQueue, syncOfflineBatches, isAuthenticated, user } = useApp();
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [herb, setHerb] = useState('Ashwagandha (Withania somnifera)');
  const [weight, setWeight] = useState('150 kg');
  const [method, setMethod] = useState('Wild Harvested');
  const [gps, setGps] = useState([21.1458, 79.0882]);
  const [locationName] = useState('Nagpur Forest Range 4B');
  const [ipfsHash, setIpfsHash] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Browser Geolocation capture
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGps([pos.coords.latitude, pos.coords.longitude]),
        () => console.log('Geolocation permission fallback used')
      );
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubmitBatch = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const batchId = `BATCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBatch = {
      batchId,
      herb,
      scientificName: herb.split('(')[1]?.replace(')', '') || 'Botanical Species',
      ayushReg: `AYUSH-IND-${Math.floor(10000 + Math.random() * 90000)}`,
      weight,
      collectionMethod: method,
      qualityScore: 98.2,
      status: isOnline ? 'Collected & Verified' : 'Stored Offline',
      isSuspicious: false,
      stages: [
        {
          stage: 'Collection',
          icon: 'Leaf',
          actor: user?.name || 'Logged Collector',
          wallet: user?.walletAddress || '0x71C...39A2',
          location: locationName,
          gps: gps,
          timestamp: new Date().toLocaleString(),
          txHash: isOnline ? '0x' + Math.random().toString(16).substring(2, 40) : 'Pending Sync',
          ipfs: ipfsHash || 'QmHarvestPermitSimulatedHash123',
          details: `Logged via ${method}. GPS Auto-captured.`
        }
      ]
    };

    if (isOnline) {
      addBatch(newBatch);
      navigate(`/trace/${batchId}`);
    } else {
      saveOfflineBatch(newBatch);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Unauthenticated Preview Banner */}
        {!isAuthenticated && (
          <FeatureLockBanner
            title="Mobile Batch Logging Terminal (Preview Mode)"
            description="You are currently previewing the mobile harvesting registration terminal with live GPS geolocation auto-capture. Sign in to officially log and sign new botanical batches on the blockchain."
            actionName="Sign In to Log Batches"
          />
        )}

        {/* Network Connectivity Status Bar */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-lg ${
          isOnline ? 'bg-primaryGreen/10 border-primaryGreen/30 text-primaryGreen' : 'bg-accentGold/10 border-accentGold/40 text-accentGold'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold font-mono">
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span>{isOnline ? 'ONLINE: Direct Ethereum Contract Broadcast' : 'OFFLINE MODE: Local Cache Active'}</span>
          </div>

          {!isOnline && (
            <button
              onClick={syncOfflineBatches}
              className="bg-accentGold text-bgDeep font-bold text-xs px-3 py-1.5 rounded-lg"
            >
              Sync {offlineQueue.length} Batches
            </button>
          )}
        </div>

        {/* Main Batch Form */}
        <div className="bg-surface border border-borderDark rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-primaryGreen tracking-wider">Mobile Logger</span>
              <h1 className="text-2xl font-bold font-display text-textPrimary">Log Botanical Collection Batch</h1>
            </div>

            {/* QR Camera Simulation Toggle */}
            <button
              type="button"
              onClick={() => setCameraActive(!cameraActive)}
              className="flex items-center gap-1.5 bg-bgDeep border border-borderDark hover:border-primaryGreen text-textPrimary text-xs px-3 py-2 rounded-xl transition-colors"
            >
              <QrCode size={16} className="text-accentGold" />
              {cameraActive ? 'Close Camera' : 'Simulate Camera QR Scan'}
            </button>
          </div>

          {/* Camera Viewfinder Simulation */}
          {cameraActive && (
            <div className="bg-black border-2 border-dashed border-primaryGreen rounded-2xl p-8 text-center space-y-3 relative overflow-hidden animate-pulse">
              <div className="w-40 h-40 border-2 border-primaryGreen rounded-xl mx-auto flex items-center justify-center text-primaryGreen">
                <QrCode size={48} />
              </div>
              <p className="text-xs text-primaryGreen font-mono">Scanning Field Label QR Code...</p>
              <button
                type="button"
                onClick={() => setCameraActive(false)}
                className="bg-primaryGreen text-bgDeep font-bold text-xs px-4 py-1.5 rounded-lg"
              >
                Simulate QR Code Match (Ashwagandha BATCH-99)
              </button>
            </div>
          )}

          <form onSubmit={handleSubmitBatch} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Herb Species</label>
              <HerbAutocomplete value={herb} onChange={setHerb} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Batch Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2.5 text-xs text-textPrimary outline-none focus:border-primaryGreen"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Harvest Type</label>
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-3 py-2.5 text-xs text-textPrimary outline-none"
                >
                  <option value="Wild Harvested">Wild Harvested</option>
                  <option value="Cultivated Organic">Cultivated Organic</option>
                </select>
              </div>
            </div>

            {/* GPS Auto-Capture Field & Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-textMuted uppercase block">Auto-Captured GPS Coordinates</label>
                <span className="text-[10px] font-mono text-primaryGreen flex items-center gap-1">
                  <MapPin size={12} /> [{gps[0].toFixed(4)}, {gps[1].toFixed(4)}]
                </span>
              </div>
              <GeoMap center={gps} markers={[{ gps, title: "Harvest Point" }]} height="160px" zoom={10} />
            </div>

            <IPFSUploader onUploadComplete={(hash) => setIpfsHash(hash)} label="Upload Harvest Photo / Field Receipt" />

            {isAuthenticated ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primaryGreen to-emerald-600 hover:opacity-90 text-bgDeep font-bold text-sm py-3.5 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} />
                <span>{isOnline ? 'Broadcast Batch to Ethereum Smart Contract' : 'Store Batch Local Queue (Sync Later)'}</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full bg-surface border border-accentGold hover:bg-bgDeep text-accentGold font-bold text-sm py-3.5 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Lock size={18} />
                <span>Sign In to Broadcast Batches on Ethereum</span>
              </Link>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};
