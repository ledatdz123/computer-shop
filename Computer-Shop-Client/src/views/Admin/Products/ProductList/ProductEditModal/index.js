import { Col, Form, Input, InputNumber, message, Modal, Row, Select, Tooltip } from 'antd';
// import adminApi from 'apis/adminApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyCKEditor from '@/components/MyCKEditor';
import UploadAvatar from '@/components/UploadAvatar';
import * as Redux from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import actionsProduct from '@/redux/actions/product';
import GlobalLoading from '@/components/Loading/Global';

const suffixColor = '#aaa';

function EditProductModal(props) {
    const dispatch = Redux.useDispatch();
    const { visible, onClose } = props;

    const productUpdate = Redux.useSelector((state) => state.productUpdate);

    const productDetail = Redux.useSelector((state) => state.productDetail);
    const { loading, product } = productDetail;

    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { categories } = categoryAll;

    const brandAll = Redux.useSelector((state) => state.brandAll);
    const { brands } = brandAll;

    const { id, name, brandId, categoryId, description, price, image, quantity } = product ? product : {};

    const [avatar, setAvatar] = useState(image ? image : '');
    const [productDesc, setProductDesc] = useState(description ? description : '');

    const initValues = { id, name, brandId, categoryId, description, price, image };


    // event: Sửa chữa sản phẩm
    const onEdit = async (value) => {
        const { name, price, description, brandId, categoryId, image, ...rest } = value;
        // các thuộc tính chung của sản phẩm
        const product = {
            id: id,
            name,
            price,
            brandId,
            categoryId,
            description,
            quantity: quantity,
            image: avatar,
        };
        dispatch(actionsProduct.updateProduct(product));
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
            title="Chỉnh sửa thông tin sản phẩm"
            confirmLoading={productUpdate.loading}
            width={1000}
            centered
        >
            {loading ? (
                <GlobalLoading content="Đang tải chi tiết sản phẩm ..." />
            ) : (
                <Form initialValues={initValues} name="editForm" onFinish={(value) => onEdit(value)}>
                    <Row gutter={[24, 24]}>
                        {/* avatar */}
                        <Col span={24} md={8} xl={12} xxl={12}>
                            <Form.Item
                                name="image"
                                initialValue={image}
                                className="flex justify-center items-center h-full"
                            >
                                <UploadAvatar avatar={image} setAvatar={setAvatar} />
                            </Form.Item>
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
                                {/* giá sản phẩm */}
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item name="price">
                                        <InputNumber
                                            defaultValue={price}
                                            style={{ width: '100%' }}
                                            step={10000}
                                            size="large"
                                            placeholder="Giá *"
                                            min={0}
                                            max={1000000000}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* chọn loại sản phẩm */}
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item name="categoryId">
                                        <Select
                                            size="large"
                                            placeholder="Chọn loại sản phẩm *"
                                            defaultValue={categoryId}
                                        >
                                            {categories &&
                                                categories.map((item) => (
                                                    <Select.Option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {/* thương hiệu */}
                                <Col span={24} md={8} xl={24} xxl={24}>
                                    <Form.Item name="brandId">
                                        <Select
                                            size="large"
                                            placeholder="Chọn thương hiệu sản phẩm *"
                                            defaultValue={brandId}
                                        >
                                            {brands &&
                                                brands.map((item) => (
                                                    <Select.Option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="description" initialValue={description}>
                                <MyCKEditor onChange={setProductDesc} data={description} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </Modal>
    );
}

EditProductModal.propTypes = {
    onClose: PropTypes.func,
    product: PropTypes.object,
    visible: PropTypes.bool,
};

export default EditProductModal;
