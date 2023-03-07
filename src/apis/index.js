import Axios from "axios";

const masterKey = `$2b$10$.hDUtFyoMibYehgjHVbIpep5UEHeKHdhPkA9TFCiqlLlccP/c7Y6G`;

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
    const { data } = await axios.get("/service-status");

    return data;
  },
  async getGPTStatus() {
    // GPT 요청 가능 체크
    return (await axios.get("/gpt-status")).data;
  },
  async createCounseling(userName) {
    return (await axios.post("/counselings", { userName })).data;
  },
  async getCounseling(pid) {
    //
    const { data } = await axios.get(`/counselings/${pid}`);

    return data;
  },
  async patchCounseling({ attempt, pid, messages, parameters }) {
    const { data } = await axios.patch(`/counselings/${pid}`, {
      // isContext === true 고, role === user일 경우에만 gpt 요청
      attempt: attempt,
      messages,
      parameters,
    });

    return data;
  },
};

export default api;
