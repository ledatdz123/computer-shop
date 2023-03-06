import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select, Space, Tooltip, Upload } from 'antd';
// import adminApi from 'apis/adminApi';

import React, { useRef, useState } from 'react';
import '../index.scss';
import MyCKEditor from '@/components/MyCKEditor';
import UploadAvatar from '@/components/UploadAvatar';
import * as Redux from 'react-redux';
import actionsProduct from '@/redux/actions/product';

const suffixColor = '#aaa';

function AddProduct() {
    const [form] = Form.useForm();
    const dispatch = Redux.useDispatch();
    const categoryAll = Redux.useSelector((state) => state.categoryAll);
    const { categories } = categoryAll;

    const brandAll = Redux.useSelector((state) => state.brandAll);
    const { brands } = brandAll;

    const productCreate = Redux.useSelector((state) => state.productCreate);
    const { loading } = productCreate;

    const [productDesc, setProductDesc] = useState('');
    // avt file chưa nén
    // avt đã nén
    const [avatar, setAvatar] = useState(null);
    // danh sách hình ảnh sp chưa nén
    // danh sách hình ảnh sp đã nén
    const fileCompressedList = useRef([]);

    // fn: nén ảnh sản phẩm, type: 0 - avt, type: 1 - picture List

    // fn: Reset form
    const onResetForm = () => {
        form.resetFields();
        fileCompressedList.current = [];
        setAvatar(null);
    };

    // fn: kiểm tra hình ảnh, bài viết trước submit form
    const onValBeforeSubmit = async (data) => {
        try {
            if (!avatar) {
                message.error('Thêm avatar !', 2);
                return;
            }
            // cảnh báo khi không có bài viết mô tả
            if (productDesc === null)
                Modal.confirm({
                    title: 'Bạn có chắc muốn submit ?',
                    content: 'Chưa có BÀI VIẾT MÔ TẢ cho sản phẩm này !',
                    icon: <ExclamationCircleOutlined />,
                    okButtonProps: true,
                    onCancel() {
                        return;
                    },
                    onOk() {
                        onSubmit(data);
                    },
                });
            else onSubmit(data);
        } catch (error) {
            message.error('Có lỗi. Thử lại !');
        }
    };

    // fn: Xử lý submit form
    const onSubmit = async (data) => {
        const { name, price, description, brandId, categoryId, image, ...rest } = data;
        // các thuộc tính chung của sản phẩm
        const product = {
            description,
            name,
            price,
            brandId,
            quantity: 0,
            categoryId,
            image: avatar,
        };
        dispatch(actionsProduct.createProduct(product));
    };

    // returning...
    return (
        <div className="Admin-Product-Page p-16">
            <h1 className="t-center ">
                <b>Thêm sản phẩm</b>
            </h1>

            {/* form thông tin sản phẩm */}
            <div className="p-20">
                <Form
                    name="form"
                    form={form}
                    onFinish={onValBeforeSubmit}
                    onFinishFailed={() => message.error('Lỗi. Kiểm tra lại form')}
                >
                    {/* các thông số cơ bản */}
                    <Row gutter={[24, 24]}>
                        {/* // Note: tổng quan một sản phẩm */}
                        <Col span={24}>
                            <h2>Thông tin cơ bản sản phẩm</h2>
                        </Col>

                        {/* avatar */}
                        <Col span={24} md={8} xl={12} xxl={12}>
                            <Form.Item
                                name="image"
                                initialValue={avatar}
                                className="flex justify-center items-center h-full"
                            >
                                <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
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
                                    <Form.Item name="price" rules={[{ required: true, message: 'Bắt buộc' }]}>
                                        <InputNumber
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
                                    <Form.Item name="categoryId" rules={[{ required: true, message: 'Bắt buộc' }]}>
                                        <Select size="large" placeholder="Chọn loại sản phẩm *">
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
                                    <Form.Item name="brandId" rules={[{ required: true, message: 'Bắt buộc' }]}>
                                        <Select size="large" placeholder="Chọn thương hiệu sản phẩm *">
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
                            <Form.Item name="description" initialValue={productDesc}>
                                <MyCKEditor onChange={setProductDesc} />
                            </Form.Item>
                        </Col>

                        {/* submit button */}
                        <Col span={24} className="d-flex justify-content-end">
                            <Button className="m-r-20" size="large" danger type="primary" onClick={onResetForm}>
                                Reset Form
                            </Button>
                            <Button loading={loading} size="large" type="primary" htmlType="submit">
                                Thêm sản phẩm
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;
