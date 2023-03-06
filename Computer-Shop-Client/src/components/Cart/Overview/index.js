import actionsCart from '@/redux/actions/cart';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import React from 'react';
import './index.scss';

function CartOverview(props) {
    const dispatch = useDispatch();
    const { cartItems } = props;

    // event: xoá 1 sản phẩm trong cart
    const onDelCartItem = (id) => {
        dispatch(actionsCart.removeItemFromCart(id));
    };

    // event: cập nhật số lượng sản phẩm trong cart
    const onUpdateNumOfProd = (id, qty) => {
        dispatch(actionsCart.updateItemToCart(id, qty));
    };

    // rendering...
    return (
        <>
            {cartItems.map((item) => (
                <div key={item.id} className="m-b-12">
                    <CartItem {...item} onDelCartItem={onDelCartItem} onUpdateNumOfProd={onUpdateNumOfProd} />
                </div>
            ))}
        </>
    );
}

CartOverview.defaultProps = {
    cartItems: [],
};

CartOverview.propTypes = {
    cartItems: PropTypes.array,
};

export default CartOverview;
