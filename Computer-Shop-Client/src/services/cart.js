import api from './config/API/index';

const fetch = {
    getCart: async (email) => {
        let response = await api.get(`cart/${email}`);
        return response;
    },
    createCart: async (email) => {
        let response = await api.post(`cart/${email}`);
        return response;
    },
    updateCart: async (email) => {
        let response = await api.put(`cart/${email}`);
        return response;
    },
    deleteCart: async (email) => {
        let response = await api.delete(`cart/${email}`);
        return response;
    },
};

export default fetch;
