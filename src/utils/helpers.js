// import { format, parseISO } from 'date-fns';
// import { DATE_FORMATS } from './constants';

// /**
//  * Format currency
//  */
// export const formatCurrency = (amount, currency = 'INR') => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// /**
//  * Format date
//  */
// export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
//   if (!date) return '';
//   try {
//     const dateObj = typeof date === 'string' ? parseISO(date) : date;
//     return format(dateObj, formatStr);
//   } catch (error) {
//     console.error('Date formatting error:', error);
//     return '';
//   }
// };

// /**
//  * Format number with commas
//  */
// export const formatNumber = (num) => {
//   return new Intl.NumberFormat('en-IN').format(num);
// };

// /**
//  * Calculate percentage
//  */
// export const calculatePercentage = (value, total) => {
//   if (total === 0) return 0;
//   return ((value / total) * 100).toFixed(1);
// };

// /**
//  * Get category color
//  */
// export const getCategoryColor = (categories, categoryId) => {
//   const category = categories.find(cat => cat.id === categoryId);
//   return category ? category.color : '#8b5cf6';
// };

// /**
//  * Get category icon
//  */
// export const getCategoryIcon = (categories, categoryId) => {
//   const category = categories.find(cat => cat.id === categoryId);
//   return category ? category.icon : '📦';
// };

// /**
//  * Truncate text
//  */
// export const truncateText = (text, maxLength = 50) => {
//   if (text.length <= maxLength) return text;
//   return text.substring(0, maxLength) + '...';
// };

// /**
//  * Debounce function
//  */
// export const debounce = (func, wait) => {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

// /**
//  * Generate random ID
//  */
// export const generateId = () => {
//   return Math.random().toString(36).substring(2, 9);
// };

// /**
//  * Group expenses by category
//  */
// export const groupByCategory = (expenses) => {
//   return expenses.reduce((acc, expense) => {
//     const categoryId = expense.category?.id || expense.categoryId;
//     if (!acc[categoryId]) {
//       acc[categoryId] = {
//         categoryId,
//         categoryName: expense.category?.name || 'Unknown',
//         total: 0,
//         count: 0,
//         expenses: [],
//       };
//     }
//     acc[categoryId].total += expense.amount;
//     acc[categoryId].count += 1;
//     acc[categoryId].expenses.push(expense);
//     return acc;
//   }, {});
// };

// /**
//  * Sort array by date
//  */
// export const sortByDate = (arr, key = 'date', order = 'desc') => {
//   return [...arr].sort((a, b) => {
//     const dateA = new Date(a[key]);
//     const dateB = new Date(b[key]);
//     return order === 'desc' ? dateB - dateA : dateA - dateB;
//   });
// };

// /**
//  * Filter by date range
//  */
// export const filterByDateRange = (arr, startDate, endDate, key = 'date') => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   return arr.filter(item => {
//     const itemDate = new Date(item[key]);
//     return itemDate >= start && itemDate <= end;
//   });
// };

// /**
//  * Calculate total
//  */
// export const calculateTotal = (arr, key = 'amount') => {
//   return arr.reduce((sum, item) => sum + (item[key] || 0), 0);
// };

// /**
//  * Get greeting based on time
//  */
// export const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return 'Good Morning';
//   if (hour < 17) return 'Good Afternoon';
//   return 'Good Evening';
// };

// /**
//  * Validate email
//  */
// export const isValidEmail = (email) => {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// };

// /**
//  * Get initials from name
//  */
// export const getInitials = (name) => {
//   if (!name) return 'U';
//   return name
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase()
//     .substring(0, 2);
// };
// import { format } from 'date-fns';
// import { CURRENCY, DATE_FORMATS } from './constants';

// /**
//  * Format number as currency
//  * @param {number} amount - Amount to format
//  * @returns {string} Formatted currency string
//  */
// export const formatCurrency = (amount) => {
//   if (amount === null || amount === undefined) return `${CURRENCY.SYMBOL}0`;

//   return new Intl.NumberFormat(CURRENCY.LOCALE, {
//     style: 'currency',
//     currency: CURRENCY.CODE,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// /**
//  * Calculate total from array of objects with 'amount' property
//  * @param {Array} items - Array of income/expense objects
//  * @returns {number} Total amount
//  */
// export const calculateTotal = (items) => {
//   if (!Array.isArray(items) || items.length === 0) return 0;

//   return items.reduce((total, item) => {
//     const amount = parseFloat(item.amount) || 0;
//     return total + amount;
//   }, 0);
// };

// /**
//  * Format date for display
//  * @param {string|Date} date - Date to format
//  * @param {string} formatStr - Format string (default: DISPLAY)
//  * @returns {string} Formatted date string
//  */
// export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
//   if (!date) return '';

//   try {
//     const dateObj = typeof date === 'string' ? new Date(date) : date;
//     return format(dateObj, formatStr);
//   } catch (error) {
//     console.error('Error formatting date:', error);
//     return '';
//   }
// };

