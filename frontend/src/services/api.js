/**
 * API service for communicating with the House Price Prediction backend.
 * Uses axios to make HTTP requests to the FastAPI server.
 */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Sends property data to the backend and returns the predicted price.
 * @param {Object} formData - The property details with numeric values.
 * @param {number} formData.avg_area_income
 * @param {number} formData.avg_area_house_age
 * @param {number} formData.avg_area_number_of_rooms
 * @param {number} formData.avg_area_number_of_bedrooms
 * @param {number} formData.area_population
 * @returns {Promise<{predicted_price: number}>} The predicted price from the model.
 * @throws {Error} A descriptive error message if the request fails.
 */
export const predict = async (formData) => {
  try {
    const payload = {
      avg_area_income: parseFloat(formData.avg_area_income),
      avg_area_house_age: parseFloat(formData.avg_area_house_age),
      avg_area_number_of_rooms: parseFloat(formData.avg_area_number_of_rooms),
      avg_area_number_of_bedrooms: parseFloat(formData.avg_area_number_of_bedrooms),
      area_population: parseFloat(formData.area_population),
    };

    const response = await apiClient.post('/predict', payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const detail = error.response.data?.detail;

      if (status === 422) {
        throw new Error(
          `Validation error: ${detail || 'Please check your input values and try again.'}`
        );
      }
      throw new Error(
        `Server error (${status}): ${detail || 'An unexpected error occurred on the server.'}`
      );
    }

    if (error.request) {
      throw new Error(
        'Network error: Unable to reach the prediction server. Please check your connection and try again.'
      );
    }

    throw new Error(`Request failed: ${error.message}`);
  }
};
