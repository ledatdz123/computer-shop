import { Avatar, Card, Popconfirm, Popover, Spin, Table, Tag, Tooltip } from 'antd';
// import adminApi from 'apis/adminApi';
import helpers from '@/utils/helpers';
import React from 'react';
import * as Redux from 'react-redux';
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
    VerticalAlignTopOutlined,
} from '@ant-design/icons';
import actionsOrder from '@/redux/actions/order';

function OrderList() {
    const dispatch = Redux.useDispatch();
    const orderLists = Redux.useSelector((state) => state.orderLists);
    const { loading, orders } = orderLists;
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

    const orderStatus = Redux.useSelector((state) => state.orderStatus);

    const orderCancel = Redux.useSelector((state) => state.orderCancel);

    React.useEffect(() => {
        dispatch(actionsOrder.getAllOrder());
    }, [dispatch, orderStatus.success, orderCancel.success]);

    const columns = [
        {
            title: 'khách hàng',
            key: 'id_user',
            dataIndex: 'id_user',
        },
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
                    {order.status !== 'Delivered' || order.status === 'Canceled' ? (
                        <Tooltip title="Đổi trạng thái" placement="left">
                            <Popconfirm
                                title="Không thể khôi phục được, bạn có chắc muốn xoá ?"
                                placement="topRight"
                                onConfirm={() => {
                                    dispatch(actionsOrder.updateStatusOrder(order.id));
                                }}
                                okText="xác nhận"
                                cancelText="hủy"
                            >
                                <VerticalAlignTopOutlined className="action-btn-product text-blue-500 text-base" />
                            </Popconfirm>
                        </Tooltip>
                    ) : (
                        <div></div>
                    )}

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

    return (
        <>
            {loading ? (
                <Spin className="trans-center" tip="Đang lấy danh sách đơn hàng ..." />
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
            )}
        </>
    );
}

export default OrderList;
