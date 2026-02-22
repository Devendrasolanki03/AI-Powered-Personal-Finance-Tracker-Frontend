// ================= API BASE =================
export const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8086";

// ================= API ENDPOINTS =================
export const API_ENDPOINTS = {
    // ---------- AUTH ----------
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GOOGLE_AUTH: "/oauth2/authorization/google",

    // ---------- USER ----------
    USER_ME: "/api/users/me",
    USERS: "/api/users",

    // ---------- FINANCE ----------
    ADD_INCOME: "/api/finance/income",
    GET_INCOMES: "/api/finance/incomes",
    ADD_EXPENSE: "/api/finance/expense",
    GET_EXPENSES: "/api/finance/expenses",

    // ---------- BUDGET ----------
    BUDGETS: "/api/budgets",
    UPDATE_BUDGET: (id) => `/api/budgets/${id}`,
    DELETE_BUDGET: (id) => `/api/budgets/${id}`,

    // ---------- DASHBOARD ----------
    DASHBOARD: "/api/dashboard",

    // ---------- EXPENSE REPORTS ----------
    REPORT_WEEKLY: "/api/expense-report/weekly",
    REPORT_MONTHLY: "/api/expense-report/monthly",
    REPORT_YEARLY: "/api/expense-report/yearly",
    REPORT_CATEGORY_SUMMARY: "/api/expense-report/category-summary",
    REPORT_CATEGORY: "/api/expense-report/category",

    // ---------- INCOME REPORTS ----------
    MONTHLY_INCOME: "/api/reports/monthly-income",
    MONTHLY_INCOME_SUMMARY: "/api/reports/monthly-income-summary",
    YEARLY_INCOME: "/api/reports/yearly-income",
    YEARLY_INCOME_SUMMARY: "/api/reports/yearly-income-summary",
    YEARLY_INCOME_CHART: "/api/reports/yearly-income-chart",

    // ---------- AI ----------
    AI_ADVICE: "/api/ai/advice",
    AI_CHAT: "/api/ai/chat",

    // ---------- AI INSIGHTS ----------
    AI_INSIGHTS: "/api/ai-insights",
    AI_INSIGHTS_BY_TYPE: (type) => `/api/ai-insights/type/${type}`,
    AI_INSIGHTS_DELETE: (id) => `/api/ai-insights/${id}`,
};

// ================= EXPENSE CATEGORIES =================
export const EXPENSE_CATEGORIES = [
    { id: 1, name: 'Food & Dining', icon: '🍔', color: '#ef4444' },
    { id: 2, name: 'Transportation', icon: '🚗', color: '#3b82f6' },
    { id: 3, name: 'Entertainment', icon: '🎮', color: '#a855f7' },
    { id: 4, name: 'Shopping', icon: '🛍️', color: '#ec4899' },
    { id: 5, name: 'Healthcare', icon: '🏥', color: '#22c55e' },
    { id: 6, name: 'Education', icon: '📚', color: '#f59e0b' },
    { id: 7, name: 'Bills & Utilities', icon: '💡', color: '#06b6d4' },
    { id: 8, name: 'Others', icon: '📦', color: '#8b5cf6' },
];

// ================= INCOME SOURCES =================
export const INCOME_SOURCES = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Rental',
    'Gift',
    'Other',
];

// ================= CHART COLORS =================
export const CHART_COLORS = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#4facfe',
    '#43e97b',
    '#fa709a',
    '#fee140',
    '#30cfd0',
];

// ================= DATE FORMATS =================
export const DATE_FORMATS = {
    DISPLAY: 'MMM dd, yyyy',
    INPUT: 'yyyy-MM-dd',
    FULL: 'MMMM dd, yyyy',
    TIME: 'HH:mm:ss',
};

// ================= ANIMATION DURATIONS =================
export const ANIMATION_DURATION = {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
};

// ================= BREAKPOINTS =================
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
};

// ================= USER ROLES =================
export const USER_ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    // ✅ REMOVED: THEME - it belongs in STORAGE_KEYS, not here
};

// ================= TOAST MESSAGES =================
export const TOAST_MESSAGES = {
    LOGIN_SUCCESS: 'Welcome back! 🎉',
    LOGIN_ERROR: 'Login failed. Please check your credentials.',
    REGISTER_SUCCESS: 'Account created successfully! 🎉',
    REGISTER_ERROR: 'Registration failed. Please try again.',
    LOGOUT_SUCCESS: 'Logged out successfully',

    INCOME_ADDED: 'Income added successfully! ✅',
    INCOME_UPDATED: 'Income updated successfully! ✅',
    INCOME_DELETED: 'Income deleted successfully! ✅',
    INCOME_ERROR: 'Failed to process income',

    EXPENSE_ADDED: 'Expense added successfully! ✅',
    EXPENSE_UPDATED: 'Expense updated successfully! ✅',
    EXPENSE_DELETED: 'Expense deleted successfully! ✅',
    EXPENSE_ERROR: 'Failed to process expense',

    BUDGET_SAVED: 'Budgets saved successfully! ✅',
    BUDGET_ERROR: 'Failed to save budgets',

    AI_ERROR: 'Failed to fetch AI insights',

    NETWORK_ERROR: 'Network error. Please check your connection.',
};

// ================= PAGINATION =================
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

// ================= CURRENCY =================
export const CURRENCY = {
    SYMBOL: '₹',
    CODE: 'INR',
    LOCALE: 'en-IN',
};

// ================= BUDGET ALERT THRESHOLDS =================
export const BUDGET_THRESHOLDS = {
    WARNING: 70,
    DANGER: 90,
};

// ================= APP METADATA =================
export const APP_METADATA = {
    NAME: 'AI Finance Tracker',
    DESCRIPTION: 'Smart Personal Finance Management',
    VERSION: '1.0.0',
    AUTHOR: 'Devendra Solanki',
};

// ================= LOCAL STORAGE KEYS =================
export const STORAGE_KEYS = {
    TOKEN: "finance_tracker_token",
    USER: "finance_tracker_user",
    THEME: "theme", // ✅ CORRECT - Theme belongs here
};