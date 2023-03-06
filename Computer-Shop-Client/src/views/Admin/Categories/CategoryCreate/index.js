import { Col, Form, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import * as Redux from 'react-redux';
import actionsCategory from '@/redux/actions/category';
import React from 'react';

export default function CategoryCreateModal(props) {
    const { visible, onClose } = props;
    const dispatch = Redux.useDispatch();

    const categoryCreate = Redux.useSelector((state) => state.categoryCreate);
    const { loading } = categoryCreate;

    // event: Sửa chữa sản phẩm
    const onCreate = async (value) => {
        dispatch(actionsCategory.createCategory(value));
    };

    return (
        <Modal
            className="edit-product-modal"
            destroyOnClose={false}
            maskClosable={false}
            visible={visible}
            okText="Tạo"
            cancelText="Huỷ bỏ"
            onCancel={onClose}
            okButtonProps={{ form: 'createForm', htmlType: 'submit' }}
            title="Chỉnh sửa thông tin thể loại"
            confirmLoading={loading}
            width={1000}
            centered
        >
            <Form name="createForm" onFinish={(value) => onCreate(value)}>
                <Row gutter={[16, 16]}>
                    {/* Tên thể loại */}
                    <Col span={12}>
                        <Form.Item name="name" rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                            <Input size="large" name="name" placeholder="Tên thể loại *" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

CategoryCreateModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};
