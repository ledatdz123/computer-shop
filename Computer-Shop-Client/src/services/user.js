import api from './config/API/index';

const fetch = {
    getDetailUser: async (userId) => {
        let response = await api.get(`user/${userId}`);
        return response;
    },
    getAllUser: async () => {
        let response = await api.get(`user`);
        return response;
    },
    createUser: async (user) => {
        let response = await api.post(`user/user`, user);
        return response;
    },
    updateUser: async (userId, user) => {
        let response = await api.put(`user/update/${userId}`, user);
        return response;
    },
    deleteUser: async (userId) => {
        let response = await api.get(`user/delete/${userId}`);
        return response;
    },
};

export default fetch;
