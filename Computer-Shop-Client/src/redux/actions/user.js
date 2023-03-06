import constantsUser from './../constants/user';
import fetch from './../../services/user';
import helpers from '@/utils/helpers';

const actions = {
    getAllUser: () => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_LIST_REQUEST,
            });

            const { data } = await fetch.getAllUser();

            dispatch({
                type: constantsUser.USER_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsUser.USER_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError(
                      'Lấy thông tin thông tin người dùng thất bại',
                      error.response.data.message,
                  )
                : helpers.openNotificationError('Lấy thông tin thông tin người dùng thất bại', error.message);
        }
    },

    getUserDetails: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_DETAIL_REQUEST,
            });

            const { data } = await fetch.getDetailUser(id);

            dispatch({
                type: constantsUser.USER_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsUser.USER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError(
                      'Lấy thông tin thông tin người dùng thất bại',
                      error.response.data.message,
                  )
                : helpers.openNotificationError('Lấy thông tin thông tin người dùng thất bại', error.message);
        }
    },

    updateUser: (user) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_UPDATE_REQUEST,
            });

            const { data } = await fetch.updateUser(user.id, user);

            dispatch({
                type: constantsUser.USER_UPDATE_SUCCESS,
            });
            dispatch({ type: constantsUser.USER_DETAIL_SUCCESS, payload: data });
            helpers.openNotificationSucces(
                'Cập nhật thông tin người dùng',
                'Chỉnh sửa thông tin người dùng thành công',
            );
        } catch (error) {
            dispatch({
                type: constantsUser.USER_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Cập nhật thông tin người dùng thất bại', error.response.data.message)
                : helpers.openNotificationError('Cập nhật thông tin người dùng thất bại', error.message);
        }
    },

    deleteUser: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_DELETE_REQUEST,
            });

            await fetch.deleteUser(id);

            dispatch({
                type: constantsUser.USER_DELETE_SUCCESS,
            });
            helpers.openNotificationSucces('Xóa tài khoản người dùng', 'Xóa tài khoản người dùng thành công');
        } catch (error) {
            dispatch({
                type: constantsUser.USER_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Xóa tài khoản người dùng thất bại', error.response.data.message)
                : helpers.openNotificationError('Xóa tài khoản người dùng thất bại', error.message);
        }
    },
    createUser: (user) => async (dispatch, getState) => {
        try {
            dispatch({
                type: constantsUser.USER_CREATE_REQUEST,
            });

            await fetch.createUser(user);

            dispatch({
                type: constantsUser.USER_CREATE_SUCCESS,
            });
            helpers.openNotificationSucces('Tạo tài khoản người dùng', 'Tạo tài khoản người dùng thành công');
        } catch (error) {
            dispatch({
                type: constantsUser.USER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Tạo tài khoản người dùng thất bại', error.response.data.message)
                : helpers.openNotificationError('Tạo tài khoản người dùng thất bại', error.message);
        }
    },
};

export default actions;
