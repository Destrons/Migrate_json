import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Ajuste para a URL do backend Laravel
    timeout: 5000,
});

export default api;
