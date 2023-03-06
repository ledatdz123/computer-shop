import { Col, Form, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import * as Redux from 'react-redux';
import actionsCategory from '@/redux/actions/category';
import React from 'react';
import GlobalLoading from '@/components/Loading/Global';

export default function CategoryEditModal(props) {
    const { visible, onClose } = props;
    const dispatch = Redux.useDispatch();

    const categoryDetail = Redux.useSelector((state) => state.categoryDetail);
    const { loading, category } = categoryDetail;

    const categoryUpdate = Redux.useSelector((state) => state.categoryUpdate);

    const { id, name } = category ? category : {};
    const initValues = { id, name };

    // event: Sửa chữa sản phẩm
    const onEdit = async (value) => {
        dispatch(actionsCategory.updatedCategory(value));
    };

    return (
        <Modal
            className="edit-product-modal"
            destroyOnClose={false}
            maskClosable={false}
            visible={visible}
            okText="Cập nhật"
            cancelText="Huỷ bỏ"
            onCancel={onClose}
            okButtonProps={{ form: 'editForm', htmlType: 'submit' }}
            title="Chỉnh sửa thông tin thể loại"
            confirmLoading={categoryUpdate.loading}
            width={1000}
            centered
        >
            {loading ? (
                <GlobalLoading content="Đang tải chi tiết hể loại ..." />
            ) : (
                <Form initialValues={initValues} name="editForm" onFinish={(value) => onEdit(value)}>
                    <Row gutter={[16, 16]}>
                        {/* Id */}
                        <Col span={12}>
                            <Form.Item name="id">
                                <Input disabled size="large" placeholder="ID" />
                            </Form.Item>
                        </Col>

                        {/* Tên thể loại */}
                        <Col span={12}>
                            <Form.Item name="name" rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                                <Input size="large" placeholder="Tên thể loại *" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </Modal>
    );
}

CategoryEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};
