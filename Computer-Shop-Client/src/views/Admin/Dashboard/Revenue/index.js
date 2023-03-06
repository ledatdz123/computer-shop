import React, { useEffect, useState } from 'react';
import { DatePicker, Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import actionsChart from '@/redux/actions/chart';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Revenue() {
    const revenue = useSelector((state) => state.revenue);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('2022-12-07');
    const [endDate, setEndDate] = useState('2022-12-13');

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };

    // event: thống kê
    useEffect(() => {
        dispatch(actionsChart.getRevenue(startDate, endDate));
    }, [endDate, startDate]);

    return (
        <div className="flex flex-col" style={{}}>
            <div className="mt-6">
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Week': [moment().startOf('week'), moment().endOf('week')],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'This Year': [moment().startOf('year'), moment().endOf('year')],
                    }}
                    onChange={onRangeChange}
                />
            </div>
            <div>
                {revenue.loading ? (
                    <Spin tip="Đang thống kê ..." />
                ) : (
                    <Bar
                        style={{
                            padding: '20px',
                            width: '30%',
                            height: '30%',
                        }}
                        data={{
                            labels: revenue.revenue.labels,
                            datasets: [
                                {
                                    backgroundColor: '#2EA62A',
                                    data: revenue.revenue.datasets,
                                    label: `Doanh thu`,
                                },
                            ],
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: `Doanh thu theo từng ngày từ ${startDate} đến ${endDate}`,
                                fontSize: 18,
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default Revenue;
