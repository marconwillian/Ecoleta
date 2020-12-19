import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server-ecoleta.marconwillian.dev:8080'
});

export default api;