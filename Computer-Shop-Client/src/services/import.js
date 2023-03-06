import api from './config/API/index';

const fetch = {
    getAllImport: async () => {
        let response = await api.get(`imports`);
        return response;
    },
    getDetailImport: async (importId) => {
        let response = await api.get(`dtimport/${importId}`);
        return response;
    },
    createImport: async (userId) => {
        let response = await api.post(`imports/add`, userId);
        return response;
    },
    addDetailImport: async (importItem) => {
        let response = await api.post(`dtimport/add`, importItem);
        return response;
    },
    deleteImport: async (importId) => {
        let response = await api.put(`imports/delete/${importId}`);
        return response;
    },
    deleteImportDetail: async (importId) => {
        let response = await api.put(`dtimport/delete/${importId}`);
        return response;
    },
};

export default fetch;
