const config = {
  API_BASE_URL:
    import.meta.env.VITE_API_URL ??
    "https://crowdshield-backend.onrender.com/api",
};

console.log("🔌 API Configuration Loaded:", config.API_BASE_URL);

export default config;
