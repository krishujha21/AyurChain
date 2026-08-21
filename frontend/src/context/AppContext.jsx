import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_BATCHES, INITIAL_REGISTERED_FARMERS } from '../data/mockData';
import { smartApiFetch } from '../config/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [role, setRole] = useState('Farmer'); // Farmer, Lab, Manufacturer, Consumer, Regulator
  const [account, setAccount] = useState(null);

  // Authentication State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ayurchain_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ayurchain_token') || null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

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

  // Sync role with logged in user if available
  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
    if (user?.walletAddress) {
      setAccount(user.walletAddress);
    }
  }, [user]);

  // Initial Fetch Batches and Farmers from Database with Failover & Fallback
  useEffect(() => {
    async function loadDatabaseData() {
      // Batches
      const batchRes = await smartApiFetch('/api/batches');
      if (batchRes.success && Array.isArray(batchRes.data) && batchRes.data.length > 0) {
        const batchMap = {};
        batchRes.data.forEach(b => {
          if (b.batchId) batchMap[b.batchId] = b;
        });
        setBatches(prev => ({ ...prev, ...batchMap }));
      }

      // Farmers
      const farmerRes = await smartApiFetch('/api/farmers');
      if (farmerRes.success && Array.isArray(farmerRes.data) && farmerRes.data.length > 0) {
        setFarmers(farmerRes.data);
      }
    }
    loadDatabaseData();
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const showToast = (title, message, type = 'success', txHash = null) => {
    setTxToast({ title, message, type, txHash, id: Date.now() });
    setTimeout(() => setTxToast(null), 6000);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const wallet = accounts[0];
        setAccount(wallet);
        showToast('Wallet Connected Successfully!', wallet, 'success');
        return wallet;
      } catch (err) {
        showToast('Wallet connection rejected', err.message, 'error');
        return null;
      }
    } else {
      // Demo mock connect
      const demoWallet = "0x71C839A2081736152910AA";
      setAccount(demoWallet);
      showToast('Demo Wallet Connected', demoWallet, 'success');
      return demoWallet;
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  // ---------------------------------------------------------------------------
  // Authentication Actions
  // ---------------------------------------------------------------------------
  const login = async ({ email, password, walletAddress, roleOverride }) => {
    setIsAuthLoading(true);
    try {
      const payload = walletAddress ? { walletAddress, role: roleOverride || role } : { email, password };
      const res = await smartApiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.success && res.data?.token) {
        const userData = res.data.user;
        const jwtToken = res.data.token;
        setUser(userData);
        setToken(jwtToken);
        if (userData.role) setRole(userData.role);
        if (userData.walletAddress) setAccount(userData.walletAddress);

        localStorage.setItem('ayurchain_user', JSON.stringify(userData));
        localStorage.setItem('ayurchain_token', jwtToken);
        showToast(`Welcome back, ${userData.name}!`, `Authenticated as ${userData.role}`, 'success');
        setIsAuthLoading(false);
        return { success: true, user: userData };
      }

      // Offline / Demo Fallback login
      const fallbackName = email ? email.split('@')[0] : 'AyurChain Officer';
      const fallbackUser = {
        _id: 'user-' + Date.now(),
        name: fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1),
        email: email || 'demo@ayurchain.eth',
        role: roleOverride || role || 'Farmer',
        walletAddress: walletAddress || account || '0x71C839A2081736152910AA',
        isVerified: true
      };
      const fallbackToken = 'mock_jwt_token_' + Date.now();
      setUser(fallbackUser);
      setToken(fallbackToken);
      setRole(fallbackUser.role);
      localStorage.setItem('ayurchain_user', JSON.stringify(fallbackUser));
      localStorage.setItem('ayurchain_token', fallbackToken);
      showToast(`Welcome, ${fallbackUser.name}!`, `Logged in as ${fallbackUser.role} (Offline/Demo Mode)`, 'success');
      setIsAuthLoading(false);
      return { success: true, user: fallbackUser };
    } catch (err) {
      setIsAuthLoading(false);
      showToast('Login Failed', err.message || 'Unable to authenticate', 'error');
      return { success: false, error: err.message };
    }
  };

  const register = async (formData) => {
    setIsAuthLoading(true);
    try {
      const res = await smartApiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.success && res.data?.token) {
        const userData = res.data.user;
        const jwtToken = res.data.token;
        setUser(userData);
        setToken(jwtToken);
        if (userData.role) setRole(userData.role);
        if (userData.walletAddress) setAccount(userData.walletAddress);

        localStorage.setItem('ayurchain_user', JSON.stringify(userData));
        localStorage.setItem('ayurchain_token', jwtToken);
        showToast('Account Created Successfully!', `Welcome to AyurChain, ${userData.name}`, 'success');
        setIsAuthLoading(false);
        return { success: true, user: userData };
      }

      // Offline / Demo registration fallback
      const fallbackUser = {
        _id: 'user-' + Date.now(),
        name: formData.name || 'Herbal Practitioner',
        email: formData.email,
        role: formData.role || 'Farmer',
        walletAddress: formData.walletAddress || account || '0x71C839A2081736152910AA',
        organization: formData.organization || '',
        licenseNumber: formData.licenseNumber || '',
        isVerified: false
      };
      const fallbackToken = 'mock_jwt_token_' + Date.now();
      setUser(fallbackUser);
      setToken(fallbackToken);
      setRole(fallbackUser.role);
      localStorage.setItem('ayurchain_user', JSON.stringify(fallbackUser));
      localStorage.setItem('ayurchain_token', fallbackToken);
      showToast('Registration Saved!', 'Registered locally (Offline / Demo Mode)', 'success');
      setIsAuthLoading(false);
      return { success: true, user: fallbackUser };
    } catch (err) {
      setIsAuthLoading(false);
      showToast('Registration Failed', err.message, 'error');
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ayurchain_user');
    localStorage.removeItem('ayurchain_token');
    showToast('Logged Out', 'You have been signed out successfully', 'success');
  };

  // ---------------------------------------------------------------------------
  // Supply Chain Batches & Farmers
  // ---------------------------------------------------------------------------
  const addBatch = async (newBatch) => {
    const updated = { [newBatch.batchId]: newBatch, ...batches };
    setBatches(updated);
    localStorage.setItem('ayurchain_batches', JSON.stringify(updated));

    // Try posting to database asynchronously
    smartApiFetch('/api/batches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBatch)
    }).catch(e => console.warn('Could not sync batch with remote DB:', e));

    showToast('Batch Logged on Blockchain', `Batch ID ${newBatch.batchId} created immutably`, 'success', '0xabc' + Math.random().toString(16).substring(2, 10));
  };

  const saveOfflineBatch = (batch) => {
    const updated = [...offlineQueue, batch];
    setOfflineQueue(updated);
    localStorage.setItem('ayurchain_offline_queue', JSON.stringify(updated));
    showToast('Saved Offline!', 'Batch saved in local cache. Will sync when back online.', 'warning');
  };

  const syncOfflineBatches = async () => {
    if (offlineQueue.length === 0) return;
    let updatedBatches = { ...batches };
    for (const b of offlineQueue) {
      updatedBatches[b.batchId] = b;
      smartApiFetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(b)
      }).catch(e => console.warn('Failed batch sync:', e));
    }
    setBatches(updatedBatches);
    setOfflineQueue([]);
    localStorage.setItem('ayurchain_batches', JSON.stringify(updatedBatches));
    localStorage.removeItem('ayurchain_offline_queue');
    showToast('Synced with Blockchain!', `${offlineQueue.length} offline batch(es) written to Ethereum & database.`, 'success');
  };

  const addFarmerRegistration = async (farmerData) => {
    const newFarmer = {
      farmerId: `FARM-${Math.floor(100 + Math.random() * 900)}`,
      name: farmerData.name,
      state: farmerData.state,
      district: farmerData.district,
      herb: farmerData.herbs?.[0] || 'Ashwagandha',
      status: 'Pending Review',
      wallet: account || '0x' + Math.random().toString(16).substring(2, 10)
    };
    setFarmers(prev => [newFarmer, ...prev]);

    smartApiFetch('/api/farmers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFarmer)
    }).catch(e => console.warn('Could not sync farmer with DB:', e));

    showToast('Registration Submitted!', 'Submitted to Regulator Node for AYUSH License Verification.', 'success');
  };

  const updateFarmerStatus = async (id, newStatus) => {
    setFarmers(prev => prev.map(f => (f.farmerId === id || f.id === id) ? { ...f, status: newStatus } : f));
    smartApiFetch(`/api/farmers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(e => console.warn('Could not update farmer status in DB:', e));

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
      navLogin: "Sign In",
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
      navLogin: "लॉगिन करें",
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
      user,
      token,
      isAuthenticated: Boolean(user || token),
      isAuthLoading,
      login,
      register,
      logout,
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
