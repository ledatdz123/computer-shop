import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import React from 'react';
import { HomeOutlined, MessageOutlined } from '@ant-design/icons';
const Result_404 = () => (
    <Result
        style={{ minHeight: '85vh' }}
        status="404"
        title="404 - Không tìm thấy trang."
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
        extra={
            <>
                <a href="https://www.facebook.com/phuphu.phang.54/" target="blank">
                    <Button type="dashed" size="large">
                        <MessageOutlined /> Liên hệ tư vấn
                    </Button>
                </a>
                <Link to="/">
                    <Button type="primary" size="large">
                        <HomeOutlined /> Về trang chủ
                    </Button>
                </Link>
            </>
        }
    />
);
export default Result_404;
