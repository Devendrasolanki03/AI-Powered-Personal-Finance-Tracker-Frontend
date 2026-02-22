import api from './axios';
import { API_ENDPOINTS } from '../utils/constants';



/**
 * Generate AI budget suggestions
 */
export const generateAIBudget = async (budgetData) => {
  const response = await api.post(API_ENDPOINTS.AI_BUDGET, budgetData);
  return response.data;
};


/**
 * Get AI financial advice
 */
export const getAIAdvice = async () => {
  const response = await api.get(API_ENDPOINTS.AI_ADVICE);
  return response.data;
};

/**
 * Chat with AI
 */
export const chatWithAI = async (query) => {
  const response = await api.post(API_ENDPOINTS.AI_CHAT, query, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  return response.data;
};

/**
 * Create AI Insight
 */
export const createAIInsight = async (insightType, prompt) => {
  const response = await api.post(
    `${API_ENDPOINTS.AI_INSIGHTS}?insightType=${insightType}`,
    prompt,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
  return response.data;
};

/**
 * Get all AI insights
 */
export const getAIInsights = async () => {
  const response = await api.get(API_ENDPOINTS.AI_INSIGHTS);
  return response.data;
};

/**
 * Get AI insights by type
 */
export const getAIInsightsByType = async (type) => {
  const response = await api.get(API_ENDPOINTS.AI_INSIGHTS_BY_TYPE(type));
  return response.data;
};

/**
 * Delete AI insight
 */
export const deleteAIInsight = async (id) => {
  const response = await api.delete(API_ENDPOINTS.AI_INSIGHTS_DELETE(id));
  return response.data;
};