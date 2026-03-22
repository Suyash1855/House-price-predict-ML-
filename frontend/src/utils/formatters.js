/**
 * Utility functions for formatting numbers and currency values.
 */

/**
 * Formats a numeric value as USD currency (no decimals).
 * @param {number} value - The number to format.
 * @returns {string} The formatted currency string, e.g. "$1,348,888".
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a numeric value with commas and a specified number of decimal places.
 * @param {number} value - The number to format.
 * @param {number} [decimals=2] - The number of decimal places.
 * @returns {string} The formatted number string, e.g. "79,545.46".
 */
export const formatNumber = (value, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};
