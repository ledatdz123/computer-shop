import { Col, Row } from 'antd';
import React from 'react';
import AnnualRevenue from './AnnualRevenue';
import MonthlyRevenue from './MonthlyRevenue';
import Revenue from './Revenue';
import TopOrders from './TopOrders';
import TopProduct from './TopProduct';

function Dashboard() {
    return (
        <div>
            <Row className="p-32" gutter={[32, 32]}>
                {/* doanh thu theo tháng */}
                <Col span={24} xl={24}>
                    <div className="bg-white p-12 bor-rad-8 box-sha-home">
                        {/* <MonthlyRevenue /> */}
                        <Revenue />
                    </div>
                </Col>
                {/* Doanh thu theo năm */}
                <Col span={24} xl={24}>
                    <div className="bg-white p-12 bor-rad-8 box-sha-home">
                        <TopProduct />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
