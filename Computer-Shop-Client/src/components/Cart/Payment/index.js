import { Button, Spin } from 'antd';
import constants from '@/utils/constants';
import helpers from '@/utils/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CartPayment(props) {
    const { cartItems, isCheckout, transportFee, onCheckout, isLoading, method } = props;
    // giá tạm tính
    const tempPrice = cartItems.reduce(
        // (a, b) => a + (b.price + (b.price * b.discount) / 100) * b.amount,
        (a, b) => a + b.price * b.qty,
        0,
    );
    // tổng khuyến mãi
    // const totalDiscount = cartItems.reduce(
    //   (a, b) => a + ((b.price * b.discount) / 100) * b.amount,
    //   0,
    // );

    const totalDiscount = 0;

    // const paypalOptions = {
    //     "client-id": ,
    //     currency: "VND",
    //     intent: "capture",
    //     "data-client-token": "abc123xyz==",
    // };

    // rendering ...
    return (
        <div className="Payment bg-white p-16">
            <h2 className="m-b-8">Tiến hành thanh toán</h2>
            <div className="d-flex justify-content-between m-b-6">
                <span className="font-size-16px" style={{ color: '#aaa' }}>
                    Tạm tính
                </span>
                <b>{helpers.formatProductPrice(tempPrice)}</b>
            </div>
            <div className="d-flex justify-content-between m-b-6">
                <span className="font-size-16px" style={{ color: '#aaa' }}>
                    Phí vận chuyển
                </span>
                <b>{helpers.formatProductPrice(transportFee)}</b>
            </div>
            <div className="d-flex justify-content-between m-b-6">
                <span className="font-size-16px" style={{ color: '#aaa' }}>
                    Giảm giá
                </span>
                <b>{helpers.formatProductPrice(totalDiscount)}</b>
            </div>
            <div className="d-flex justify-content-between">
                <span className="font-size-16px" style={{ color: '#aaa' }}>
                    Thành tiền
                </span>
                <b style={{ color: 'red', fontSize: 20 }}>
                    {helpers.formatProductPrice(tempPrice - totalDiscount + transportFee)}
                </b>
            </div>
            <div className="t-end">
                <span style={{ color: '#aaa', fontSize: 16 }}>{`(Đã bao gồm VAT)`}</span>
            </div>

            {isCheckout && method === 'COD' ? (
                <Button
                    onClick={onCheckout}
                    className="m-t-16 d-block m-lr-auto w-100"
                    type="primary"
                    size="large"
                    style={{ backgroundColor: '#3555c5', color: '#fff' }}
                >
                    ĐẶT HÀNG NGAY
                </Button>
            ) : !isCheckout ? (
                <Link to={constants.ROUTES.PAYMENT}>
                    <Button
                        className="m-t-16 d-block m-lr-auto w-100"
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#3555c5', color: '#fff' }}
                    >
                        THANH TOÁN
                    </Button>
                </Link>
            ) : (
                <></>
            )}
        </div>
    );
}

CartPayment.defaultProps = {
    cartItems: [],
    isCheckout: false, // cờ kiểm tra có phải ở trang checkout để lập đơn hàng hay k
    transportFee: 15000,
    isLoading: false,
};

CartPayment.propTypes = {
    cartItems: PropTypes.array,
    isCheckout: PropTypes.bool,
    transportFee: PropTypes.number,
    onCheckout: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default CartPayment;
