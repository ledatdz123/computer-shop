import constantsBrand from '../constants/brand';
import fetch from '../../services/brand';
import helpers from '@/utils/helpers';

const actions = {
    getAllBrand: () => async (dispatch) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_ALL_REQUEST,
            });

            const { data } = await fetch.getAllBrand();
            dispatch({
                type: constantsBrand.BRAND_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin thương hiệu thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin thương hiệu thất bại', error.message);
        }
    },

    getBrandDetail: (id) => async (dispatch, getState) => {
        try {
            dispatch({ type: constantsBrand.BRAND_DETAIL_REQUEST });

            const { data } = await fetch.getDetailBrand(id);

            dispatch({
                type: constantsBrand.BRAND_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin thương hiệu thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin thương hiệu thất bại', error.message);
        }
    },

    deleteBrand: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_DELETE_REQUEST,
            });

            await fetch.deleteBrand(id);

            dispatch({
                type: constantsBrand.BRAND_DELETE_SUCCESS,
            });
            helpers.openNotificationSucces('Cập nhật thương hiệu', 'Xóa thương hiệu thành công');
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Xóa thương hiệu thất bại', error.response.data.message)
                : helpers.openNotificationError('Xóa thương hiệu thất bại', error.message);
        }
    },

    updatedBrand: (brand) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_UPDATE_REQUEST,
            });

            const { data } = await fetch.updateBrand(brand.id, brand);

            dispatch({
                type: constantsBrand.BRAND_UPDATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật thương hiệu', 'Chỉnh sửa thương hiệu thành công');
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Cập nhật thương hiệu thất bại', error.response.data.message)
                : helpers.openNotificationError('Cập nhật thương hiệu thất bại', error.message);
        }
    },

    createBrand: (brand) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsBrand.BRAND_CREATE_REQUEST,
            });

            const { data } = await fetch.createBrand(brand);

            dispatch({
                type: constantsBrand.BRAND_CREATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật thương hiệu', 'Tạo thương hiệu thành công');
        } catch (error) {
            dispatch({
                type: constantsBrand.BRAND_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Tạo thương hiệu thất bại', error.response.data.message)
                : helpers.openNotificationError('Tạo thương hiệu thất bại', error.message);
        }
    },
};

export default actions;
