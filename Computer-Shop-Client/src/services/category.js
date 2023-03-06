import api from './config/API/index';

const fetch = {
    getAllCategory: async () => {
        let response = await api.get(`category`);
        return response;
    },
    getDetailCategory: async (id) => {
        let response = await api.get(`category/${id}`);
        return response;
    },
    createCategory: async (category) => {
        let response = await api.post(`category`, category);
        return response;
    },
    updateCategory: async (id, category) => {
        let response = await api.put(`category/${id}`, category);
        return response;
    },
    deleteCategory: async (id) => {
        let response = await api.delete(`category/${id}`);
        return response;
    },
};

export default fetch;
