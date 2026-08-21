import React, { createContext, useContext, useState } from 'react';
import { DEMO_BATCHES, INITIAL_REGISTERED_FARMERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [role, setRole] = useState('Farmer'); // Farmer, Lab, Manufacturer, Consumer, Regulator
  const [account, setAccount] = useState(null);
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('ayurchain_batches');
    return saved ? JSON.parse(saved) : DEMO_BATCHES;
  });
  const [farmers, setFarmers] = useState(INITIAL_REGISTERED_FARMERS);
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const saved = localStorage.getItem('ayurchain_offline_queue');
    return saved ? JSON.parse(saved) : [];
  });
  const [txToast, setTxToast] = useState(null);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        showToast('Wallet Connected Successfully!', accounts[0], 'success');
      } catch (err) {
        showToast('Wallet connection rejected', err.message, 'error');
      }
    } else {
      // Demo mock connect
      const demoWallet = "0x71C839A2081736152910AA";
      setAccount(demoWallet);
      showToast('Demo Wallet Connected', demoWallet, 'success');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const showToast = (title, message, type = 'success', txHash = null) => {
    setTxToast({ title, message, type, txHash, id: Date.now() });
    setTimeout(() => setTxToast(null), 6000);
  };

  const addBatch = (newBatch) => {
    const updated = { [newBatch.batchId]: newBatch, ...batches };
    setBatches(updated);
    localStorage.setItem('ayurchain_batches', JSON.stringify(updated));
    showToast('Batch Logged on Blockchain', `Batch ID ${newBatch.batchId} created immutably`, 'success', '0xabc' + Math.random().toString(16).substring(2, 10));
  };

  const saveOfflineBatch = (batch) => {
    const updated = [...offlineQueue, batch];
    setOfflineQueue(updated);
    localStorage.setItem('ayurchain_offline_queue', JSON.stringify(updated));
    showToast('Saved Offline!', 'Batch saved in local cache. Will sync when back online.', 'warning');
  };

  const syncOfflineBatches = () => {
    if (offlineQueue.length === 0) return;
    let updatedBatches = { ...batches };
    offlineQueue.forEach(b => {
      updatedBatches[b.batchId] = b;
    });
    setBatches(updatedBatches);
    setOfflineQueue([]);
    localStorage.setItem('ayurchain_batches', JSON.stringify(updatedBatches));
    localStorage.removeItem('ayurchain_offline_queue');
    showToast('Synced with Blockchain!', `${offlineQueue.length} offline batch(es) written to Ethereum blockchain.`, 'success');
  };

  const addFarmerRegistration = (farmerData) => {
    const newFarmer = {
      id: `FARM-${Math.floor(100 + Math.random() * 900)}`,
      name: farmerData.name,
      state: farmerData.state,
      district: farmerData.district,
      herb: farmerData.herbs[0] || 'Ashwagandha',
      status: 'Pending Review',
      wallet: account || '0x' + Math.random().toString(16).substring(2, 10)
    };
    setFarmers(prev => [newFarmer, ...prev]);
    showToast('Registration Submitted!', 'Submitted to Regulator Node for AYUSH License Verification.', 'success');
  };

  const updateFarmerStatus = (id, newStatus) => {
    setFarmers(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
    showToast('Status Updated', `Farmer ${id} marked as ${newStatus}`, 'success');
  };

  const translations = {
    en: {
      navHome: "Home",
      navDashboard: "Dashboard",
      navTrace: "Traceability",
      navRegister: "Farmer Signup",
      navScan: "Log Batch",
      navAdmin: "Regulator Portal",
      heroTitle: "From Forest to Formulation — Every Herb Traced, Every Step Verified",
      heroSub: "India's premier Web3 botanical supply chain tracking platform empowering wild collectors, farmers, NABL labs, and conscious consumers.",
      scanCta: "Scan Herb Batch",
      registerCta: "Register as Farmer",
      herbsTracked: "Herbs Tracked",
      farmersOnboarded: "Farmers Onboarded",
      batchesVerified: "Batches Verified",
      selectRole: "Switch Portal View",
    },
    hi: {
      navHome: "मुख्य पृष्ठ",
      navDashboard: "डैशबोर्ड",
      navTrace: "प्रमाणिकता (Trace)",
      navRegister: "किसान पंजीकरण",
      navScan: "बैच दर्ज करें",
      navAdmin: "नियामक पोर्टल",
      heroTitle: "जंगल से औषधि तक — हर जड़ी-बूटी का हिसाब, हर कदम प्रामाणिक",
      heroSub: "ब्लॉकचेन तकनीक द्वारा संचालित भारत का पहला आयुर्वेदिक जड़ी-बूटी आपूर्ति श्रृंखला प्लेटफ़ॉर्म।",
      scanCta: "बैच स्कैन करें",
      registerCta: "किसान पंजीकरण",
      herbsTracked: "ट्रैक की गई जड़ी-बूटियाँ",
      farmersOnboarded: "पंजीकृत किसान",
      batchesVerified: "सत्यापित बैच",
      selectRole: "पोर्टल बदलें",
    }
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <AppContext.Provider value={{
      lang,
      toggleLanguage,
      role,
      setRole,
      account,
      connectWallet,
      disconnectWallet,
      batches,
      addBatch,
      farmers,
      addFarmerRegistration,
      updateFarmerStatus,
      offlineQueue,
      saveOfflineBatch,
      syncOfflineBatches,
      txToast,
      showToast,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
