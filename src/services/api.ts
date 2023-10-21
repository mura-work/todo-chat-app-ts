import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000,
});

export default instance;
