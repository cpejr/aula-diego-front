import axios from "axios";

const api = axios.create({
  baseURL: "127.0.0.1:3001",
});

export default api;
