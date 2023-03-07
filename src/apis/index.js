import Axios from "axios";

const masterKey = `$2b$10$.hDUtFyoMibYehgjHVbIpep5UEHeKHdhPkA9TFCiqlLlccP/c7Y6G`;

const axios = Axios.create({
  baseURL: process.env.SERVER_HOST,
  timeout: 30000,
  responseType: "json",
  headers: {
    Content_Type: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
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
    const { data } = await axios.get("/server-status");

    return payload;
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
