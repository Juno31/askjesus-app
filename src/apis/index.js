import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.SERVER_HOST,
  timeout: 100000,
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
    // 우리 서버 헬스체크
    try {
      const { data } = await axios.get("/service-status");

      return data;
    } catch (error) {
      throw error;
    }
  },
  async getGPTStatus() {
    // GPT 요청 가능 체크
    try {
      const { data } = await axios.get("/gpt-healthcheck");

      return data;
    } catch (error) {
      throw error;
    }
  },
  async createCounseling(userName) {
    return (await axios.post("/counselings", { userName })).data;
  },
  async getCounseling(pid) {
    //
    const { data } = await axios.get(`/counselings/${pid}`);

    return data;
  },
  async patchCounseling(pid, attempt) {
    const { data } = await axios.patch(`/counselings/${pid}`, {
      attempt: attempt,
    });

    return data;
  },

  async registerParameters(pid, key, value) {
    try {
      const { data } = await axios.post(`/counselings/${pid}/parameters`, {
        key: key,
        value: value,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async createCounselingMessages({ pid, isContext, role, content }) {
    try {
      const { data } = await axios.post(`/counselings/${pid}/messages`, {
        isContext,
        role,
        content,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
