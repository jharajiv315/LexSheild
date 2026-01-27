import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  healthCheck: async () => {
    try {
      const response = await axios.get(`${API_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  },
  
  analyze: async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/analyze`, data);
      return response.data;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    }
  }
};
