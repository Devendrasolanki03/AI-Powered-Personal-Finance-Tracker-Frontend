import api from './axios';

/**
 * Get all expenses for current user
 */
export const getExpenses = async () => {
    const response = await api.get('/api/finance/expenses');
    return response.data;
};

/**
 * Create expense
 */
export const createExpense = async (expenseData) => {
    const response = await api.post('/api/finance/expense', expenseData);
    return response.data;
};

/**
 * Delete expense (if you add this endpoint to backend)
 */
export const deleteExpense = async (id) => {
    const response = await api.delete(`/api/expense-report/${id}`);
    return response.data;
};