import constants from './../constants/cart';
import fetch from '../../services/product';
import helpers from '@/utils/helpers';

const actions = {
    addItemToCart: (id, qty) => async (dispatch, getState) => {
        const { data } = await fetch.getDetailProduct(id);
        dispatch({
            type: constants.CART_ADD_ITEM,
            payload: {
                product_id: data.id,
                name: data.name,
                price: data.price,
                image: data.image,
                quantity: data.quantity,
                qty: qty > data.quantity ? data.quantity : qty,
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        helpers.openNotificationSucces('Thêm sản phẩm vào giỏ hàng thành công');
    },

    updateItemToCart: (id, qty) => async (dispatch, getState) => {
        const { data } = await fetch.getDetailProduct(id);
        dispatch({
            type: constants.CART_UPDATE_ITEM,
            payload: {
                product_id: data.id,
                name: data.name,
                price: data.price,
                image: data.image,
                quantity: data.quantity,
                qty,
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        helpers.openNotificationSucces('Cập nhật sản phẩm vào giỏ hàng thành công');
    },

    removeItemFromCart: (id) => async (dispatch, getState) => {
        dispatch({
            type: constants.CART_REMOVE_ITEM,
            payload: {
                id,
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        helpers.openNotificationSucces('Xóa sản phẩm khỏi giỏ hàng thành công');
    },

    resetCart: () => async (dispatch) => {
        dispatch({ type: constants.CART_RESET });
        localStorage.removeItem('cartItems');
    },

    saveShippingInfo: (data) => async (dispatch, getState) => {
        dispatch({
            type: constants.CART_SAVE_SHIPPING_INFO,
            payload: data,
        });
        localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo));
        helpers.openNotificationSucces('Thêm thông tin cá nhân thành công');
    },
};

export default actions;