// /**
//  * Format date for input field (yyyy-MM-dd)
//  * @param {string|Date} date - Date to format
//  * @returns {string} Formatted date string
//  */
// export const formatDateForInput = (date) => {
//   if (!date) return '';

//   try {
//     const dateObj = typeof date === 'string' ? new Date(date) : date;
//     return format(dateObj, DATE_FORMATS.INPUT);
//   } catch (error) {
//     console.error('Error formatting date for input:', error);
//     return '';
//   }
// };

// /**
//  * Calculate percentage
//  * @param {number} value - Current value
//  * @param {number} total - Total value
//  * @returns {number} Percentage (0-100)
//  */
// export const calculatePercentage = (value, total) => {
//   if (!total || total === 0) return 0;
//   return Math.round((value / total) * 100);
// };

// /**
//  * Group items by category
//  * @param {Array} items - Array of expense objects
//  * @returns {Object} Object with categories as keys
//  */
// export const groupByCategory = (items) => {
//   if (!Array.isArray(items)) return {};

//   return items.reduce((acc, item) => {
//     const category = item.category || item.categoryName || 'Others';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(item);
//     return acc;
//   }, {});
// };

// /**
//  * Sort items by date (newest first)
//  * @param {Array} items - Array of objects with date property
//  * @param {string} dateField - Name of date field (default: 'date')
//  * @returns {Array} Sorted array
//  */
// export const sortByDate = (items, dateField = 'date') => {
//   if (!Array.isArray(items)) return [];

//   return [...items].sort((a, b) => {
//     const dateA = new Date(a[dateField] || a.expenseDate || a.incomeDate);
//     const dateB = new Date(b[dateField] || b.expenseDate || b.incomeDate);
//     return dateB - dateA; // Newest first
//   });
// };

// /**
//  * Get greeting based on time of day
//  * @returns {string} Greeting message
//  */
// export const getGreeting = () => {
//   const hour = new Date().getHours();

//   if (hour < 12) return 'Good morning';
//   if (hour < 18) return 'Good afternoon';
//   return 'Good evening';
// };

// /**
//  * Validate email format
//  * @param {string} email - Email to validate
//  * @returns {boolean} True if valid
//  */
// export const isValidEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// /**
//  * Validate password strength
//  * @param {string} password - Password to validate
//  * @returns {Object} Validation result
//  */
// export const validatePassword = (password) => {
//   const minLength = 8;
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   const isValid =
//     password.length >= minLength &&
//     hasUpperCase &&
//     hasLowerCase &&
//     hasNumber;

//   return {
//     isValid,
//     errors: [
//       password.length < minLength && `Password must be at least ${minLength} characters`,
//       !hasUpperCase && 'Password must contain at least one uppercase letter',
//       !hasLowerCase && 'Password must contain at least one lowercase letter',
//       !hasNumber && 'Password must contain at least one number',
//     ].filter(Boolean),
//   };
// };

// /**
//  * Truncate text to specified length
//  * @param {string} text - Text to truncate
//  * @param {number} maxLength - Maximum length
//  * @returns {string} Truncated text
//  */
// export const truncateText = (text, maxLength = 50) => {
//   if (!text || text.length <= maxLength) return text;
//   return `${text.substring(0, maxLength)}...`;
// };

// /**
//  * Get category color by name
//  * @param {string} categoryName - Category name
//  * @returns {string} Color hex code
//  */
// export const getCategoryColor = (categoryName) => {
//   const categoryColors = {
//     'Food & Dining': '#ef4444',
//     'Transportation': '#3b82f6',
//     'Entertainment': '#a855f7',
//     'Shopping': '#ec4899',
//     'Healthcare': '#22c55e',
//     'Education': '#f59e0b',
//     'Bills & Utilities': '#06b6d4',
//     'Others': '#8b5cf6',
//   };

//   return categoryColors[categoryName] || '#8b5cf6';
// };

// /**
//  * Debounce function
//  * @param {Function} func - Function to debounce
//  * @param {number} wait - Wait time in milliseconds
//  * @returns {Function} Debounced function
//  */
// export const debounce = (func, wait = 300) => {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

// /**
//  * Get budget status based on percentage
//  * @param {number} percentage - Budget usage percentage
//  * @returns {Object} Status with color and text
//  */
// export const getBudgetStatus = (percentage) => {
//   if (percentage >= 100) {
//     return {
//       status: 'exceeded',
//       color: 'danger',
//       text: 'Budget Exceeded',
//       bgColor: 'bg-danger-500/10',
//       textColor: 'text-danger-500',
//     };
//   }
//   if (percentage >= 90) {
//     return {
//       status: 'critical',
//       color: 'danger',
//       text: 'Critical',
//       bgColor: 'bg-danger-500/10',
//       textColor: 'text-danger-500',
//     };
//   }
//   if (percentage >= 70) {
//     return {
//       status: 'warning',
//       color: 'warning',
//       text: 'Warning',
//       bgColor: 'bg-yellow-500/10',
//       textColor: 'text-yellow-500',
//     };
//   }
//   return {
//     status: 'safe',
//     color: 'success',
//     text: 'On Track',
//     bgColor: 'bg-accent-500/10',
//     textColor: 'text-accent-500',
//   };
// };

