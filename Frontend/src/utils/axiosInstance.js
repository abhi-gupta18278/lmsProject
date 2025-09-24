import axios from "axios";

const base_url =import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = base_url;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
