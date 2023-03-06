import { Col, Form, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import * as Redux from 'react-redux';
import actionsBrand from '@/redux/actions/brand';
import React from 'react';

export default function BrandCreateModal(props) {
    const { visible, onClose } = props;
    const dispatch = Redux.useDispatch();

    const brandCreate = Redux.useSelector((state) => state.brandCreate);
    const { loading } = brandCreate;

    // event: Sửa chữa sản phẩm
    const onCreate = async (value) => {
        dispatch(actionsBrand.createBrand(value));
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
            title="Chỉnh sửa thông tin nhãn hiệu"
            confirmLoading={loading}
            width={1000}
            centered
        >
            <Form name="createForm" onFinish={(value) => onCreate(value)}>
                <Row gutter={[16, 16]}>
                    {/* Tên nhãn hiệu */}
                    <Col span={12}>
                        <Form.Item name="name" rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                            <Input size="large" name="name" placeholder="Tên nhãn hiệu *" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

BrandCreateModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};
