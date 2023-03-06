//=== Sign Up Page
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Tooltip } from 'antd';
// import accountApi from 'apis/accountApi';

import Delay from '@/components/Delay';
import constants from '@/utils/constants';
import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import './index.scss';
import * as Redux from 'react-redux';
import actions from '@/redux/actions/auth';
function SignUp() {
    const windowWidth = window.screen.width;
    const dispatch = Redux.useDispatch();
    const [form] = Form.useForm();
    // fn: trạng thái gửi mã xác thực
    const [isSending, setIsSending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRedirectLogin, setIsRedirectLogin] = useState(false);

    // ref kiểm tra đã nhập email hay chưa, hỗ trợ việc gửi mã xác nhận
    const emailRef = useRef('/^[w-.]+@([w-]+.)+[w-]{2,4}$/');

    const authRegister = Redux.useSelector((state) => state.authRegister);

    // fn: xứ lý đăng ký
    const onSignUp = async (value) => {
        console.log(value);
        const { email, password } = value;
        const roles = ['ROLE_USER'];
        dispatch(actions.register(email, password, roles));
    };

    // giá trọ khởi tạo cho form

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 24,
                offset: 0,
            },
        },
    };

    // return...
    return (
        <div className="SignUp container">
            {/*// Note: chuyển đến trang login khi đăng ký thành công */}
            {authRegister.success && (
                <Delay wait={constants.DELAY_TIME}>
                    <Navigate to={constants.ROUTES.LOGIN} replace />
                </Delay>
            )}

            <h1 className="SignUp-title underline-title m-b-20 m-t-20">
                <b>Đăng ký tài khoản</b>
            </h1>
            <div className="border border-gray-9 pd-6 flex justify-center items-center">
                <Form
                    form={form}
                    name="register"
                    onFinish={onSignUp}
                    {...formItemLayout}
                    scrollToFirstError
                    className="flex flex-col gap-6 w-2/5 justify-center"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            className="w-full rounded-xl"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            className="w-full rounded-xl"
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('The two passwords that you entered do not match!'),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            className="w-full rounded-xl"
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full py-6 items-center flex justify-center"
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
