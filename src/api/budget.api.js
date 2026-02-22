import api from './axios';

/**
 * Get all budgets for current user
 */
export const getBudgets = async () => {
    const response = await api.get('/api/budgets');
    return response.data;
};

/**
 * Create a new budget
 */
export const createBudget = async (budgetData) => {
    const response = await api.post('/api/budgets', budgetData);
    return response.data;
};

/**
 * Update an existing budget
 */
export const updateBudget = async (budgetId, budgetData) => {
    const response = await api.put(`/api/budgets/${budgetId}`, budgetData);
    return response.data;
};

/**
 * Delete a budget
 */
export const deleteBudget = async (budgetId) => {
    const response = await api.delete(`/api/budgets/${budgetId}`);
    return response.data;
};

export default {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget
};