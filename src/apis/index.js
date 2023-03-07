import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/api',
  timeout: 30000,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

const api = {
  async healthCheck() {
    try {
      const options = {
        method: 'GET',
        url: '/',
      };
      const response = await axios(options);

      return response;
    } catch (error) {
      throw error;
    }
  },
  async gpt(prompt) {
    try {
      const options = {};
    } catch (error) {
      throw error;
    }
  },
};

export default api;
