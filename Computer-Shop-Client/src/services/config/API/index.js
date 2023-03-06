import axios from 'axios';
import helpers from '@/utils/helpers';

const api = axios.create({
    baseURL: 'http://localhost:8081/api/',
});

api.interceptors.request.use(
    (config) => {
        if (helpers.isAuthenticated()) {
            config.headers['Authorization'] = 'Bearer ' + helpers.isAuthenticated();
            config.headers['x-access-token'] = helpers.isAuthenticated();
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

export default api;
