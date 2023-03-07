import Axios from "axios";

const masterKey = `$2b$10$.hDUtFyoMibYehgjHVbIpep5UEHeKHdhPkA9TFCiqlLlccP/c7Y6G`;

const axios = Axios.create({
  baseURL: "https://hollister-api-prod.creator.ly",
  timeout: 30000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY ?? masterKey}`,
  },
});

const api = {
  async healthCheck() {
    try {
      const options = {
        method: "GET",
        url: "/",
      };
      const response = await axios(options);

      return response;
    } catch (error) {
      throw error;
    }
  },
  async getServerStatus() {
    return await axios.get("/server-status");
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
