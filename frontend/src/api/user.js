import axios from 'axios';
import backendConnection from './backend.js';

// Helper function to get token
const getToken = () => {
  return sessionStorage.getItem('Token') || sessionStorage.getItem('token');
};

// Helper function to clear authentication
const clearAuth = () => {
  sessionStorage.removeItem('Token');
  sessionStorage.removeItem('token');
  // Optional: redirect to login page
  // window.location.href = '/login';
};

export const getUser = async () => {
  const token = getToken();
  if (!token) {
    clearAuth();
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${backendConnection()}/api/user/info`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      validateStatus: (status) => status < 500 // Don't throw for 4xx errors
    });

    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });

    if (response.status === 200) {
      return response.data.user;
    }

    // Handle specific status codes
    switch (response.status) {
      case 401:
      case 403:
        clearAuth();
        throw new Error(response.data?.message || 'Authentication failed');
      
      case 404:
        throw new Error('User endpoint not found');
      
      default:
        throw new Error(response.data?.message || `Request failed with status ${response.status}`);
    }

  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });

    // Handle specific error types
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please try again');
      }
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
          case 403:
            clearAuth();
            throw new Error(data?.message || 'Authentication required');
            
          case 500:
            // Log server error details for debugging
            console.error('Server 500 Error:', data);
            throw new Error(data?.message || 'Server error - please try again later');
            
          default:
            throw new Error(data?.message || `Request failed with status ${status}`);
        }
      }
      
      if (error.request) {
        throw new Error('Network error - please check your connection');
      }
    }
    
    throw error;
  }
};

// Optional: Add retry mechanism for transient errors
export const getUserWithRetry = async (maxRetries = 2) => {
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await getUser();
    } catch (error) {
      if (attempt > maxRetries || 
          error.message.includes('Authentication') || 
          error.message.includes('denied')) {
        throw error;
      }
      
      console.log(`Retry attempt ${attempt}/${maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};