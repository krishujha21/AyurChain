// AyurChain Centralized API & Environment Utility
// Dynamically switches between Localhost & Production Render Backend

const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://ayurchain-5nx5.onrender.com');

export default API_BASE_URL;

export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'AyurChain',
  blockchainNetwork: import.meta.env.VITE_BLOCKCHAIN_NETWORK || 'Ethereum Mainnet',
  etherscanBase: import.meta.env.VITE_ETHERSCAN_BASE || 'https://etherscan.io',
};
