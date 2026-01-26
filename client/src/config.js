const config = {
    // 1. LOCAL DEVELOPMENT: Use localhost
    // 2. PRODUCTION (Netlify): Set VITE_API_URL = https://crowdshield-backend.onrender.com/api
    API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
};

console.log('🔌 API Configuration Loaded:', config.API_BASE_URL);

export default config;
