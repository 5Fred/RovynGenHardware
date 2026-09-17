import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://rovyngenhardware.onrender.com';

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

export default API;