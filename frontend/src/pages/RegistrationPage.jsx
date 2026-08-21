import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HerbAutocomplete } from '../components/HerbAutocomplete';
import { IPFSUploader } from '../components/IPFSUploader';
import { GeoMap } from '../components/GeoMap';
import { FeatureLockBanner } from '../components/FeatureLockBanner';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, User, MapPin, Leaf, FileText, Wallet, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

export const RegistrationPage = () => {
  const { addFarmerRegistration, account, connectWallet, isAuthenticated } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    state: 'Maharashtra',
    district: 'Nagpur',
    zoneName: 'Central Reserve Forest Zone 4',
    herbs: ['Ashwagandha (Withania somnifera)'],
    licenseHash: '',
  });

  const updateField = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFarmerRegistration(formData);
    navigate('/dashboard');
  };

  const stepsList = [
    { num: 1, name: "Personal Details", icon: User },
    { num: 2, name: "Collection Zone", icon: MapPin },
    { num: 3, name: "Herbs Harvested", icon: Leaf },
    { num: 4, name: "Forest License", icon: FileText },
    { num: 5, name: "Wallet Onboarding", icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-bgDeep text-textPrimary py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold text-primaryGreen tracking-widest">Farmer & Wild Collector Portal</span>
          <h1 className="text-3xl font-bold font-display text-textPrimary">5-Step Herbalist Onboarding</h1>
          <p className="text-xs text-textMuted max-w-md mx-auto">Register your harvest zones on Ethereum for AYUSH authenticity certification.</p>
        </div>

        {/* Feature Lock Banner if unauthenticated */}
        {!isAuthenticated && (
          <FeatureLockBanner
            title="Herbalist Onboarding Wizard (Preview Mode)"
            description="You are currently previewing the 5-step registration process. Sign in to your account or connect your wallet to officially submit your botanical harvest credentials for regulatory approval."
            actionName="Sign In to Register Zone"
          />
        )}

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between bg-surface border border-borderDark p-4 rounded-2xl">
          {stepsList.map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num
                  ? 'bg-primaryGreen text-bgDeep font-bold ring-4 ring-primaryGreen/20'
                  : step > s.num
                  ? 'bg-verifiedBlue text-bgDeep'
                  : 'bg-bgDeep text-textMuted border border-borderDark'
              }`}>
                {step > s.num ? <CheckCircle2 size={16} /> : <s.icon size={16} />}
              </div>
              <span className="text-[10px] text-textMuted hidden sm:block">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-surface border border-borderDark rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-textPrimary font-display">Step 1: Personal & Geographic Details</h3>
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-4 py-2.5 text-xs text-textPrimary outline-none focus:border-primaryGreen"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Aadhar Last 4 Digits</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="9928"
                    value={formData.aadhar}
                    onChange={e => updateField('aadhar', e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark rounded-xl px-4 py-2.5 text-xs font-mono text-textPrimary outline-none focus:border-primaryGreen"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-textMuted uppercase block mb-1">State</label>
                  <select
                    value={formData.state}
                    onChange={e => updateField('state', e.target.value)}
                    className="w-full bg-bgDeep border border-borderDark rounded-xl px-4 py-2.5 text-xs text-textPrimary outline-none"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Collection Zone & Map */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-textPrimary font-display">Step 2: Farm & Wild Collection Zone</h3>
              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Zone Name / Land Survey #</label>
                <input
                  type="text"
                  value={formData.zoneName}
                  onChange={e => updateField('zoneName', e.target.value)}
                  className="w-full bg-bgDeep border border-borderDark rounded-xl px-4 py-2.5 text-xs text-textPrimary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-2">Mark Collection Radius on Map</label>
                <GeoMap center={[21.1458, 79.0882]} zoom={6} height="220px" markers={[{ gps: [21.1458, 79.0882], title: "Registered Farm Boundary" }]} />
              </div>
            </div>
          )}

          {/* STEP 3: Herbs */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-textPrimary font-display">Step 3: Target Ayurvedic Herbs Collected</h3>
              <p className="text-xs text-textMuted">Select primary botanical species you harvest in this zone.</p>

              <div>
                <label className="text-xs font-semibold text-textMuted uppercase block mb-1">Primary Botanical Species</label>
                <HerbAutocomplete
                  value={formData.herbs[0]}
                  onChange={val => updateField('herbs', [val])}
                  placeholder="Select herb from 50+ list..."
                />
              </div>
            </div>
          )}

          {/* STEP 4: License Upload */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-textPrimary font-display">Step 4: Forest Department Collection Permit</h3>
              <p className="text-xs text-textMuted">Upload government wild harvesting permit or organic farm certificate for IPFS verification.</p>

              <IPFSUploader
                onUploadComplete={(hash) => updateField('licenseHash', hash)}
                label="Permit Certificate (PDF/Image)"
              />
            </div>
          )}

          {/* STEP 5: Wallet Connect & Submit */}
          {step === 5 && (
            <div className="space-y-6 text-center">
              <h3 className="text-base font-bold text-textPrimary font-display">Step 5: Blockchain Wallet Signature</h3>
              <p className="text-xs text-textMuted">Link your Web3 wallet address to sign collection transactions.</p>

              <div className="bg-bgDeep p-4 rounded-xl border border-borderDark max-w-sm mx-auto">
                <span className="text-xs text-textMuted block mb-2">Wallet Status</span>
                {account ? (
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-primaryGreen font-bold">
                    <CheckCircle2 size={16} />
                    Connected: {account.substring(0, 8)}...{account.substring(account.length - 4)}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="bg-primaryGreen text-bgDeep font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Connect MetaMask
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-borderDark">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-1 bg-bgDeep border border-borderDark disabled:opacity-40 text-textMuted hover:text-textPrimary text-xs px-4 py-2.5 rounded-xl font-semibold transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 bg-primaryGreen text-bgDeep text-xs px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primaryGreen to-emerald-600 text-bgDeep text-xs px-6 py-2.5 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                Complete Onboarding
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
