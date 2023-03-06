import { DeleteOutlined, EditOutlined, EyeOutlined, ImportOutlined, WarningOutlined } from '@ant-design/icons';
import { Table, Tooltip, Popconfirm } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import helpers from '@/utils/helpers';
import React, { useState } from 'react';
import EditProductModal from './ProductEditModal';
import * as Redux from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';
import actionsProduct from '@/redux/actions/product';
import ImportCreateModal from '../../Import/ImportCreate';

function generateFilter(list) {
    let result = [];
    list.map((item) => result.push({ value: item.id, text: item.name }));
    return result;
}

function SeeProduct() {
    const dispatch = Redux.useDispatch();
    const [editModal, setEditModal] = React.useState(false);
    const [importModal, setImportModal] = React.useState(false);
    // event: Lấy toàn bộ danh sách sản phẩm
    const productAll = Redux.useSelector((state) => state.productAll);
    const { loading, products } = productAll;

    // event: Lấy toàn bộ danh sách thể loại
    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { categories } = categoryAll;

    // event: Lấy toàn bộ danh sách thương hiệu
    const brandAll = Redux.useSelector((state) => state.brandAll);
    const { brands } = brandAll;

    // event: xoá sản phẩm
    const onDelete = async (id) => {
        // try {
        //   const response = await adminApi.removeProduct(_id);
        //   if (response && response.status === 200) {
        //     message.success('Xoá thành công.');
        //     const newList = list.filter((item) => item._id !== _id);
        //     setList(newList);
        //     // setTotal(total - 1);
        //   }
        // } catch (error) {
        //   message.error('Xoá thất bại, thử lại !');
        // }
    };

    // event: cập nhật sản phẩm
    const onCloseEditModal = () => {
        setEditModal(false);
        dispatch(actionsProduct.getAllProducts());
    };

    const onCloseImportModal = () => {
        setImportModal(false);
        dispatch(actionsProduct.getAllProducts());
    };

    // Cột của bảng
    const columns = [
        {
            title: 'Mã',
            key: 'id',
            dataIndex: 'id',
            render: (code, data) => (
                <a target="blank" href={`/product/${data._id}`}>
                    {code}
                </a>
            ),
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
            render: (name) => <Tooltip title={name}>{helpers.reduceProductName(name, 100)}</Tooltip>,
        },
        {
            title: 'Giá',
            key: 'price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: (price) => (
                <h3 style={{ color: '#4F55C5' }}>{price ? helpers.formatProductPrice(price) : 'Liên hệ'}</h3>
            ),
        },
        {
            title: 'Loại',
            key: 'categoryName',
            dataIndex: 'categoryName',
            filters: generateFilter(categories),
            onFilter: (value, record) => record.categoryId === value,
            render: (categoryName) => (
                <Tooltip title={categoryName}>{helpers.reduceProductName(categoryName, 40)}</Tooltip>
            ),
        },
        {
            title: 'Thương hiệu',
            key: 'brandName',
            dataIndex: 'brandName',
            filters: generateFilter(brands),
            onFilter: (value, record) => record.brandId === value,
            render: (brandName) => <Tooltip title={brandName}>{helpers.reduceProductName(brandName, 40)}</Tooltip>,
        },
        {
            title: 'Tồn kho',
            key: 'quantity',
            dataIndex: 'quantity',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.quantity - b.quantity,
        },

        // {
        //     title: 'Mức giảm giá',
        //     key: 'discount',
        //     dataIndex: 'discount',
        //     defaultSortOrder: 'ascend',
        //     sorter: (a, b) => a.discount - b.discount,
        //     render: (discount) => `${discount} %`,
        // },
        // {
        //     title: 'Đánh giá',
        //     key: 'rate',
        //     dataIndex: 'rate',
        //     render: (rate) => helpers.calStar(rate).toFixed(1),
        // },
        {
            title: 'Hành động',
            key: 'actions',
            fixed: 'right',
            width: 120,
            render: (product) => (
                <div className="flex justify-around items-center">
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined
                            onClick={() => {
                                setEditModal(true);
                                dispatch(actionsProduct.getDetailProduct(product.id));
                            }}
                            className="action-btn-product text-blue-500 text-base"
                        />
                    </Tooltip>

                    <Tooltip title="Xem chi tiết" placement="left">
                        <a target="blank" href={`/product/${product.id}`}>
                            <EyeOutlined className="action-btn-product text-green-500 text-base" />
                        </a>
                    </Tooltip>

                    <Tooltip title="Nhập hàng" placement="left">
                        <ImportOutlined
                            onClick={() => {
                                setImportModal(true);
                                dispatch(actionsProduct.getDetailProduct(product.id));
                            }}
                            className="action-btn-product text-yellow-500 text-base"
                        />
                    </Tooltip>

                    <Tooltip title="Xóa" placement="left">
                        <Popconfirm
                            title="Không thể khôi phục được, bạn có chắc muốn xoá ?"
                            placement="topRight"
                            onConfirm={() => {
                                dispatch(actionsProduct.deleteProduct(product.id));
                            }}
                            okText="xác nhận"
                            cancelText="hủy"
                        >
                            <DeleteOutlined className="action-btn-product text-red-500 text-base" />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    // rendering ...
    return (
        <>
            {loading ? (
                <GlobalLoading content="Đang tải danh sách sản phẩm ..." />
            ) : (
                <div className="p-32 max-w-100">
                    {/* table show product list */}
                    <Table
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
                            showSizeChanger: false,
                        }}
                        className="admin-see-product"
                        columns={columns}
                        dataSource={products}
                    />
                    {/* edit product modal */}
                    <EditProductModal onClose={onCloseEditModal} visible={editModal} />

                    <ImportCreateModal onClose={onCloseImportModal} visible={importModal} />
                </div>
            )}
        </>
    );
}

export default SeeProduct;
