import axios from "axios"

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`, (commented out until api token is determined)
}
});

export default axiosInstance;

