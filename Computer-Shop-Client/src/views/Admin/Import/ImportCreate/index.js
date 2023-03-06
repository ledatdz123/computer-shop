import { Col, Form, Image, Input, InputNumber, Modal, Row, Tooltip } from 'antd';
// import adminApi from 'apis/adminApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Redux from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import actionsImport from '@/redux/actions/import';
import GlobalLoading from '@/components/Loading/Global';

const suffixColor = '#aaa';

function ImportCreateModal(props) {
    const dispatch = Redux.useDispatch();
    const { visible, onClose } = props;

    const productDetail = Redux.useSelector((state) => state.productDetail);
    const { loading, product } = productDetail;

    const { id, name, price, image } = product ? product : {};
    const initValues = { id, name, price, image };

    const [isUpdating, setIsUpdating] = useState(false);

    // event: Sửa chữa sản phẩm
    const onCreateImport = async (value) => {
        const { name, importPrice, quantity, ...rest } = value;
        // các thuộc tính chung của sản phẩm
        const importDetail = {
            id,
            name,
            importPrice,
            quantity,
        };
        dispatch(actionsImport.createImport(importDetail));
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
            okButtonProps={{ form: 'createImportForm', htmlType: 'submit' }}
            title="Chỉnh sửa thông tin sản phẩm"
            confirmLoading={isUpdating}
            width={1000}
            centered
        >
            {loading ? (
                <GlobalLoading content="Đang tải chi tiết sản phẩm ..." />
            ) : (
                <Form
                    className="pr-4"
                    initialValues={initValues}
                    name="createImportForm"
                    onFinish={(value) => onCreateImport(value)}
                >
                    <Row gutter={[24, 24]}>
                        {/* avatar */}
                        <Col span={24} md={8} xl={12} xxl={12}>
                            <div className="flex justify-center items-center h-full">
                                <Image width={200} height={200} src={image} />
                            </div>
                        </Col>
                        {/* tên sản phẩm */}
                        <Col span={24} md={8} xl={12} xxl={12}>
                            <Row gutter={[24, 24]}>
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Tên sản phẩm *"
                                            defaultValue={name}
                                            suffix={
                                                <Tooltip title="Laptop Apple MacBook Air 13 2019 MVFM2SA/A (Core i5/8GB/128GB SSD/UHD 617/macOS/1.3 kg)">
                                                    <InfoCircleOutlined style={{ color: suffixColor }} />
                                                </Tooltip>
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                {/* giá bán sản phẩm */}
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item name="salesPrice">
                                        <InputNumber
                                            defaultValue={price}
                                            style={{ width: '100%' }}
                                            step={10000}
                                            size="large"
                                            placeholder="Giá bán*"
                                            min={0}
                                            max={1000000000}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* chọn loại sản phẩm */}
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item name="importPrice">
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            step={10000}
                                            size="large"
                                            placeholder="Giá nhập*"
                                            min={0}
                                            max={1000000000}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* thương hiệu */}
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item name="quantity">
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            step={10000}
                                            size="large"
                                            placeholder="Số lượng*"
                                            min={0}
                                            max={1000000000}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            )}
        </Modal>
    );
}

ImportCreateModal.propTypes = {
    onClose: PropTypes.func,
    product: PropTypes.object,
    visible: PropTypes.bool,
};

export default ImportCreateModal;
