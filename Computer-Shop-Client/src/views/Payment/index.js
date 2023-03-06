import { HomeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, message, Radio, Result, Row, Tooltip } from 'antd';
// import addressApi from 'apis/addressApi';
// import orderApi from 'apis/orderApi';
import CartPayment from '@/components/Cart//Payment';
import constants from '@/utils/constants';
import AddressUserList from '@/views/Profile/UserAddressList';
import helpers from '@/utils/helpers';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import actionsOrder from '@/redux/actions/order';
import constantsOrder from '@/redux/constants/order';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// fn: Lấy địa chỉ giao hàng của user theo index
const getUserDeliveryAdd = async (userId, index = 0) => {
    // try {
    //     const response = await addressApi.getDeliveryAddressList(userId, 1);
    //     if (response) {
    //         return response.data.list[index];
    //     }
    //     return null;
    // } catch (err) {
    //     return null;
    // }
};

function PaymentPage() {
    const tiGia = 23705;
    const dispatch = useDispatch();

    // ghi chú đơn hàng
    const note = useRef('');
    const addressIndex = useRef(-1);
    const [transport, setTransport] = useState(0);
    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingInfo } = cart;

    const authLogin = useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success } = orderCreate;

    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState('COD');
    // giá tạm tính
    // const tempPrice = carts.reduce((a, b) => a + (b.price + (b.price * b.discount) / 100) * b.amount, 0);
    const tempPrice = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
    const transportFee =
        tempPrice >= 1000000 ? 0 : constants.TRANSPORT_METHOD_OPTIONS.find((item) => item.value === transport).price;
    // fn: hiển thị danh sách đơn hàng

    // Note: Chưa kiểm tra tình trạng thật của sản phẩm trong db !
    function showOrderInfo(carts) {
        return carts.map((item, index) => (
            <Card key={index}>
                <Card.Meta
                    avatar={<Avatar size={48} shape="square" src={item.image} alt="Photo" />}
                    title={<Tooltip title={item.name}>{helpers.reduceProductName(item.name, 40)}</Tooltip>}
                    description={
                        <>
                            <span>{`Số lượng: ${item.qty}`}</span>
                            <p className="font-size-16px font-weight-700">{helpers.formatProductPrice(item.price)}</p>
                        </>
                    }
                />
            </Card>
        ));
    }

    // event: đặt hàng
    const onCheckout = async () => {
        const order = {
            payment: method,
            total_price: tempPrice + transportFee,
            id_user: userInfo.id,
            address: shippingInfo[0].address,
            phone: shippingInfo[0].phone,
        };
        dispatch(actionsOrder.createOrder(order, cartItems));
    };

    const paypalOptions = {
        'client-id': 'AToMDYxAeLI04CIAZexhSGN1hIhEJfxU2Z6C6_ON18NJa5s695k1WcfJa7FW6ytPQjwXP-EiCIgIBkZH',
        currency: 'USD',
        intent: 'capture',
    };

    // rendering ...
    return (
        <>
            {cartItems.length <= 0 && !success && <Navigate to={constants.ROUTES.CART} replace />}
            {userInfo ? (
                <div className="m-tb-32 container">
                    {success ? (
                        <Result
                            status="success"
                            title="Đơn hàng của bạn đã đặt thành công."
                            subTitle="Xem chi tiết đơn hàng vừa rồi"
                            extra={[
                                <Link to={constants.ROUTES.PROFILE + '/orders'}>
                                    <Button
                                        type="default"
                                        key="0"
                                        onClick={dispatch({ type: constantsOrder.ORDER_CREATE_RESET })}
                                    >
                                        Xem chi tiết đơn hàng
                                    </Button>
                                </Link>,
                                <Link to={constants.ROUTES.HOME}>
                                    <Button
                                        key="1"
                                        type="primary"
                                        onClick={dispatch({ type: constantsOrder.ORDER_CREATE_RESET })}
                                    >
                                        Tiếp tục mua sắm
                                    </Button>
                                </Link>,
                            ]}
                        />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {/* Đường dẫn */}
                            <Col span={24} className="d-flex page-position">
                                <Link to="/">
                                    <HomeOutlined
                                        className="p-12 icon-home font-size-16px bg-white"
                                        style={{ borderRadius: 50 }}
                                    />
                                </Link>
                                <span className="p-lr-8 font-weight-500" style={{ lineHeight: '40px' }}>{`>`}</span>
                                <span className="p-8 font-weight-500 bg-white" style={{ borderRadius: 50 }}>
                                    Tiến hành thanh toán
                                </span>
                            </Col>

                            {/* Thông tin giao hàng  */}
                            <Col span={24} md={16}>
                                {/* địa chỉ giao nhận, cách thức giao */}
                                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                    <h2>Thông tin giao hàng</h2>
                                    <Radio.Group
                                        defaultValue={transport}
                                        onChange={(v) => setTransport(v.target.value)}
                                        className="m-tb-8"
                                    >
                                        {constants.TRANSPORT_METHOD_OPTIONS.map((item, index) => (
                                            <Radio key={index} value={item.value}>
                                                {item.label}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                    <AddressUserList
                                        isCheckout={true}
                                        onChecked={(value) => (addressIndex.current = value)}
                                    />
                                </div>

                                {/* ghi chú */}
                                <div className="p-16 p-b-32 bg-white bor-rad-8">
                                    <h2 className="m-b-8">Ghi chú cho đơn hàng</h2>
                                    <Input.TextArea
                                        placeholder="Nhập thông tin ghi chú nhà bán"
                                        maxLength={200}
                                        showCount
                                        allowClear
                                        onChange={(value) => (note.current = value.target.value)}
                                    />
                                </div>

                                {/* phương thức thanh toán */}
                                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                    <h2 className="m-b-8">Phương thức thanh toán</h2>
                                    <p>Thông tin thanh toán của bạn sẽ luôn được bảo mật</p>
                                    <Row gutter={[16, 16]}>
                                        <Col
                                            span={24}
                                            md={12}
                                            onClick={() => {
                                                setMethod('COD');
                                            }}
                                        >
                                            <div
                                                className={`p-tb-8 p-lr-16 bg-gray cursor-pointer ${
                                                    method === 'COD' ? `item-active` : ``
                                                }`}
                                            >
                                                <b className="font-size-16px">Thanh toán khi nhận hàng</b>
                                                <p>Thanh toán bằng tiền mặt khi nhận hàng tại nhà hoặc showroom.</p>
                                            </div>
                                        </Col>
                                        <Col
                                            span={24}
                                            md={12}
                                            onClick={() => {
                                                setMethod('paypal');
                                            }}
                                        >
                                            <div
                                                className={`p-tb-8 p-lr-16 bg-gray cursor-pointer ${
                                                    method === 'paypal' ? `item-active` : ``
                                                }`}
                                            >
                                                <b className="font-size-16px">Thanh toán Online qua cổng VNPAY</b>
                                                <p>Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            {/* đặt hàng */}
                            <Col span={24} md={8}>
                                {/* thồng tin đơn hàng */}
                                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                    <div className="d-flex justify-content-between">
                                        <h2>Thông tin đơn hàng</h2>
                                        <Button type="link" size="large">
                                            <Link to={constants.ROUTES.CART}>Chỉnh sửa</Link>
                                        </Button>
                                    </div>
                                    <div>{showOrderInfo(cartItems)}</div>
                                </div>

                                {/* tiến hành đặt hàng */}
                                <div className="bg-white">
                                    <CartPayment
                                        transportFee={transportFee}
                                        isLoading={isLoading}
                                        cartItems={cartItems}
                                        isCheckout={true}
                                        onCheckout={onCheckout}
                                        method={method}
                                    />
                                    {method === 'paypal' && (
                                        <PayPalScriptProvider options={paypalOptions}>
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: `${Math.floor(
                                                                        (tempPrice + transportFee) / tiGia,
                                                                    )}`,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={async (data, actions) => {
                                                    const details = await actions.order.capture();
                                                    const name = details.payer.name.given_name;
                                                    alert('Transaction completed by ' + name);
                                                    helpers.openNotificationSucces(
                                                        'Giao dịch thành công',
                                                        'Đơn hàng đã được hanh toán bởi',
                                                    );
                                                    onCheckout();
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    )}
                                    <div className="t-center p-b-16">
                                        <span
                                            style={{
                                                color: '#ff5000',
                                            }}
                                        >{`(Xin vui lòng kiểm tra lại đơn hàng trước khi đặt mua)`}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            ) : (
                <Navigate to={constants.ROUTES.LOGIN} replace />
            )}
        </>
    );
}

export default PaymentPage;
