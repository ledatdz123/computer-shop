import { Button, Popconfirm, Spin, Table, Tag } from 'antd';
import React, { useState } from 'react';
import * as Redux from 'react-redux';
import actionsUser from '@/redux/actions/user';
import {
    IdcardOutlined,
    ManOutlined,
    StopOutlined,
    UserOutlined,
    WomanOutlined,
    EditOutlined,
} from '@ant-design/icons';
import UserEditModal from '../UserEdit';

function AdminUser() {
    const dispatch = Redux.useDispatch();

    const [modalEdit, setModalEdit] = useState(false);
    // event: Lấy toàn bộ danh sách sản phẩm
    const userList = Redux.useSelector((state) => state.userList);
    const { loading, users } = userList;

    const onCloseEditModal = () => {
        setModalEdit(false);
        dispatch(actionsUser.getAllUser());
    };

    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Họ tên',
            key: 'name',
            render: (user) => {
                return (
                    <div className="flex item-center gap-2">
                        <UserOutlined size={24} className={'mt-1'} />
                        <p className="mb-0">
                            {user.firstName} {user.lastName}
                        </p>
                    </div>
                );
            },
        },
        {
            title: 'Loại tài khoản',
            key: 'role',
            render: (user) => {
                return user.roles[0] === 'ROLE_USER' ? (
                    <Tag icon={<UserOutlined />} color="success" className="px-4 py-2">
                        Người dùng
                    </Tag>
                ) : user.roles[0] === 'ROLE_ADMIN' ? (
                    <Tag icon={<IdcardOutlined />} color="warning" className="px-4 py-2">
                        Quản lý
                    </Tag>
                ) : (
                    <Tag icon={<StopOutlined />} color="error" className="px-4 py-2">
                        Chặn
                    </Tag>
                );
            },
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Ngày sinh',
            key: 'birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Giới tính',
            key: 'gender',
            dataIndex: 'gender',
            render: (gender) => {
                return gender === 'MALE' ? (
                    <div className="flex item-center gap-2">
                        <ManOutlined size={24} className={'mt-1'} />
                        <p className="mb-0">Nam</p>
                    </div>
                ) : gender === 'FEMALE' ? (
                    <div className="flex item-center gap-2">
                        <WomanOutlined size={24} className={'mt-1'} />
                        <p className="mb-0">Nữ</p>
                    </div>
                ) : (
                    <p className="mb-0">LGBT</p>
                );
            },
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (user) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setModalEdit(true);
                        dispatch(actionsUser.getUserDetails(user.id));
                    }}
                >
                    Cập nhật
                </Button>
            ),
        },
    ];

    return (
        <>
            {loading ? (
                <Spin className="trans-center" tip="Đang lấy danh sách ..." />
            ) : (
                <div className="p-32 max-w-100">
                    <Table
                        columns={columns}
                        dataSource={users.data || []}
                        expandable={{
                            expandedRowRender: (user) => (
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {user.address}
                                </p>
                            ),
                        }}
                        pagination={{ showLessItems: true, position: ['bottomCenter'] }}
                    />
                    <UserEditModal onClose={onCloseEditModal} visible={modalEdit} />
                </div>
            )}
        </>
    );
}

export default AdminUser;
