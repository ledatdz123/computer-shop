import constantsCategory from './../constants/category';
import fetch from '../../services/category';
import helpers from '@/utils/helpers';

const actions = {
    getAllCategory: () => async (dispatch) => {
        try {
            dispatch({
                type: constantsCategory.CATEGORY_ALL_REQUEST,
            });

            const { data } = await fetch.getAllCategory();

            dispatch({
                type: constantsCategory.CATEGORY_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsCategory.CATEGORY_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin thể loại thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin thể loại thất bại', error.message);
        }
    },

    getCategoryDetail: (id) => async (dispatch, getState) => {
        try {
            dispatch({ type: constantsCategory.CATEGORY_DETAIL_REQUEST });

            const { data } = await fetch.getDetailCategory(id);

            dispatch({
                type: constantsCategory.CATEGORY_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsCategory.CATEGORY_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin thể loại thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin thể loại thất bại', error.message);
        }
    },

    deleteCategory: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsCategory.CATEGORY_DELETE_REQUEST,
            });

            await fetch.deleteCategory(id);

            dispatch({
                type: constantsCategory.CATEGORY_DELETE_SUCCESS,
            });
            helpers.openNotificationSucces('Cập nhật thể loại', 'Xóa thể loại thành công');
        } catch (error) {
            dispatch({
                type: constantsCategory.CATEGORY_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Xóa thể loại thất bại', error.response.data.message)
                : helpers.openNotificationError('Xóa thể loại thất bại', error.message);
        }
    },

    updatedCategory: (category) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsCategory.CATEGORY_UPDATE_REQUEST,
            });

            const { data } = await fetch.updateCategory(category.id, category);

            dispatch({
                type: constantsCategory.CATEGORY_UPDATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật thể loại', 'Chỉnh sửa thể loại thành công');
        } catch (error) {
            dispatch({
                type: constantsCategory.CATEGORY_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Cập nhật thể loại thất bại', error.response.data.message)
                : helpers.openNotificationError('Cập nhật thể loại thất bại', error.message);
        }
    },

    createCategory: (category) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsCategory.CATEGORY_CREATE_REQUEST,
            });

            const { data } = await fetch.createCategory(category);

            dispatch({
                type: constantsCategory.CATEGORY_CREATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật thể loại', 'Tạo thể loại thành công');
        } catch (error) {
            dispatch({
                type: constantsCategory.CATEGORY_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Tạo thể loại thất bại', error.response.data.message)
                : helpers.openNotificationError('Tạo thể loại thất bại', error.message);
        }
    },
};

export default actions;
