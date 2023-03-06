import { Button, Col, Input, message, Pagination, Progress, Rate, Row } from 'antd';
// import commentApi from 'apis/commentApi';
import constants from '@/utils/constants';
import helpers from '@/utils/helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';
import UserComment from './UserComment';
import actionsRating from '@/redux/actions/rating';
const { TextArea } = Input;

function EvaluationView(props) {
    const dispatch = useDispatch();

    const { rates, productId, avgRate } = props;
    const [cmtListState, setCmtListState] = useState(rates);
    const authLogin = useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;
    const star = useRef(0);
    const ratingCreate = useSelector((state) => state.ratingCreate);

    const [cmt, setCmt] = useState('');
    // const star = useRef(0);
    // const starAvg = helpers.calStar(rates).toFixed(1);
    // const rateTotals = rates.reduce((a, b) => a + b, 0);

    // phân trang
    const [page, setPage] = useState(1);
    const pageTotal = Math.ceil(cmtListState.length / constants.COMMENT_PER_PAGE);
    let start = (page - 1) * constants.COMMENT_PER_PAGE;
    const cmtListSliced = cmtListState.slice(start, start + constants.COMMENT_PER_PAGE);

    useEffect(() => {
        setCmtListState(rates);
        if (ratingCreate.success) {
            setCmt('');
            star.current = 0;
        }
    }, [rates, ratingCreate.success]);

    // event: comment
    const onComment = async () => {
        const content = cmt.trim();
        if (content === '' && star.current === 0) {
            message.warning('Hãy nhập nhận xét của bạn');
            return;
        }
        let rating = {
            user_id: userInfo.id,
            comment: content,
            scores: star.current - 1,
        };
        dispatch(actionsRating.createRating(productId, rating));
    };

    // rendering ...
    return (
        <Row className="Evaluation bg-white p-16" style={{ borderRadius: 8 }}>
            {/* tiều đề */}
            <Col span={24}>
                <h2 className="font-weight-700">Nhận xét của khách hàng</h2>
                <div className="underline-title"></div>
            </Col>

            {/* đánh giá tổng quan */}
            <Col span={24} className="p-16">
                <span className="font-size-28px">Đánh giá</span>
                <div className="overview d-flex p-tb-16">
                    <div className="d-flex flex-direction-column align-i-center overview--total">
                        <h2 className="font-size-32px">{avgRate}</h2>
                        <Rate disabled defaultValue={avgRate} allowHalf style={{ fontSize: 12 }} />
                        {/* <p className="t-color-gray font-weight-500">{rateTotals} nhận xét</p> */}
                    </div>
                    {/* <div className="overview--detail d-flex flex-grow-1 flex-direction-column p-lr-16">
                        {rates.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between">
                                <Rate disabled defaultValue={index + 1} style={{ fontSize: 14, flexBasis: 100 }} />
                                <Progress
                                    percent={(item / cmtListState.length - 1) * 100}
                                    type="line"
                                    showInfo={false}
                                    style={{ width: 172 }}
                                />
                                <span className="p-l-8 t-color-gray">{item}</span>
                            </div>
                        ))}
                    </div> */}
                </div>
            </Col>

            {/* Xem bình luận, nhận xét */}
            <Col span={24}>
                {cmtListSliced.map((item, index) => (
                    <UserComment key={index} comment={item} />
                ))}
                {pageTotal > 1 && (
                    <Pagination
                        className="t-right m-b-16"
                        defaultCurrent={1}
                        total={pageTotal}
                        pageSize={1}
                        onChange={(p) => setPage(p)}
                    />
                )}
            </Col>

            {/* bình luận */}
            <Col span={24} className="d-flex">
                {userInfo ? (
                    <>
                        <TextArea
                            maxLength={constants.MAX_LEN_COMMENT}
                            autoSize
                            showCount
                            allowClear
                            value={cmt}
                            id="commentArea"
                            placeholder="Nhập nhận xét của bạn"
                            size="large"
                            className="flex-grow-1 m-r-16"
                            onChange={(e) => setCmt(e.target.value)}
                        />
                        <Rate allowClear className="m-r-16" onChange={(e) => (star.current = e)} />
                        <Button type="primary" size="large" style={{ flexBasis: 122 }} onClick={onComment}>
                            Gửi nhận xét
                        </Button>
                    </>
                ) : (
                    <Button type="link" size="large">
                        <Link to={constants.ROUTES.LOGIN}>Đăng nhập để nhận xét</Link>
                    </Button>
                )}
            </Col>
        </Row>
    );
}

EvaluationView.defaultProps = {
    rates: [0, 0, 0, 0, 0],
};

EvaluationView.propTypes = {
    cmtList: PropTypes.array || PropTypes.object,
    rates: PropTypes.array || PropTypes.object,
    productId: PropTypes.string,
};

export default EvaluationView;
