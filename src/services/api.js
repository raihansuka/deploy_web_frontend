import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ganti dengan URL backend Anda
});

export default api;
