import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export const loginNow = async (email, password) => {
  try {    const response = await api.post('/login', {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      // Ensure we have the required data
      const data = response.data;
      if (!data.token) {
        throw new Error('No authentication token received');
      }

      // Return the response data which includes token and possibly user info
      return data;
    }

    throw new Error(response.data?.message || 'Login failed. Please try again.');
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to the server. Please try again later or contact support.');
    }
    
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid email or password. Please try again.');
      }
      throw new Error(error.response.data?.message || 'Login failed. Please try again.');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'An error occurred. Please try again.');
    }
  }
};
