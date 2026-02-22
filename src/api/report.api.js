import api from './axios';

/**
 * Get weekly expense report
 * @param {string} email - User email
 * @param {string} date - Date in ISO format (YYYY-MM-DD)
 */
export const getWeeklyReport = async (email, date) => {
  const response = await api.get('/api/expense-report/weekly', {
    params: { email, date }
  });
  return response.data;
};

/**
 * Get monthly expense report
 * @param {string} email - User email
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 */
export const getMonthlyReport = async (email, year, month) => {
  const response = await api.get('/api/expense-report/monthly', {
    params: { email, year, month }
  });
  return response.data;
};

/**
 * Get yearly expense report
 * @param {string} email - User email
 * @param {number} year - Year
 */
export const getYearlyReport = async (email, year) => {
  const response = await api.get('/api/expense-report/yearly', {
    params: { email, year }
  });
  return response.data;
};

/**
 * Get category summary for date range
 * @param {string} email - User email
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 */
export const getCategorySummary = async (email, startDate, endDate) => {
  const response = await api.get('/api/expense-report/category-summary', {
    params: { email, startDate, endDate }
  });
  return response.data;
};

/**
 * Get monthly income
 */
export const getMonthlyIncome = async (email, year, month) => {
  const response = await api.get('/api/reports/monthly-income', {
    params: { email, year, month }
  });
  return response.data;
};

/**
 * Get yearly income chart data
 */
export const getYearlyIncomeChart = async (email, year) => {
  const response = await api.get('/api/reports/yearly-income-chart', {
    params: { email, year }
  });
  return response.data;
};