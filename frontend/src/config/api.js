// AyurChain Centralized API & Environment Utility
// Dynamically switches between Localhost & Production Render Backend with Failover Retry

const LOCAL_BACKEND = 'http://localhost:5000';
const PROD_BACKEND  = 'https://ayurchain-5nx5.onrender.com';

// 1. Primary Base URL Selection based on Environment / Hostname
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? LOCAL_BACKEND
    : PROD_BACKEND);

// 2. Secondary Failover Base URL
export const FAILOVER_API_BASE_URL = 
  API_BASE_URL === LOCAL_BACKEND ? PROD_BACKEND : LOCAL_BACKEND;

/**
 * Robust Smart Fetch wrapper that attempts primary URL first,
 * fails over to backup URL if primary is down, and falls back to mockData/localStorage.
 */
export async function smartApiFetch(endpointPath, options = {}) {
  const path = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;

  // Try Primary
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, options);
    if (res.ok) {
      const data = await res.json();
      return { success: true, data: data.data || data, source: 'primary' };
    }
  } catch (err) {
    console.warn(`⚠️ Primary API (${API_BASE_URL}) failed:`, err.message);
  }

  // Try Failover Secondary
  try {
    console.log(`🔄 Attempting failover API (${FAILOVER_API_BASE_URL}${path})...`);
    const res = await fetch(`${FAILOVER_API_BASE_URL}${path}`, options);
    if (res.ok) {
      const data = await res.json();
      return { success: true, data: data.data || data, source: 'failover' };
    }
  } catch (err) {
    console.warn(`⚠️ Failover API (${FAILOVER_API_BASE_URL}) also failed:`, err.message);
  }

  // Return failure so component can use local mockData fallback
  return { success: false, error: 'Both primary and failover backends are unavailable' };
}

export default API_BASE_URL;

export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'AyurChain',
  blockchainNetwork: import.meta.env.VITE_BLOCKCHAIN_NETWORK || 'Ethereum Mainnet',
  etherscanBase: import.meta.env.VITE_ETHERSCAN_BASE || 'https://etherscan.io',
};
