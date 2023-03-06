import React, { useEffect, useState } from 'react';
import { DatePicker, Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import actionsChart from '@/redux/actions/chart';
import moment from 'moment';
import helpers from '@/utils/helpers';
const { RangePicker } = DatePicker;

function TopProduct() {
    const topProduct = useSelector((state) => state.topProduct);
    const dispatch = useDispatch();

    // event: thống kê
    useEffect(() => {
        dispatch(actionsChart.getTopProduct());
    }, []);

    return (
        <div className="flex flex-col" style={{}}>
            <div>
                {topProduct.loading ? (
                    <Spin tip="Đang thống kê ..." />
                ) : (
                    <Bar
                        style={{
                            padding: '20px',
                            width: '30%',
                            height: '30%',
                        }}
                        data={{
                            labels: helpers.reduceProductName(topProduct.topProducts.labels, 20),
                            datasets: [
                                {
                                    backgroundColor: '#2EA62A',
                                    data: topProduct.topProducts.datasets,
                                    label: `Số lượng sản phẩm bán ra`,
                                },
                            ],
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: `Doanh thu top sản phẩn`,
                                fontSize: 18,
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default TopProduct;
