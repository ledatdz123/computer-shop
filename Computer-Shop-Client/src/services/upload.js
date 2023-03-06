import api from './config/mediaAPI';

const fetch = {
    uploadImage: async (image) => {
        let response = await api.post(`upload/cloudinary`);
        return response;
    },
};

export default fetch;
