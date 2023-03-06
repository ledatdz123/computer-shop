import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetch from '@/services/address';
import actionsCart from '@/redux/actions/cart';
const { Option } = Select;

function AddressAddForm(props) {
    const { onCloseForm } = props;
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);

    const [province, setProvince] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [provinceList, setProvinceList] = useState([]);

    const [district, setDistrict] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [districtList, setDistrictList] = useState([]);

    const [ward, setWard] = useState('');
    const [wardId, setWardId] = useState('');
    const [wardList, setWardList] = useState([]);

    const [streetList, setStreetList] = useState([]);
    const formRef = useRef(null);

    const authLogin = useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;

    const { lastName, firstName, phoneNumber, emailUser } = userInfo ? userInfo : {};
    const initialValues1 = { name: `${firstName} ${lastName}`, phone: phoneNumber, email: emailUser };

    const cart = useSelector((state) => state.cart);
    const { shippingInfo } = cart;
    const { name, phone, email } = shippingInfo[0] ? shippingInfo[0] : {};
    const initialValues2 = { name, phone, email };
    // fn: lấy danh sách tỉnh thành
    useEffect(() => {
        // dùng để cleanup effect
        let isSubscribe = true;

        async function getProvinceList() {
            try {
                const response = await fetch.getProvinces();
                if (response) {
                    if (isSubscribe) setProvinceList(response.data);
                }
            } catch (error) {}
        }
        getProvinceList();
        // cleanup
        return () => (isSubscribe = false);
    }, []);

    // fn: lấy danh sách huyện/xã khi đã chọn tỉnh/thành
    const getDistrictList = async (provinceId) => {
        try {
            const response = await fetch.getDistricts(provinceId);
            if (response) {
                setDistrictList(response.data.districts);
            }
        } catch (error) {
            throw error;
        }
    };

    // fn: lấy danh sách huyện/xã khi đã chọn tỉnh/thành
    const getWardList = async (districtId) => {
        try {
            const response = await fetch.getWards(districtId);
            if (response) {
                setWardList(response.data.wards);
            }
        } catch (error) {
            throw error;
        }
    };

    const get_province = (e) => {
        var array = e.split('|');
        setProvinceId(array[0]);
        setProvince(array[1]);
        getDistrictList(array[0]);
        console.log(province);
    };

    const get_district = (e) => {
        var array = e.split('|');
        setDistrictId(array[0]);
        setDistrict(array[1]);
        getWardList(array[0]);
        console.log(district);
    };

    const get_ward = (e) => {
        var array = e.split('|');
        setWardId(array[0]);
        setWard(array[1]);
        console.log(ward);
    };

    // event: thêm địa chỉ
    const onAddAddress = async (newAddress) => {
        const { name, phone, email, details, ...rest } = newAddress;
        const data = {
            name,
            phone,
            email,
            provinceId,
            districtId,
            wardId,
            details,
            address: `${details} ${ward} ${district} ${province}`,
        };
        dispatch(actionsCart.saveShippingInfo(data));
        setIsVisible(false);
        onCloseForm(1);
    };

    // rendering ...
    return (
        <Modal
            visible={isVisible}
            closable={true}
            maskClosable={false}
            onCancel={() => {
                setIsVisible(false);
                onCloseForm();
            }}
            centered
            width={768}
            footer={[
                <Button
                    key="back"
                    danger
                    onClick={() => {
                        setIsVisible(false);
                        onCloseForm();
                    }}
                >
                    Huỷ bỏ
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" form="form">
                    Thêm địa chỉ
                </Button>,
            ]}
        >
            <Form
                initialValues={() => {
                    return shippingInfo.length > 0 ? initialValues2 : initialValues1;
                }}
                onFinish={onAddAddress}
                ref={formRef}
                name="form"
            >
                <Row gutter={[32, 0]}>
                    <Col span={12}>
                        <h3>Thông tin người nhận hàng</h3>
                        <Form.Item
                            name="name"
                            className="m-tb-16"
                            rules={[
                                { required: true, message: '* Bắt buộc nhập' },
                                {
                                    max: 40,
                                    message: 'Tối đa 40 ký tự',
                                },
                            ]}
                        >
                            <Input size="middle" placeholder="Họ tên *" maxLength={60} />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            className="m-tb-16"
                            rules={[
                                { required: true, message: '* Bắt buộc nhập' },
                                {
                                    validator: (_, value) =>
                                        /0\d{0,9}/gi.test(value)
                                            ? Promise.resolve()
                                            : Promise.reject('Số điện thoại không hợp lệ'),
                                },
                                {
                                    max: 10,
                                    message: 'Số điện thoại bao gồm 10 số',
                                },
                                {
                                    min: 10,
                                    message: 'Số điện thoại bao gồm 10 số',
                                },
                            ]}
                        >
                            <Input size="middle" placeholder="Số điện thoại *" maxLength={12} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: '* Bắt buộc nhập' },
                                {
                                    validator: (_, value) =>
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(value)
                                            ? Promise.resolve()
                                            : Promise.reject('Email không hợp lệ'),
                                },
                            ]}
                        >
                            <Input size="middle" placeholder="Email cá nhân *" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <h3>Địa chỉ giao hàng</h3>
                        {/* tỉnh thành */}
                        <Form.Item name="province" rules={[{ required: true, message: '* bắt buộc nhập' }]}>
                            <Select
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                                onChange={(value) => {
                                    get_province(value);
                                    setDistrict('');
                                    setDistrictId('');
                                    setWard('');
                                    setWardId('');
                                }}
                                value={province}
                                placeholder="Tỉnh/thành"
                                className="m-tb-16"
                                size="middle"
                            >
                                {provinceList &&
                                    provinceList?.map((item) => (
                                        <Option value={`${item.code}|${item.name}`} key={item.code}>
                                            {item.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        {/* huyễn/ quận */}
                        <Form.Item name="district" rules={[{ required: true, message: '* bắt buộc nhập' }]}>
                            <Select
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                                onChange={(value) => {
                                    get_district(value);
                                    setWard('');
                                    setWardId('');
                                }}
                                value={district}
                                placeholder="Huyện/Quận"
                                size="middle"
                            >
                                {districtList &&
                                    districtList?.map((item) => (
                                        <Option value={`${item.code}|${item.name}`} key={item.code}>
                                            {item.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        {/* phường, xã */}
                        <Form.Item name="wards" rules={[{ required: true, message: '* bắt buộc nhập' }]}>
                            <Select
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={ward}
                                showSearch
                                onChange={(value) => get_ward(value)}
                                className="m-t-16"
                                placeholder="Phường/Xã"
                                size="middle"
                            >
                                {wardList.map((item) => (
                                    <Option value={`${item.code}|${item.name}`} key={item.code}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {/* đường */}
                        {/* <Form.Item name="street" rules={[{ required: true, message: '* bắt buộc nhập' }]}>
                            <Select
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                                placeholder="Đường"
                                size="middle"
                            >
                                {streetList.map((item, index) => (
                                    <Option value={item.id} key={index}>
                                        {item.prefix + ' ' + item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item> */}
                        {/* chi tiết */}
                        <Form.Item name="details" rules={[{ required: true, message: '* bắt buộc nhập' }]}>
                            <Input className="m-t-16" maxLength={100} placeholder="Địa chỉ cụ thể" size="middle" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

AddressAddForm.propTypes = {
    onCloseForm: PropTypes.func,
};

export default AddressAddForm;
