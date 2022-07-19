import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    // Authorization: `Bearer ${token}`, (commented out until api token is determined)
  },
});

export default axiosInstance;
