import api from './config/API/index';

const fetch = {
    getAllOrder: async () => {
        let response = await api.get(`orders`);
        return response;
    },
    getDetailOrder: async (orderId) => {
        let response = await api.get(`detailorder/order/${orderId}`);
        return response;
    },
    getMyOrder: async (userId) => {
        let response = await api.get(`orders/user/${userId}`);
        return response;
    },
    createOrder: async (order) => {
        let response = await api.post(`orders/add`, order);
        return response;
    },
    addDetailOrder: async (orderItem) => {
        let response = await api.post(`/detailorder/add`, orderItem);
        return response;
    },
    updateStatusOrder: async (orderId) => {
        let response = await api.put(`orders/updateStatusStep/${orderId}`);
        return response;
    },
    CancelOrder: async (orderId) => {
        let response = await api.put(`orders/statusCancel/${orderId}`);
        return response;
    },
};

export default fetch;
