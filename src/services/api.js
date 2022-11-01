import axios from 'axios';

const api = axios.create({
    baseURL : "https://localhost:7038/"
})

export default api;