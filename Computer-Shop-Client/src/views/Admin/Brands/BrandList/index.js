import React from 'react';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip, Typography, Popconfirm } from 'antd';
import actionsBrand from '@/redux/actions/brand';
import * as Redux from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';
import BrandEditModal from '../BrandEdit/';
import BrandCreateModal from '../BrandCreate';

const { Title } = Typography;

export default function BrandList() {
    const dispatch = Redux.useDispatch();
    const [editModal, setEditModal] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);

    // event: Lấy toàn bộ danh sách sản phẩm
    const brandAll = Redux.useSelector((state) => state.brandAll);
    const { loading, brands } = brandAll;

    // event: cập nhật sản phẩm
    const onCloseEditModal = () => {
        setEditModal(false);
        dispatch(actionsBrand.getAllBrand());
    };

    const onOpenEditModal = (id) => {
        setEditModal(true);
        dispatch(actionsBrand.getBrandDetail(id));
    };

    const onCloseCreateModal = () => {
        setCreateModal(false);
        dispatch(actionsBrand.getAllBrand());
    };

    // Cột của bảng
    const columns = [
        {
            title: 'Mã',
            key: 'id',
            dataIndex: 'id',
            render: (id) => <p>{id}</p>,
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
            render: (name) => <Tooltip title={name}>{name}</Tooltip>,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            fixed: 'right',
            width: 120,
            render: (brand) => (
                <div className="flex justify-around items-center">
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined
                            onClick={() => {
                                onOpenEditModal(brand.id);
                            }}
                            className="action-btn-product text-blue-500 text-base"
                        />
                    </Tooltip>

                    <Tooltip title="Xóa" placement="left">
                        <Popconfirm
                            title="Không thể khôi phục được, bạn có chắc muốn xoá ?"
                            placement="topRight"
                            onConfirm={() => {
                                dispatch(actionsBrand.deleteBrand(brand.id));
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
                    <div className="mb-8 flex justify-between items-center">
                        <Title level={3}>NHÃN HIỆU</Title>
                        <Button
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                                setCreateModal(true);
                            }}
                        >
                            Thêm nhãn hiệu
                        </Button>
                    </div>
                    {/* table show brand list */}
                    <Table
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
                            showSizeChanger: false,
                        }}
                        className="admin-see-product"
                        columns={columns}
                        dataSource={brands}
                    />
                    {/* edit Brand modal */}
                    <BrandEditModal onClose={onCloseEditModal} visible={editModal} />

                    <BrandCreateModal onClose={onCloseCreateModal} visible={createModal} />
                </div>
            )}
        </>
    );
}
