import axios from 'axios';



const api = axios.create({
    baseURL: 'https://server-ecoleta.marconwillian.dev'
});


export default api;