// /**
//  * Format large numbers (1000 -> 1K, 1000000 -> 1M)
//  * @param {number} num - Number to format
//  * @returns {string} Formatted number
//  */
// export const formatLargeNumber = (num) => {
//   if (num >= 1000000) {
//     return `${(num / 1000000).toFixed(1)}M`;
//   }
//   if (num >= 1000) {
//     return `${(num / 1000).toFixed(1)}K`;
//   }
//   return num.toString();
// };
// /**
//  * Get initials from name
//  * @param {string} name
//  * @returns {string}
//  */
// export const getInitials = (name) => {
//   if (!name || typeof name !== 'string') return 'U';

//   return name
//     .trim()
//     .split(/\s+/)
//     .map(word => word.charAt(0))
//     .join('')
//     .toUpperCase()
//     .slice(0, 2);
// };

import { format, parseISO } from 'date-fns';
import { CURRENCY, DATE_FORMATS, EXPENSE_CATEGORIES } from './constants';

/**
 * Format number as currency
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return `${CURRENCY.SYMBOL}0`;

  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculate total from array of objects with 'amount' property
 */
export const calculateTotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) return 0;

  return items.reduce((total, item) => {
    const amount = parseFloat(item.amount) || 0;
    return total + amount;
  }, 0);
};

/**
 * Group expenses by category with totals
 */
export const groupByCategory = (expenses) => {
  if (!Array.isArray(expenses)) return {};

  const grouped = {};

  expenses.forEach(expense => {
    // Get category name from categoryId or category object
    let categoryName = 'Others';

    if (expense.category?.name) {
      categoryName = expense.category.name;
    } else if (expense.categoryId) {
      const category = EXPENSE_CATEGORIES.find(cat => cat.id === expense.categoryId);
      categoryName = category ? category.name : 'Others';
    } else if (expense.categoryName) {
      categoryName = expense.categoryName;
    }

    if (!grouped[categoryName]) {
      grouped[categoryName] = {
        categoryName,
        total: 0,
        count: 0,
        expenses: [],
      };
    }

    const amount = parseFloat(expense.amount) || 0;
    grouped[categoryName].total += amount;
    grouped[categoryName].count += 1;
    grouped[categoryName].expenses.push(expense);
  });

  return grouped;
};

/**
 * Format date for display
 */
export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date for input field (yyyy-MM-dd)
 */
export const formatDateForInput = (date) => {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, DATE_FORMATS.INPUT);
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Sort items by date (newest first)
 */
export const sortByDate = (items, dateField = 'date') => {
  if (!Array.isArray(items)) return [];

  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField] || a.expenseDate || a.incomeDate);
    const dateB = new Date(b[dateField] || b.expenseDate || b.incomeDate);
    return dateB - dateA; // Newest first
  });
};

/**
 * Get greeting based on time of day
 */
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'U';

  return name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  const isValid =
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber;

  return {
    isValid,
    errors: [
      password.length < minLength && `Password must be at least ${minLength} characters`,
      !hasUpperCase && 'Password must contain at least one uppercase letter',
      !hasLowerCase && 'Password must contain at least one lowercase letter',
      !hasNumber && 'Password must contain at least one number',
    ].filter(Boolean),
  };
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get category color by ID or name
 */
export const getCategoryColor = (categoryIdOrName) => {
  let category;

  if (typeof categoryIdOrName === 'number') {
    category = EXPENSE_CATEGORIES.find(cat => cat.id === categoryIdOrName);
  } else {
    category = EXPENSE_CATEGORIES.find(cat => cat.name === categoryIdOrName);
  }

  return category ? category.color : '#8b5cf6';
};

/**
 * Get category icon by ID or name
 */
export const getCategoryIcon = (categoryIdOrName) => {
  let category;

  if (typeof categoryIdOrName === 'number') {
    category = EXPENSE_CATEGORIES.find(cat => cat.id === categoryIdOrName);
  } else {
    category = EXPENSE_CATEGORIES.find(cat => cat.name === categoryIdOrName);
  }

  return category ? category.icon : '📦';
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get budget status based on percentage
 */
export const getBudgetStatus = (percentage) => {
  if (percentage >= 100) {
    return {
      status: 'exceeded',
      color: 'danger',
      text: 'Budget Exceeded',
      bgColor: 'bg-danger-500/10',
      textColor: 'text-danger-500',
    };
  }
  if (percentage >= 90) {
    return {
      status: 'critical',
      color: 'danger',
      text: 'Critical',
      bgColor: 'bg-danger-500/10',
      textColor: 'text-danger-500',
    };
  }
  if (percentage >= 70) {
    return {
      status: 'warning',
      color: 'warning',
      text: 'Warning',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-500',
    };
  }
  return {
    status: 'safe',
    color: 'success',
    text: 'On Track',
    bgColor: 'bg-accent-500/10',
    textColor: 'text-accent-500',
  };
};

/**
 * Format large numbers (1000 -> 1K, 1000000 -> 1M)
 */
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};