import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    CreditCardOutlined,
    DollarCircleOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    StopOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Spin, Table, Tooltip, Result, Popover, Popconfirm, Tag, Card, Avatar } from 'antd';
// import orderApi from 'apis/orderApi';
import helpers from '@/utils/helpers';
import React, { useState } from 'react';
import userLogo from '@/assets/icon/user_32px.png';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CompassOutlined, NotificationOutlined, ReconciliationOutlined, UserOutlined } from '@ant-design/icons';
import constants from '@/utils/constants';
import actionsOrder from '@/redux/actions/order';

function OrderList() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const authLogin = useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;
    const orderCancel = useSelector((state) => state.orderCancel);
    const orderMyList = useSelector((state) => state.orderMyList);
    const { loading, orders } = orderMyList;
    const text = <span>Chi tiết đơn hàng</span>;
    const content = (orderDetail) => {
        return (
            <div>
                {orderDetail &&
                    orderDetail.map((item) => (
                        <Card key={item.detail_id}>
                            <Card.Meta
                                avatar={
                                    <Tooltip title={item.detail_id}>
                                        <Avatar size={48} shape="square" src={item.image} alt="Photo" />
                                    </Tooltip>
                                }
                                title={<Tooltip title={item.name}>{helpers.reduceProductName(item.name, 40)}</Tooltip>}
                                description={
                                    <>
                                        <span>{`Số lượng: ${item.detailQty}`}</span>
                                        <p className="font-size-16px font-weight-700">
                                            {helpers.formatProductPrice(item.detailPrice)}
                                        </p>
                                    </>
                                }
                            />
                        </Card>
                    ))}
            </div>
        );
    };

    React.useEffect(() => {
        dispatch(actionsOrder.getMyOrder(userInfo.id));
    }, [orderCancel.success]);

    const [activeKey, setActiveKey] = useState(() => pathname.replace(`${constants.ROUTES.PROFILE}`, ''));
    // menu list
    const menu = [
        {
            Icon: <UserOutlined className="icon m-r-12 font-size-24px" />,
            title: 'Thông tin tài khoản',
            key: '',
        },
        {
            Icon: <ReconciliationOutlined className="icon m-r-12 font-size-24px" />,
            title: 'Quản lý đơn hàng',
            key: '/orders',
        },
        {
            Icon: <CompassOutlined className="icon m-r-12 font-size-24px" />,
            title: 'Địa chỉ giao hàng',
            key: '/addresses',
        },
        {
            Icon: <NotificationOutlined className="icon m-r-12 font-size-24px" />,
            title: 'Thông báo',
            key: '/notifications',
        },
    ];

    // các cột cho bảng danh sách đơn hàng
    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Mã đơn hàng',
            key: 'id',
            dataIndex: 'id',
            render: (v) => <a>{v}</a>,
        },
        {
            title: 'Ngày đặt',
            key: 'ngaydat',
            dataIndex: 'ngaydat',
            sorter: (a, b) => {
                if (a.ngaydat > b.ngaydat) return 1;
                if (a.ngaydat < b.ngaydat) return -1;
                return 0;
            },
        },
        {
            title: 'Phương thức',
            key: 'payment',
            dataIndex: 'payment',
            filters: [
                {
                    text: 'COD',
                    value: 'COD',
                },
                {
                    text: 'paypal',
                    value: 'paypal',
                },
            ],
            onFilter: (value, record) => record.payment.indexOf(value) === 0,
            render: (payment, record) => (
                <Tooltip
                    title={payment === 'COD' ? 'Thanh toán tiền mặt' : 'thanh toán bằng paypal'}
                    className={'flex items-center gap-2'}
                >
                    {payment === 'COD' ? <DollarCircleOutlined /> : <CreditCardOutlined />} {payment}
                </Tooltip>
            ),
        },
        {
            title: 'Số điện thoại',
            key: 'phone',
            dataIndex: 'phone',
            render: (phone, record) => <Tooltip title={phone}>{phone}</Tooltip>,
        },
        {
            title: 'Tổng tiền',
            key: 'total_price',
            dataIndex: 'total_price',
            render: (value) => <b style={{ color: '#333' }}>{helpers.formatProductPrice(value)}</b>,
            sorter: (a, b) => a.total_price - b.total_price,
        },
        {
            title: 'Trạng thái đơn hàng',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            filters: [
                {
                    text: 'Pending',
                    value: 'Pending',
                },
                {
                    text: 'Shipping',
                    value: 'Shipping',
                },
                {
                    text: 'Delivered',
                    value: 'Delivered',
                },
                {
                    text: 'Canceled',
                    value: 'Canceled',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (status) => {
                return status === 'Pending' ? (
                    <Tag icon={<ExclamationCircleOutlined />} color="warning" className="px-4 py-2">
                        {status}
                    </Tag>
                ) : status === 'Shipping' ? (
                    <Tag icon={<ClockCircleOutlined />} color="processing" className="px-4 py-2">
                        {status}
                    </Tag>
                ) : status === 'Delivered' ? (
                    <Tag icon={<CheckCircleOutlined />} color="success" className="px-4 py-2">
                        {status}
                    </Tag>
                ) : status === 'Canceled' ? (
                    <Tag icon={<CloseCircleOutlined />} color="error" className="px-4 py-2">
                        {status}
                    </Tag>
                ) : (
                    <Tag icon={<InfoCircleOutlined />} color="default" className="px-4 py-2">
                        Có gì đó sai sai
                    </Tag>
                );
            },
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'center',
            render: (order) => (
                <div className="flex justify-around items-center">
                    <Tooltip title="Xem chi tiết" placement="left">
                        <Popover placement="left" title={text} content={content(order.order_details)} trigger="click">
                            <EyeOutlined className="action-btn-product text-green-500 text-base" />
                        </Popover>
                    </Tooltip>

                    {order.status === 'Pending' ? (
                        <Tooltip title="Hủy đơn hàng" placement="left">
                            <Popconfirm
                                title="Không thể khôi phục được, bạn có chắc muốn xoá ?"
                                placement="topRight"
                                onConfirm={() => {
                                    dispatch(actionsOrder.cancelOrder(order.id));
                                }}
                                okText="xác nhận"
                                cancelText="hủy"
                            >
                                <StopOutlined className="action-btn-product text-red-500 text-base" />
                            </Popconfirm>
                        </Tooltip>
                    ) : (
                        <div></div>
                    )}
                </div>
            ),
        },
    ];
    // fn: hiển thị danh sách đơn hàng
    function showOrderList(orders) {
        return orders && orders.length === 0 ? (
            <h3 className="m-t-16 t-center" style={{ color: '#888' }}>
                Hiện tại bạn chưa có đơn hàng nào
            </h3>
        ) : (
            <Table
                className="p-32"
                columns={columns}
                dataSource={orders}
                expandable={{
                    expandedRowRender: (order) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            Địa chỉ: {order.address}
                        </p>
                    ),
                }}
                pagination={{ showLessItems: true, position: ['bottomCenter'] }}
            />
        );
    }

    // rendering ...
    return (
        <>
            {!userInfo ? (
                <div style={{ minHeight: '82vh' }}>
                    <Result
                        title="Đăng nhập để xem thông tin"
                        extra={[
                            <Button type="primary" key="signup" className="btn-secondary">
                                <Link to={constants.ROUTES.SIGNUP}>Đăng ký</Link>
                            </Button>,
                            <Button type="primary" key="login">
                                <Link to={constants.ROUTES.LOGIN}>Đăng nhập</Link>
                            </Button>,
                        ]}
                    />
                </div>
            ) : (
                <Row className="account-page container m-tb-32">
                    <Col className="p-r-16" span={24} md={6}>
                        {/* giới thiệu */}
                        <div className="d-flex p-b-4 m-b-12 intro">
                            <img src={userLogo} width={32} height={32} className="m-r-12" alt="avatar" />
                            <div>
                                <span className="m-b-0 font-size-16px">Tài khoản của</span>
                                <h3>
                                    <b className="name">{userInfo.email}</b>
                                </h3>
                            </div>
                        </div>

                        {/* menu */}
                        <ul className="account-page-menu m-t-12">
                            {menu.map((item, index) => (
                                <Link key={index} to={constants.ROUTES.PROFILE + item.key}>
                                    <li
                                        className={`account-page-menu-item p-b-20 ${
                                            item.key === activeKey ? 'active' : ''
                                        }`}
                                        onClick={() => setActiveKey(item.key)}
                                    >
                                        {item.Icon}
                                        <span className="font-size-16px">{item.title}</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </Col>

                    <Col className="p-lr-8" span={24} md={18}>
                        {loading ? (
                            <Spin className="trans-center" tip="Đang lấy danh sách đơn hàng ..." />
                        ) : (
                            showOrderList(orders)
                        )}
                    </Col>
                </Row>
            )}
        </>
    );
}

export default OrderList;
