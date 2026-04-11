<<<<<<< HEAD
const API_URL = '/api';

// Helper function to get the auth headers along with the token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
    }
    return response.json();
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
    }
    return response.json();
};

export const getDonors = async (bloodType = "") => {
    // Append query parameter if bloodType exists
    const query = bloodType ? `?blood_type=${encodeURIComponent(bloodType)}` : '';
    const response = await fetch(`${API_URL}/donors${query}`, {
        method: 'GET',
        headers: getAuthHeaders() // Sending token in headers
    });
    
    if (!response.ok) throw new Error('Failed to fetch donors');
    return response.json();
};

export const addDonor = async (donorData) => {
    const response = await fetch(`${API_URL}/donors`, {
        method: 'POST',
        headers: getAuthHeaders(), // Sending token in headers
        body: JSON.stringify(donorData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add donor');
    }
    return response.json();
};

export const getStats = async () => {
    const response = await fetch(`${API_URL}/stats`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
};

export const searchDonors = async (bloodType) => {
    const query = bloodType ? `?bloodGroup=${encodeURIComponent(bloodType)}` : '';
    const response = await fetch(`${API_URL}/donors/search${query}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to search donors');
    return response.json();
};

export const getRequests = async () => {
    const response = await fetch(`${API_URL}/requests`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch emergency requests');
    return response.json();
};

export const getDonorById = async (id) => {
    const response = await fetch(`${API_URL}/donors/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch donor details');
    return response.json();
};

export const updateDonorAvailability = async (availabilityStatus) => {
    const response = await fetch(`${API_URL}/donor/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ availabilityStatus })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to update availability');
    }
    return response.json();
};

export const requestDonationEmail = async (id) => {
    const response = await fetch(`${API_URL}/donors/${id}/request`, {
        method: 'POST',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to send donation request');
    return response.json();
};

export const updateProfile = async (profileData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update profile');
    }
    return response.json();
};

// ── Donations ──

export const getMyDonations = async () => {
    const response = await fetch(`${API_URL}/donations`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch donations');
    return response.json();
};

export const addDonation = async (donationData) => {
    const response = await fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(donationData)
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add donation');
    }
    return response.json();
};

export const getDonationCertificate = async (donationId) => {
    const response = await fetch(`${API_URL}/donations/${donationId}/certificate`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch certificate');
    return response.json();
};
=======
/**
 * HemoLife API Service
 * ─────────────────────────────────────────────────────────────────
 * Replace BASE_URL with your real backend when ready.
 * All methods return a Promise and use fetch under the hood.
 * Swap to Axios by replacing `apiFetch` with `axios.get / .post / .put / .delete`.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

/**
 * Generic fetch wrapper with JSON handling and error surfacing.
 */
async function apiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(err.message ?? "API request failed");
  }

  return response.json();
}

// ─── DONORS ──────────────────────────────────────────────────────

/** Fetch paginated donor list. */
export const getDonors = ({ page = 1, limit = 20, search = "", blood = "", status = "" } = {}) =>
  apiFetch(`/donors?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&blood=${blood}&status=${status}`);

/** Fetch single donor by ID. */
export const getDonor = (id) => apiFetch(`/donors/${id}`);

/** Register a new donor. */
export const createDonor = (payload) =>
  apiFetch("/donors", { method: "POST", body: JSON.stringify(payload) });

/** Update donor record. */
export const updateDonor = (id, payload) =>
  apiFetch(`/donors/${id}`, { method: "PUT", body: JSON.stringify(payload) });

/** Delete donor. */
export const deleteDonor = (id) => apiFetch(`/donors/${id}`, { method: "DELETE" });

// ─── CAMPAIGNS ───────────────────────────────────────────────────

/** Fetch all active campaigns. */
export const getCampaigns = () => apiFetch("/campaigns");

/** Register donor for a campaign. */
export const registerForCampaign = (campaignId, donorId) =>
  apiFetch(`/campaigns/${campaignId}/register`, { method: "POST", body: JSON.stringify({ donorId }) });

// ─── DASHBOARD ───────────────────────────────────────────────────

/** Fetch summary metrics (total donations, eligible count, etc.). */
export const getDashboardMetrics = () => apiFetch("/dashboard/metrics");

/** Fetch recent donation activity feed. */
export const getRecentActivity = (limit = 10) =>
  apiFetch(`/dashboard/activity?limit=${limit}`);

/** Fetch blood inventory levels. */
export const getBloodInventory = () => apiFetch("/dashboard/inventory");

// ─── PROFILE ─────────────────────────────────────────────────────

/** Fetch logged-in user profile. */
export const getProfile = () => apiFetch("/profile");

/** Update profile. */
export const updateProfile = (payload) =>
  apiFetch("/profile", { method: "PUT", body: JSON.stringify(payload) });

/** Fetch donation history for logged-in user. */
export const getDonationHistory = () => apiFetch("/profile/history");
>>>>>>> 89fdc1aff146c1b3547e27112ba32b0457979d87
