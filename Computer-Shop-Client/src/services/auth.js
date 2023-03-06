import api from './config/API/index';

const fetch = {
    login: async (account) => {
        let response = await api.post(`auth/signin`, account);
        return response;
    },
    register: async (email, password, roles) => {
        let response = await api.post(`auth/signup`, { email, password, roles });
        return response;
    },
};

export default fetch;
