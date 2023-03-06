import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import ProductView from '@/components/Card';
import { Col, Pagination, Row, Spin } from 'antd';
import actions from '@/redux/actions/product';
import actionsRating from '@/redux/actions/rating';

const AllProduct = () => {
    const dispatch = Redux.useDispatch();

    const listProducts = Redux.useSelector((state) => state.productList);
    const { loading, products, error } = listProducts;

    const [page, setPage] = React.useState(1);
    // lấy sản phẩm
    React.useEffect(() => {
        dispatch(actions.getListProducts(page));
    }, [page]);

    // fn: Hiển thị sản phẩm
    const showProducts = (list) => {
        return list.map((product) => (
            <Col key={product.id} span={24} sm={12} lg={8} xl={6}>
                <Link
                    to={`/product/${product.id}`}
                    onClick={() => {
                        dispatch(actions.getDetailProduct(product.id));
                        dispatch(actionsRating.getAllRating(product.id));
                    }}
                >
                    <ProductView
                        className="m-auto"
                        name={product.name}
                        price={product.price}
                        stock={product.quantity}
                        avtUrl={product.image}
                        discount={product.discount}
                        height={400}
                    />
                </Link>
            </Col>
        ));
    };

    return (
        <Row className="p-16" style={{ minHeight: 400 }} gutter={[16, 16]}>
            <Col span={24}>
                <Row>
                    <h2 className="font-weight-700">Tất cả sản phẩm</h2>
                    <h2 className="font-weight-700">Thêm</h2>
                </Row>

                <div className="underline-title"></div>
            </Col>
            {loading ? (
                <>
                    <Spin className="trans-center" tip="Đang tải sản phẩm ..." size="large" />
                </>
            ) : (
                <>
                    {showProducts(products?.content || [])}
                    <Col span={24}>
                        <Pagination
                            className="t-center"
                            current={page}
                            pageSize={products?.pageable?.pageSize || 0}
                            total={products?.totalElements}
                            onChange={(p) => setPage(p)}
                            showSizeChanger={false}
                        />
                    </Col>
                </>
            )}
        </Row>
    );
};

export default AllProduct;
