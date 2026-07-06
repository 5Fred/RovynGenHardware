import axios from 'axios';

// Connects directly to your Express server running on port 5000
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;