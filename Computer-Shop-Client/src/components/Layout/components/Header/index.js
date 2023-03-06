import {
    MenuOutlined,
    ReconciliationOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { AutoComplete, Badge, Button, Drawer, Dropdown, Input, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvt from '@/assets/imgs/default-avt.png';
import logoUrl from '@/assets/imgs/logo.png';
import Avatar from 'antd/lib/avatar/avatar';
import actions from '@/redux/actions/auth';
import constants from '@/utils/constants';
import helpers from '@/utils/helpers';
import Cart from '../Cart';
import './index.scss';
import actionsOrder from '@/redux/actions/order';

function totalItemCarts(cartItems) {
    if (cartItems) {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    }
}

function Header() {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const authLogin = useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;

    const [linkSearch, setLinkSearch] = useState('');
    const [isMdDevice, setIsMdDevice] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isSmDevice, setIsSmDevice] = useState(false);

    const options = helpers.autoSearchOptions();
    const locations = useLocation().pathname;
    const initLink = '/search?keyword=';

    // event: log out
    const onLogout = async () => {
        dispatch(actions.logout());
    };
    // event: get event change window width
    useEffect(() => {
        const w = window.innerWidth;
        if (w <= 992) setIsMdDevice(true);
        if (w <= 480) setIsSmDevice(true);

        function handleResize() {
            const width = window.innerWidth;
            if (width <= 992) {
                setIsMdDevice(true);
            } else {
                setIsMdDevice(false);
            }
            if (width <= 480) setIsSmDevice(true);
            else setIsSmDevice(false);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // event: close drawer to redirect
    useEffect(() => {
        setDrawerVisible(false);
    }, [locations]);

    // Menu for user action
    const userActionMenu = (
        <Menu className="m-t-24" style={{ width: 244 }}>
            {userInfo === null ? (
                <>
                    <Menu.Item>
                        <Button size="large" className="w-100" type="primary">
                            <Link to={constants.ROUTES.LOGIN}>Đăng nhập</Link>
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={constants.ROUTES.REGISTER}>
                            <Button size="large" className="w-100 btn-secondary" type="default">
                                Đăng ký
                            </Button>
                        </Link>
                    </Menu.Item>
                </>
            ) : (
                <>
                    {userInfo && userInfo.roles[0] !== constants.ROLES.CUSTOMER && (
                        <Menu.Item>
                            <Button size="large" className="w-100 btn-warning" type="default">
                                <Link to={constants.ROUTES.MANAGER}>Quản lý trang Web</Link>
                            </Button>
                        </Menu.Item>
                    )}
                    <Menu.Item>
                        <Button size="large" className="w-100 btn-secondary" type="default">
                            <Link to={constants.ROUTES.PROFILE}>Quản lý Tài khoản</Link>
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            onClick={onLogout}
                            size="large"
                            className="w-100"
                            type="primary"
                            danger={userInfo != null}
                        >
                            Đăng xuất
                        </Button>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    // rendering...
    return (
        <div
            className="wrap-header container-fluid bg-white max-w-7xl m-auto "
            style={{ height: isSmDevice ? 76 : 104 }}
        >
            <div className="header container h-100 d-flex justify-content-between align-i-center">
                {/* Logo */}
                <Link to="/">
                    <img src={logoUrl} width={isSmDevice ? 78 : 112} height={isSmDevice ? 36 : 48} alt="logo" />
                </Link>

                {/* thanh tìm kiếm */}
                <div className="t-right search-bar-wrapper w-100">
                    <div className="search-bar pos-relative">
                        <AutoComplete
                            className="trans-center w-100"
                            options={options}
                            onChange={(value) => setLinkSearch(helpers.formatQueryString(value))}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        >
                            <Input
                                // maxLength={200}
                                size={isSmDevice ? 'middle' : 'large'}
                                placeholder={!isSmDevice ? 'Nhập từ khoá cần tìm' : 'Tìm kiếm'}
                            />
                        </AutoComplete>
                        <Button type="primary" size={isSmDevice ? 'middle' : 'large'}>
                            <Link to={linkSearch === '' ? locations : initLink + linkSearch}>
                                <SearchOutlined /> {!isSmDevice ? 'Tìm kiếm' : ''}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* thanh công cụ navbar */}
                {isMdDevice ? (
                    <>
                        <Drawer
                            title="Menu"
                            placement="right"
                            closable={true}
                            onClose={() => setDrawerVisible(false)}
                            maskClosable={true}
                            visible={drawerVisible}
                        >
                            <ul className="m-0">
                                <li className="m-b-18">
                                    <Dropdown overlay={userActionMenu} placement="bottomLeft">
                                        <Link
                                            to={
                                                userInfo != null
                                                    ? `${constants.ROUTES.PROFILE}`
                                                    : constants.ROUTES.LOGIN
                                            }
                                        >
                                            {userInfo == null ? (
                                                <div className="d-flex navbar-tool-item p-l-0">
                                                    <UserOutlined className="icon m-r-12" />
                                                    <span className="title">Đăng nhập</span>
                                                </div>
                                            ) : (
                                                <div className="d-flex navbar-tool-item p-l-0">
                                                    <Avatar src={defaultAvt} className="m-r-12" />
                                                    <span className="title">
                                                        {helpers.reduceProductName(userInfo.email, 12)}
                                                    </span>
                                                </div>
                                            )}
                                        </Link>
                                    </Dropdown>
                                </li>
                                <li
                                    className="m-b-18"
                                    onClick={() => {
                                        dispatch(actionsOrder.getMyOrder(userInfo.id));
                                    }}
                                >
                                    <Link
                                        className="d-flex navbar-tool-item p-l-0"
                                        to={constants.ROUTES.PROFILE + '/orders'}
                                    >
                                        <ReconciliationOutlined className="icon m-r-12" />
                                        <span className="title">Đơn hàng</span>
                                    </Link>
                                </li>

                                <li className="m-b-18">
                                    <Dropdown overlay={<Cart list={cartItems} />} placement="bottomLeft" arrow>
                                        <Link className="d-flex navbar-tool-item p-l-0" to={constants.ROUTES.CART}>
                                            <ShoppingCartOutlined className="icon m-r-12" />
                                            <Badge
                                                className="pos-absolute"
                                                size="default"
                                                style={{ color: '#fff' }}
                                                count={totalItemCarts(cartItems)}
                                                overflowCount={9}
                                                offset={[18, -10]}
                                            />

                                            <span className="title">Giỏ hàng</span>
                                        </Link>
                                    </Dropdown>
                                </li>
                            </ul>
                        </Drawer>
                        <MenuOutlined className="menu-icon" onClick={() => setDrawerVisible(true)} />
                    </>
                ) : (
                    <ul className="d-flex m-0">
                        <li
                            onClick={() => {
                                dispatch(actionsOrder.getMyOrder(userInfo.id));
                            }}
                        >
                            <Link
                                className="d-flex flex-direction-column navbar-tool-item p-l-0"
                                to={constants.ROUTES.PROFILE + '/orders'}
                            >
                                <ReconciliationOutlined className="icon" />
                                <span className="title">Đơn hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Dropdown overlay={userActionMenu} placement="bottomCenter">
                                <Link to={userInfo != null ? `${constants.ROUTES.PROFILE}` : constants.ROUTES.LOGIN}>
                                    {userInfo == null ? (
                                        <div className="d-flex flex-direction-column navbar-tool-item">
                                            <UserOutlined className="icon" />
                                            <span className="title">Đăng nhập</span>
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-direction-column navbar-tool-item">
                                            <Avatar src={defaultAvt} className="m-auto" />
                                            <span className="title">
                                                {helpers.reduceProductName(userInfo.email, 12)}
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown overlay={<Cart list={cartItems} />} placement="bottomCenter" arrow>
                                <Link
                                    className="d-flex flex-direction-column navbar-tool-item"
                                    to={constants.ROUTES.CART}
                                >
                                    <ShoppingCartOutlined className="icon" />
                                    <Badge
                                        className="pos-absolute"
                                        size="default"
                                        style={{ color: '#fff' }}
                                        count={totalItemCarts(cartItems)}
                                        overflowCount={9}
                                        offset={[36, -5]}
                                    />

                                    <span className="title">Giỏ hàng</span>
                                </Link>
                            </Dropdown>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Header;
