import axios from "axios";

const api = axios.create({
  baseURL: "https://auladiegoback.herokuapp.com",
});

export default api;
