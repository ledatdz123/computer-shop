import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import React from 'react';
import { HomeOutlined, MessageOutlined } from '@ant-design/icons';
const Result_403 = () => (
    <Result
        style={{ minHeight: '85vh' }}
        status="403"
        title="403 - Chưa cấp phép"
        subTitle="Xin lỗi, bạn không được phép truy cập trang này."
        extra={
            <>
                <a href="https://www.facebook.com/phuphu.phang.54/" target="blank">
                    <Button type="dashed" size="large">
                        <MessageOutlined /> Liên hệ tư vấn
                    </Button>
                </a>
                <Link to="/login">
                    <Button type="primary" size="large">
                        <HomeOutlined /> Đăng nhập
                    </Button>
                </Link>
            </>
        }
    />
);
export default Result_403;
