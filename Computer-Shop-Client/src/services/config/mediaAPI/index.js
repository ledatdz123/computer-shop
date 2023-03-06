import axios from 'axios';
import helpers from '@/utils/helpers';

const mediaAPI = axios.create({
    baseURL: `http://localhost:8081/api/`,
});

mediaAPI.interceptors.request.use(
    (config) => {
        if (helpers.isAuthenticated()) {
            config.headers['Authorization'] = 'Bearer ' + helpers.isAuthenticated();
            config.headers['x-access-token'] = helpers.isAuthenticated();
        }
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

export default mediaAPI;
