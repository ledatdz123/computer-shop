import api from './config/API/index';

const fetch = {
    annualDate: async (startDate, endDate) => {
        let response = await api.get(`report/date?startDate=${startDate}&endDate=${endDate}`);
        return response;
    },
    annualProduct: async () => {
        let response = await api.get(`report/topfiveproduct`);
        return response;
    },
};

export default fetch;
