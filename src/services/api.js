import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:6969",
  baseURL: "https://aula-diego.herokuapp.com",
});

export default api;
