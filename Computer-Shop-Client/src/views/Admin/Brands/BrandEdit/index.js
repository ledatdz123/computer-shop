import { Col, Form, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import * as Redux from 'react-redux';
import actionsBrand from '@/redux/actions/brand';
import React from 'react';
import GlobalLoading from '@/components/Loading/Global';

export default function BrandEditModal(props) {
    const { visible, onClose } = props;
    const dispatch = Redux.useDispatch();

    const brandDetail = Redux.useSelector((state) => state.brandDetail);
    const { loading, brand } = brandDetail;

    const brandUpdate = Redux.useSelector((state) => state.brandUpdate);

    const { id, name } = brand ? brand : {};
    const initValues = { id, name };

    // event: Sửa chữa sản phẩm
    const onEdit = async (value) => {
        dispatch(actionsBrand.updatedBrand(value));
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
            title="Chỉnh sửa thông tin thương hiệu"
            confirmLoading={brandUpdate.loading}
            width={1000}
            centered
        >
            {loading ? (
                <GlobalLoading content="Đang tải chi tiết thương hiệu ..." />
            ) : (
                <Form initialValues={initValues} name="editForm" onFinish={(value) => onEdit(value)}>
                    <Row gutter={[16, 16]}>
                        {/* Id */}
                        <Col span={12}>
                            <Form.Item name="id">
                                <Input disabled size="large" placeholder="ID" />
                            </Form.Item>
                        </Col>

                        {/* Tên nhãn hiệu */}
                        <Col span={12}>
                            <Form.Item name="name" rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                                <Input size="large" placeholder="Tên nhãn hiệu *" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </Modal>
    );
}

BrandEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};
