import constants from '../constants/cart';

export const CartReducer = (state = { cartItems: [], shippingInfo: [] }, action) => {
    switch (action.type) {
        case constants.CART_ADD_ITEM:
            const item = action.payload;
            const isItemExist = state.cartItems ? state.cartItems.find((i) => i.product_id === item.product_id) : null;
            if (isItemExist) {
                state.cartItems.map((i) => {
                    if (i.product_id === isItemExist.product_id) {
                        i.qty = i.qty + item.qty;
                        if (i.qty > item.quantity) {
                            i.qty = item.quantity;
                        }
                    }
                });
                return {
                    ...state,
                    cartItems: state.cartItems,
                };
            } else {
                if (state.cartItems) {
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item],
                    };
                } else {
                    return {
                        ...state,
                        cartItems: [item],
                    };
                }
            }

        case constants.CART_REMOVE_ITEM:
            let isItemRemove = state.cartItems.find((i) => i.product_id === action.payload.id);
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i !== isItemRemove),
            };

        case constants.CART_UPDATE_ITEM:
            const updateItem = action.payload;
            const isUpdateItemExist = state.cartItems.find((i) => i.product_id === updateItem.product_id);
            if (isUpdateItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product_id === isUpdateItemExist.product_id ? updateItem : i,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, updateItem],
                };
            }

        case constants.CART_SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: [action.payload],
            };

        case constants.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        case constants.CART_RESET:
            return {
                cartItems: [],
            };

        default:
            return state;
    }
};
