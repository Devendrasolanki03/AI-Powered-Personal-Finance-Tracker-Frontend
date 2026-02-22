import api from './axios';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Login user
 */
export const login = async (credentials) => {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
};

/**
 * Register new user
 */
export const register = async (userData) => {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
    const response = await api.get(API_ENDPOINTS.USER_ME);
    return response.data;
};

/**
 * Google OAuth login URL
 */
export const getGoogleAuthUrl = () => {
    return `${API_ENDPOINTS.GOOGLE_AUTH}`;
};


