import { STORAGE_KEYS } from "../utils/constants";




/**
 * Get JWT token from localStorage
 * @returns {string|null} JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Set JWT token in localStorage
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

/**
 * Check if user is authenticated by validating JWT token
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    // Decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // Convert to milliseconds

    // Check if token is expired
    if (Date.now() >= expiration) {
      removeToken();
      removeUser();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null} User object or null
 */
export const getUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);

  if (!userStr || userStr === "undefined") return null;

  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error("Invalid user JSON:", userStr);
    return null;
  }
};



/**
 * Set user data in localStorage
 * @param {object} user - User object to store
 */
export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Get user role from stored user data
 * @returns {string|null} User role or null
 */
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

/**
 * Check if user has a specific role
 * @param {string} role - Role to check
 * @returns {boolean} True if user has the role
 */
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Check if user is admin
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
  return hasRole('ADMIN');
};

/**
 * Logout - clear all authentication data
 */
export const logout = () => {
  removeToken();
  removeUser();
};

/**
 * Get token expiration time
 * @returns {number|null} Expiration timestamp or null
 */
export const getTokenExpiration = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};

/**
 * Get time until token expires (in milliseconds)
 * @returns {number|null} Time until expiration or null
 */
export const getTimeUntilExpiration = () => {
  const expiration = getTokenExpiration();
  if (!expiration) return null;

  const timeLeft = expiration - Date.now();
  return timeLeft > 0 ? timeLeft : 0;
};

/**
 * Check if token is about to expire (within 5 minutes)
 * @returns {boolean} True if token expires soon
 */
export const isTokenExpiringSoon = () => {
  const timeLeft = getTimeUntilExpiration();
  if (!timeLeft) return false;

  const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds
  return timeLeft <= FIVE_MINUTES;
};

/**
 * Decode JWT token payload
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload or null
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Get user ID from token
 * @returns {string|null} User ID or null
 */
export const getUserIdFromToken = () => {
  const token = getToken();
  const payload = decodeToken(token);
  return payload?.userId || payload?.sub || null;
};

/**
 * Clear all app data from localStorage
 */
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
