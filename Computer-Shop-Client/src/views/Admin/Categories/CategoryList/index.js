import React from 'react';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip, Typography, Popconfirm } from 'antd';
import actionsCategory from '@/redux/actions/category';
import * as Redux from 'react-redux';
import GlobalLoading from '@/components/Loading/Global';
import CategoryEditModal from '../CategoryEdit';
import CategoryCreateModal from '../CategoryCreate';

const { Title } = Typography;

export default function CategoryList() {
    const dispatch = Redux.useDispatch();
    const [editModal, setEditModal] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);

    // event: Lấy toàn bộ danh sách sản phẩm
    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { loading, categories } = categoryAll;

    // event: cập nhật sản phẩm
    const onCloseEditModal = () => {
        setEditModal(false);
        dispatch(actionsCategory.getAllCategory());
    };

    const onOpenEditModal = (id) => {
        setEditModal(true);
        dispatch(actionsCategory.getCategoryDetail(id));
    };

    const onCloseCreateModal = () => {
        setCreateModal(false);
        dispatch(actionsCategory.getAllCategory());
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
            title: 'Hành động',
            key: 'Thao tác',
            fixed: 'right',
            width: 120,
            render: (category) => (
                <div className="flex justify-around items-center">
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined
                            onClick={() => {
                                onOpenEditModal(category.id);
                            }}
                            className="action-btn-product text-blue-500 text-base"
                        />
                    </Tooltip>

                    <Tooltip title="Xóa" placement="left">
                        <Popconfirm
                            title="Không thể khôi phục được, bạn có chắc muốn xoá ?"
                            placement="topRight"
                            onConfirm={() => {
                                dispatch(actionsCategory.deleteCategory(category.id));
                            }}
                            okText="xác nhận"
                            cancelText="hủy"
                        >
                            <DeleteOutlined className=" action-btn-product text-red-500 text-base" />
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
                        <Title level={3}>THỂ LOẠI</Title>
                        <Button
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                                setCreateModal(true);
                            }}
                        >
                            Thêm thể loại
                        </Button>
                    </div>
                    {/* table show category list */}
                    <Table
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
                            showSizeChanger: false,
                        }}
                        className="admin-see-product"
                        columns={columns}
                        dataSource={categories}
                    />
                    {/* edit category modal */}
                    <CategoryEditModal onClose={onCloseEditModal} visible={editModal} />

                    <CategoryCreateModal onClose={onCloseCreateModal} visible={createModal} />
                </div>
            )}
        </>
    );
}
