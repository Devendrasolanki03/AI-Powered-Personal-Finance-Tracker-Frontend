
// import axios from "axios";

// const API_URL = "http://localhost:8086/api/admin";

// const getAuthHeaders = () => {
//     const token = localStorage.getItem("admin_token");

//     if (!token) {
//         console.warn("⚠️ Admin token missing");
//         return {};
//     }

//     return {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
// };

// export const adminAPI = {
//     // ========== AUTH ==========
//     login: (credentials) =>
//         axios.post(`${API_URL}/auth/login`, credentials),

//     // ========== DASHBOARD STATS ==========
//     getDashboardStats: () =>
//         axios.get(`${API_URL}/stats`, getAuthHeaders()),

//     getMonthlyExpenses: () =>
//         axios.get(`${API_URL}/stats/expenses/monthly`, getAuthHeaders()),

//     getCategoryDistribution: () =>
//         axios.get(`${API_URL}/stats/expenses/categories`, getAuthHeaders()),

//     // ========== USERS MANAGEMENT ==========
//     getAllUsers: (page = 0, size = 20, search = '', status = '') => {
//         const params = new URLSearchParams();
//         params.append('page', page);
//         params.append('size', size);
//         if (search) params.append('search', search);
//         if (status) params.append('status', status);

//         return axios.get(`${API_URL}/users?${params.toString()}`, getAuthHeaders());
//     },

//     getUserById: (id) =>
//         axios.get(`${API_URL}/users/${id}`, getAuthHeaders()),

//     blockUser: (id) =>
//         axios.put(`${API_URL}/users/${id}/block`, {}, getAuthHeaders()),

//     unblockUser: (id) =>
//         axios.put(`${API_URL}/users/${id}/unblock`, {}, getAuthHeaders()),

//     // ========== AI INSIGHTS ==========
//     getAllInsights: (page = 0, size = 20, type = '', impact = '') => {
//         const params = new URLSearchParams();
//         params.append('page', page);
//         params.append('size', size);
//         if (type) params.append('type', type);
//         if (impact) params.append('impact', impact);

//         return axios.get(`${API_URL}/insights?${params.toString()}`, getAuthHeaders());
//     },

//     getInsightsStats: () =>
//         axios.get(`${API_URL}/insights/stats`, getAuthHeaders()),

//     // ========== ANALYTICS ==========
//     getCategoryAnalytics: () =>
//         axios.get(`${API_URL}/analytics/categories`, getAuthHeaders()),

//     getExpenseTrends: (year = 2026) =>
//         axios.get(`${API_URL}/analytics/trends?year=${year}`, getAuthHeaders()),

//     getSpendingDistribution: () =>
//         axios.get(`${API_URL}/analytics/distribution`, getAuthHeaders()),

//     getKPIMetrics: () =>
//         axios.get(`${API_URL}/analytics/kpi`, getAuthHeaders()),

//     // ========== REVENUE ==========
//     getRevenueStats: () =>
//         axios.get(`${API_URL}/revenue/stats`, getAuthHeaders()),

//     getRevenueGrowth: (months = 6) =>
//         axios.get(`${API_URL}/revenue/growth?months=${months}`, getAuthHeaders()),

//     getSubscriptionPlans: () =>
//         axios.get(`${API_URL}/revenue/plans`, getAuthHeaders()),

//     // ========== SETTINGS ==========
//     getSettings: () =>
//         axios.get(`${API_URL}/settings`, getAuthHeaders()),

//     updateSettings: (settings) =>
//         axios.put(`${API_URL}/settings`, settings, getAuthHeaders()),
// };

// export default adminAPI;
import axios from "axios";

const API_URL = "http://localhost:8086/api/admin";

const getAuthHeaders = () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
        console.warn("⚠️ Admin token missing");
        return {};
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const adminAPI = {
    // ========== AUTH ==========
    login: (credentials) =>
        axios.post(`${API_URL}/auth/login`, credentials),

    // ========== DASHBOARD STATS ==========
    getDashboardStats: () =>
        axios.get(`${API_URL}/stats`, getAuthHeaders()),

    getMonthlyExpenses: () =>
        axios.get(`${API_URL}/stats/expenses/monthly`, getAuthHeaders()),

    getCategoryDistribution: () =>
        axios.get(`${API_URL}/stats/expenses/categories`, getAuthHeaders()),

    // ========== USERS MANAGEMENT ==========
    getAllUsers: (page = 0, size = 20, search = '', status = '') => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', size);
        if (search) params.append('search', search);
        if (status) params.append('status', status);

        return axios.get(`${API_URL}/users?${params.toString()}`, getAuthHeaders());
    },

    getUserById: (id) =>
        axios.get(`${API_URL}/users/${id}`, getAuthHeaders()),

    blockUser: (id) =>
        axios.put(`${API_URL}/users/${id}/block`, {}, getAuthHeaders()),

    unblockUser: (id) =>
        axios.put(`${API_URL}/users/${id}/unblock`, {}, getAuthHeaders()),

    deleteUser: (id) =>
        axios.delete(`${API_URL}/users/${id}`, getAuthHeaders()),

    // ========== AI INSIGHTS ==========
    getAllInsights: (page = 0, size = 20, type = '', impact = '') => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', size);
        if (type) params.append('type', type);
        if (impact) params.append('impact', impact);

        return axios.get(`${API_URL}/insights?${params.toString()}`, getAuthHeaders());
    },

    getInsightsStats: () =>
        axios.get(`${API_URL}/insights/stats`, getAuthHeaders()),

    // ========== ANALYTICS ==========
    getCategoryAnalytics: () =>
        axios.get(`${API_URL}/analytics/categories`, getAuthHeaders()),

    getExpenseTrends: (year = 2026) =>
        axios.get(`${API_URL}/analytics/trends?year=${year}`, getAuthHeaders()),

    getSpendingDistribution: () =>
        axios.get(`${API_URL}/analytics/distribution`, getAuthHeaders()),

    getKPIMetrics: () =>
        axios.get(`${API_URL}/analytics/kpi`, getAuthHeaders()),

    // ========== REVENUE ==========
    getRevenueStats: () =>
        axios.get(`${API_URL}/revenue/stats`, getAuthHeaders()),

    getRevenueGrowth: (months = 6) =>
        axios.get(`${API_URL}/revenue/growth?months=${months}`, getAuthHeaders()),

    getSubscriptionPlans: () =>
        axios.get(`${API_URL}/revenue/plans`, getAuthHeaders()),

    // ========== SETTINGS ==========
    getSettings: () =>
        axios.get(`${API_URL}/settings`, getAuthHeaders()),

    updateSettings: (settings) =>
        axios.put(`${API_URL}/settings`, settings, getAuthHeaders()),
};

export default adminAPI;