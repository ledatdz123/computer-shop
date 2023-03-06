import constantsAuth from './../constants/auth';
import constantsCart from './../constants/cart';
import constantsUser from './../constants/user';
import fetch from '../../services/auth';
import helpers from '@/utils/helpers';
import constants from '@/utils/constants';

const actions = {
    login: (account) => async (dispatch) => {
        try {
            dispatch({
                type: constantsAuth.AUTH_LOGIN_REQUEST,
            });

            const { data } = await fetch.login(account);

            dispatch({
                type: constantsAuth.AUTH_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            await localStorage.setItem('accessToken', JSON.stringify(data.token));
            helpers.openNotificationSucces('Đăng nhập thành công', 'Chào mừng bạn dến với TTB Store');
        } catch (error) {
            dispatch({
                type: constantsAuth.AUTH_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Đăng nhập thất bại', error.response.data.message)
                : helpers.openNotificationError('Đăng nhập thất bại', error.message);
        }
    },

    register: (email, password, roles) => async (dispatch) => {
        try {
            dispatch({
                type: constantsAuth.AUTH_REGISTER_REQUEST,
            });

            const { data } = await fetch.register(email, password, roles);

            dispatch({
                type: constantsAuth.AUTH_REGISTER_SUCCESS,
                payload: data,
            });

            helpers.openNotificationSucces('Đăng ký thành công', 'Chào mừng bạn dến với TTB Store');
            window.location.href = constants.ROUTES.LOGIN;
        } catch (error) {
            dispatch({
                type: constantsAuth.AUTH_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Đăng ký thất bại', error.response.data.message)
                : helpers.openNotificationError('Đăng ký thất bại', error.message);
        }
    },

    logout: () => async (dispatch) => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingInfo');
        dispatch({ type: constantsAuth.AUTH_PROFILE_RESET });
        dispatch({ type: constantsCart.CART_RESET });
        dispatch({ type: constantsUser.USER_LIST_RESET });
        dispatch({ type: constantsAuth.AUTH_LOGOUT });
        window.location.href = constants.ROUTES.LOGIN;
    },
};

export default actions;
