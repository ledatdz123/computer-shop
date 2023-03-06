import api from './config/API/index';

const fetch = {
    getFilterProducts: async (page, size, categoryId) => {
        let response = await api.get(`product/getbycategory?page=${page}&size=${size}&categoryId=${categoryId}`);
        return response;
    },
    getAllProduct: async () => {
        let response = await api.get(`product/all`);
        return response;
    },
    getListProduct: async (page) => {
        let response = await api.get(`product?page=${page}`);
        return response;
    },
    getDetailProduct: async (id) => {
        let response = await api.get(`product/${id}`);
        return response;
    },
    createProduct: async (product) => {
        let response = await api.post(`product`, product);
        return response;
    },
    updateProduct: async (product) => {
        let response = await api.put(`product`, product);
        return response;
    },
    deleteProduct: async (id) => {
        let response = await api.delete(`product/${id}`);
        return response;
    },
    searchProduct: async (keyWord) => {
        let response = await api.get(`product/search?keyword=${keyWord}`);
        return response;
    },
};

export default fetch;
