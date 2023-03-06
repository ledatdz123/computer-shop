import { Avatar, InputNumber, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import helpers from '@/utils/helpers';
import React from 'react';

function CartItem(props) {
    const { id, name, image, stock, price, qty, onDelCartItem, onUpdateNumOfProd } = props;
    return (
        <div className="d-flex bg-white p-12 bor-rad-4 justify-content-between">
            {/* sản phẩm */}
            <div className="d-flex flex-grow-1">
                <Avatar src={image} alt="Photo" shape="square" size={64} />
                <div className="d-flex flex-direction-column p-10 ">
                    <Link to={`/product/${id}`} className="font-size-16px">
                        <Tooltip title={name}>{helpers.reduceProductName(name, 20)}</Tooltip>
                    </Link>
                    {/* <span style={{ color: '#aaa' }}>{code}</span> */}
                </div>
            </div>

            {/*  Thêm giảm sản phẩm */}
            <div className="d-flex align-i-center" style={{ flexBasis: 128 }}>
                <DeleteOutlined className="m-r-18 icon-del-item" onClick={() => onDelCartItem(id)} />
                <div>
                    <InputNumber
                        height={20}
                        min={1}
                        max={stock}
                        value={qty}
                        onChange={(value) => onUpdateNumOfProd(id, value)}
                        size="large"
                        style={{ borderColor: '#3555C5' }}
                    />
                </div>
            </div>

            {/* Giá */}
            <div className="d-flex flex-direction-column align-i-end" style={{ flexBasis: 200 }}>
                <b className="font-size-18px" style={{ color: '#3555C5' }}>
                    {helpers.formatProductPrice(price)}
                </b>
                <span style={{ textDecoration: 'line-through', color: '#aaa' }}>
                    {helpers.formatProductPrice(price)}
                </span>
            </div>
        </div>
    );
}

CartItem.defaultProps = {
    _id: '',
    avt: '',
    code: '',
    discount: 0,
    name: '',
    price: 0,
    stock: 0,
    amount: 1,
};

CartItem.propTypes = {
    onDelCartItem: PropTypes.func,
    onUpdateNumOfProd: PropTypes.func,
    index: PropTypes.any,
    _id: PropTypes.string,
    avt: PropTypes.string,
    code: PropTypes.string,
    discount: PropTypes.number,
    amount: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
};

export default CartItem;
