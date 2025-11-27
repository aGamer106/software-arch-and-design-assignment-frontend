import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches your Spring Boot Controller
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;