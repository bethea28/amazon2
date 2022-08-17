import axios from "axios"
import { getTheCookie } from "./utils/cookies";

const token = getTheCookie("accessToken")

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`
}
});

export default axiosInstance;

