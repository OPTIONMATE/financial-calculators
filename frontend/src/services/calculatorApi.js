import axios from 'axios';
import { API_BASE_URL } from '../constants/calculators';

/**
 * Calculator API Service
 * All API calls centralized here
 */

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

/**
 * Calculate using specific calculator
 */
export const calculate = async (calculatorType, inputs) => {
  try {
    const response = await api.post(`/calculators/${calculatorType}/calculate`, inputs);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get calculation history
 */
export const getHistory = async (calculatorType, limit = 10) => {
  try {
    const response = await api.get(`/calculators/${calculatorType}/history`, {
      params: { limit }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get usage statistics
 */
export const getStats = async () => {
  try {
    const response = await api.get('/calculators/stats');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Health check
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  calculate,
  getHistory,
  getStats,
  healthCheck
};
