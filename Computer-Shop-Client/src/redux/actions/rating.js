import constantsRating from '../constants/rating';
import fetch from '../../services/rating';
import helpers from '@/utils/helpers';

const actions = {
    getAllRating: (productId) => async (dispatch) => {
        try {
            dispatch({
                type: constantsRating.RATING_ALL_REQUEST,
            });

            const { data } = await fetch.getRating(productId);
            dispatch({
                type: constantsRating.RATING_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsRating.RATING_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin đánh giá thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin đánh giá thất bại', error.message);
        }
    },

    createRating: (productId, rating) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsRating.RATING_CREATE_REQUEST,
            });

            const { data } = await fetch.createRating(productId, rating);

            dispatch({
                type: constantsRating.RATING_CREATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Đánh giá', 'Tạo đánh giá thành công');
        } catch (error) {
            dispatch({
                type: constantsRating.RATING_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Tạo đánh giá thất bại', error.response.data.message)
                : helpers.openNotificationError('Tạo đánh giá thất bại', error.message);
        }
    },
};

export default actions;
