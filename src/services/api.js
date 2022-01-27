import axios from "axios";

const serverIp = "http://137.184.39.55";
const serverPort = "3001";

const api = axios.create({
  baseURL: `${serverIp}:${serverPort}`,
});

export default api;
