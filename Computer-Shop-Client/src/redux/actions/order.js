import fetch from '@/services/order';
import constantsOrder from '../constants/order';
import constantsCart from '../constants/cart';
import helpers from '@/utils/helpers';
import constants from '@/utils/constants';

const actions = {
    createOrder: (order, cartItems) => async (dispatch, getState) => {
        try {
            dispatch({ type: constantsOrder.ORDER_CREATE_RESET });
            const { data } = await fetch.createOrder(order);
            let orderDetails = [];
            for (let i = 0; i < cartItems.length; i++) {
                orderDetails.push({
                    order_id: data.data.id,
                    detail_qty: cartItems[i].qty,
                    detail_price: cartItems[i].price,
                    product_id: cartItems[i].product_id,
                });
            }
            await fetch.addDetailOrder(orderDetails);
            dispatch({
                type: constantsOrder.ORDER_CREATE_SUCCESS,
                payload: data,
            });
            dispatch({ type: constantsCart.CART_RESET });
            localStorage.removeItem('cartItems');
            helpers.openNotificationSucces('Đặt hàng thành công', 'Vui lòng check mail để xem đơn hàng');
            window.location.href = constants.ROUTES.CART;
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Đặt hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Đặt hàng thất bại', error.message);
        }
    },

    getAllOrder: () => async (dispatch) => {
        try {
            dispatch({
                type: constantsOrder.ORDER_LISTS_REQUEST,
            });

            const { data } = await fetch.getAllOrder();
            dispatch({
                type: constantsOrder.ORDER_LISTS_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_LISTS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin đơn hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin đơn hàng thất bại', error.message);
        }
    },

    getMyOrder: (userId) => async (dispatch) => {
        try {
            dispatch({
                type: constantsOrder.ORDER_MY_LIST_REQUEST,
            });

            const { data } = await fetch.getMyOrder(userId);
            dispatch({
                type: constantsOrder.ORDER_MY_LIST_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_MY_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin đơn hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin đơn hàng thất bại', error.message);
        }
    },

    getDetailOrder: (id) => async (dispatch) => {
        try {
            dispatch({
                type: constantsOrder.ORDER_DETAILS_REQUEST,
            });

            const { data } = await fetch.getDetailOrder(id);

            dispatch({
                type: constantsOrder.ORDER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin đơn hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin đơn hàng thất bại', error.message);
        }
    },

    updateStatusOrder: (id) => async (dispatch) => {
        try {
            dispatch({
                type: constantsOrder.ORDER_UPDATE_STATUS_REQUEST,
            });

            const { data } = await fetch.updateStatusOrder(id);

            dispatch({
                type: constantsOrder.ORDER_UPDATE_STATUS_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật đơn hành', 'Cập nhật đơn hành thành công');
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_UPDATE_STATUS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Cập nhật thông tin đơn hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Cập nhật thông tin đơn hàng thất bại', error.message);
        }
    },

    cancelOrder: (id) => async (dispatch) => {
        try {
            dispatch({
                type: constantsOrder.ORDER_CANCEL_REQUEST,
            });

            const { data } = await fetch.CancelOrder(id);

            dispatch({
                type: constantsOrder.ORDER_CANCEL_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Cập nhật đơn hành', 'Hủy đơn hành thành công');
        } catch (error) {
            dispatch({
                type: constantsOrder.ORDER_CANCEL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Hủy đơn hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Hủy đơn hàng thất bại', error.message);
        }
    },
};

export default actions;
