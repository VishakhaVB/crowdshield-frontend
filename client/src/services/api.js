import config from '../config';

const API_URL = config.API_BASE_URL;

// Helper to handle response errors
const handleResponse = async (response) => {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        console.error('API Error:', error);
        throw new Error(error);
    }
    return data;
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
};

export const fetchDashboardData = async (token) => {
    if (!token) return null;
    try {
        const response = await fetch(`${API_URL}/dashboard/summary`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Note: The backend route is /dashboard/summary, but previous code pointed to /dashboard.
        // I corrected it to /dashboard/summary based on routes/api.js inspection.
        return await handleResponse(response);
    } catch (error) {
        console.error("Dashboard fetch error:", error);
        return null;
    }
};

export async function getDashboardSummary() {
    try {
        const response = await fetch(`${API_URL}/dashboard/summary`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Public Dashboard fetch error:", error);
        return null;
    }
}

// Health Check Function
export async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_URL.replace('/api', '')}/health`);
        return response.ok;
    } catch (e) {
        return false;
    }
}
