import React from 'react';
import notFoundIcon from '@/assets/icon/svg/notFound';
import { Button, Col, Row } from 'antd';
import { HomeOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const notFound = () => {
    return (
        <Row justify="center">
            <Col>
                <notFoundIcon />
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
            </Col>
        </Row>
    );
};

export default notFound;
