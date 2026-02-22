import api from './axios';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all incomes
 */
export const getIncomes = async () => {
  const response = await api.get(API_ENDPOINTS.GET_INCOMES);
  return response.data;
};

/**
 * Create income
 */
export const createIncome = async (incomeData) => {
  const response = await api.post(API_ENDPOINTS.ADD_INCOME, incomeData);
  return response.data;
};

/**
 * Delete income
 */
export const deleteIncome = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.ADD_INCOME}/${id}`);
  return response.data;
};