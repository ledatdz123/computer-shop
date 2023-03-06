//=== Sign Up Page
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Tooltip } from 'antd';
// import loginApi from 'apis/loginApi';
import CheckboxField from '@/components/Custom/Field/CheckboxField';
import InputField from '@/components/Custom/Field/InputField';
import LoginGoogle from '@/components/LoginGoogle';
import constants from '@/utils/constants';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '@/redux/actions/auth';
import * as Yup from 'yup';
import './index.scss';

function Login() {
    const dispatch = Redux.useDispatch();
    const windowWidth = window.screen.width;
    const authLogin = Redux.useSelector((state) => state.authLogin);
    const { loading } = authLogin;

    // fn: đăng nhập
    const onLogin = async (account) => {
        dispatch(actions.login(account));
    };

    // giá trọ khởi tạo cho formik
    const initialValue = {
        email: 'dinhkhang1511@gmail.com',
        password: '123456789',
        keepLogin: false,
    };

    // validate form trước submit với yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().required('* Email bạn là gì ?').email('* Email không hợp lệ !'),
        password: Yup.string().trim().required('* Mật khẩu của bạn là gì ?'),
    });

    //return...
    return (
        <div className="Login container">
            <h1 className="Login-title m-b-20 m-t-20 underline-title">
                <b>Đăng nhập</b>
            </h1>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onLogin}>
                {(formikProps) => {
                    const suffixColor = 'rgba(0, 0, 0, 0.25)';
                    return (
                        <Form className="bg-form">
                            <Row className="input-border" gutter={[40, 24]} justify="center" style={{ margin: 0 }}>
                                {/* Form thông tin đăng nhập */}
                                <Col span={24} className="m-t-20">
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        className="input-form-common"
                                        placeholder="Email *"
                                        size="large"
                                        suffix={
                                            <Tooltip title="Email của bạn">
                                                <InfoCircleOutlined
                                                    style={{
                                                        color: suffixColor,
                                                    }}
                                                />
                                            </Tooltip>
                                        }
                                    />
                                </Col>
                                <Col span={24}>
                                    <FastField
                                        name="password"
                                        component={InputField}
                                        className="input-form-common"
                                        type="password"
                                        placeholder="Mật khẩu *"
                                        size="large"
                                        autocomplete="on"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className="d-flex justify-content-between">
                                        <FastField name="keepLogin" component={CheckboxField}>
                                            <b>Duy trì đăng nhập</b>
                                        </FastField>
                                        <Link to={constants.ROUTES.FORGOT_PASSWORD} style={{ color: '#50aaff' }}>
                                            <b>Quên mật khẩu ?</b>
                                        </Link>
                                    </div>
                                </Col>

                                {/* Button submit */}
                                <Col className="p-t-8 p-b-0 t-center" span={24}>
                                    <Button
                                        className="Login-submit-btn w-100"
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        // disabled={isDisableLogin}
                                        loading={loading}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Col>
                                <Col span={24} className="p-t-0 t-center">
                                    <div className="or-option" style={{ color: '#acacac' }}>
                                        HOẶC
                                    </div>
                                    <LoginGoogle title={windowWidth > 375 ? 'Đăng nhập với Gmail' : 'Gmail'} />
                                    <div className="m-t-20 m-b-20 font-weight-500">
                                        Bạn chưa đã có tài khoản ?
                                        <Link to={constants.ROUTES.REGISTER}>&nbsp;Đăng ký</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Login;
