import api from './config/API/index';

const fetch = {
    getAllBrand: async () => {
        let response = await api.get(`brand`);
        return response;
    },
    getDetailBrand: async (id) => {
        let response = await api.get(`brand/${id}`);
        return response;
    },
    createBrand: async (brands) => {
        let response = await api.post(`brand`, brands);
        return response;
    },
    updateBrand: async (id, brands) => {
        let response = await api.put(`brand/${id}`, brands);
        return response;
    },
    deleteBrand: async (id) => {
        let response = await api.delete(`brand/${id}`);
        return response;
    },
};

export default fetch;
