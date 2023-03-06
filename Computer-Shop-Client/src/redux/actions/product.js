import constants from './../constants/product';
import fetch from '../../services/product';
import helpers from '@/utils/helpers';

const actions = {
    getFilterProducts: (page, size, categoryId) => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_FILTER_REQUEST,
            });

            const { data } = await fetch.getFilterProducts(page, size, categoryId);

            dispatch({
                type: constants.PRODUCT_FILTER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_FILTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.message);
        }
    },

    getListProducts: (page) => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_LIST_REQUEST,
            });

            const { data } = await fetch.getListProduct(page);

            dispatch({
                type: constants.PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.message);
        }
    },

    getAllProducts: () => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_ALL_REQUEST,
            });

            const { data } = await fetch.getAllProduct();
            dispatch({
                type: constants.PRODUCT_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.message);
        }
    },

    getDetailProduct: (id) => async (dispatch) => {
        try {
            dispatch({
                type: constants.PRODUCT_DETAIL_REQUEST,
            });

            const { data } = await fetch.getDetailProduct(id);

            dispatch({
                type: constants.PRODUCT_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin sản phẩm thất bại', error.message);
        }
    },

    deleteProduct: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constants.PRODUCT_DELETE_REQUEST,
            });

            await fetch.deleteProduct(id);

            dispatch({
                type: constants.PRODUCT_DELETE_SUCCESS,
            });
            helpers.openNotificationSucces('Cập nhật sản phẩm', 'Xóa sản phẩm thành công');
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Câp nhật sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Câp nhật sản phẩm thất bại', error.message);
        }
    },

    updateProduct: (product) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constants.PRODUCT_UPDATE_REQUEST,
            });

            const { data } = await fetch.updateProduct( product);

            dispatch({
                type: constants.PRODUCT_UPDATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật sản phẩm', 'Chỉnh sửa sản phẩm thành công');
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Cập nhật sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Cập nhật sản phẩm thất bại', error.message);
        }
    },

    createProduct: (product) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constants.PRODUCT_CREATE_REQUEST,
            });

            const { data } = await fetch.createProduct(product);

            dispatch({
                type: constants.PRODUCT_CREATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật sản phẩm', 'Tạo sản phẩm thành công');
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Cập nhật sản phẩm thất bại', error.response.data.message)
                : helpers.openNotificationError('Cập nhật sản phẩm thất bại', error.message);
        }
    },
};

export default actions;
