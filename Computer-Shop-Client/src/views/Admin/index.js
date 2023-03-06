import {
    DashboardOutlined,
    HomeOutlined,
    NotificationOutlined,
    PlusCircleOutlined,
    ReconciliationOutlined,
    LaptopOutlined,
    UnorderedListOutlined,
    TeamOutlined,
    AppstoreOutlined,
    AppleOutlined,
    InboxOutlined,
} from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import SubMenu from 'antd/lib/menu/SubMenu';
import defaultAvt from '@/assets/imgs/default-avt.png';
import logoUrl from '@/assets/imgs/sec_logo.png';
import React, { useState } from 'react';
import './index.scss';
import pages from '@/views';
import * as Redux from 'react-redux';
import actionsAuth from '@/redux/actions/auth';
import actionsUser from '@/redux/actions/user';
import actionsProduct from '@/redux/actions/product';
import actionsCategory from '@/redux/actions/category';
import actionsOrder from '@/redux/actions/order';
import actionsBrand from '@/redux/actions/brand';
import actionsImport from '@/redux/actions/import';
import actionsChart from '@/redux/actions/chart';
const { Sider } = Layout;

const mainColor = '#F78B2D';
const menuList = [
    {
        key: 'd',
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        children: [],
    },
    {
        key: 'c',
        title: 'Categories',
        icon: <AppstoreOutlined />,
        children: [],
    },
    {
        key: 'b',
        title: 'Brands',
        icon: <AppleOutlined />,
        children: [],
    },
    {
        key: 'p',
        title: 'Products',
        icon: <LaptopOutlined />,
        children: [
            { key: 'p0', title: 'List of Product', icon: <UnorderedListOutlined /> },
            { key: 'p1', title: 'Create Product', icon: <PlusCircleOutlined /> },
        ],
    },
    {
        key: 'i',
        title: 'Import Product',
        icon: <InboxOutlined />,
        children: [],
    },
    {
        key: 'u',
        title: 'User',
        icon: <TeamOutlined />,
        children: [],
    },
    {
        key: 'o',
        title: 'Orders',
        icon: <ReconciliationOutlined />,
        children: [],
    },
    {
        key: 'm',
        title: 'Marketing',
        icon: <NotificationOutlined />,
        children: [],
    },
];

function AdminPage() {
    const dispatch = Redux.useDispatch();
    const authLogin = Redux.useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;
    const [keyMenu, setKeyMenu] = useState('d');
    const [collapsed, setCollapsed] = useState(false);
    // fn: Xử lý khi chọn item
    const handleSelected = (e) => {
        const { key } = e;
        setKeyMenu(key);
    };

    // fn: Show Title Selected
    // const showTitleSelected = (key) => {
    //     let result = 'Dashboard';
    //     menuList.forEach((item) => {
    //         if (item.key === key) result = item.title;
    //         item.children.forEach((child) => {
    //             if (child.key === key) result = `${item.title} > ${child.title}`;
    //         });
    //     });
    //     return result;
    // };

    // fn: render menu
    const renderMenuItem = () => {
        // return MenuItem if children = null
        return menuList.map((item) => {
            const { key, title, icon, children } = item;
            if (children.length === 0)
                return (
                    <Menu.Item className="menu-item" key={key} icon={icon}>
                        <span className="menu-item-title">{title}</span>
                    </Menu.Item>
                );
            // else render SubMenu
            return (
                <SubMenu className="menu-item" key={key} icon={icon} title={title}>
                    {children.map((child) => (
                        <Menu.Item className="menu-item" key={child.key} icon={child.icon}>
                            <span className="menu-item-title">{child.title}</span>
                        </Menu.Item>
                    ))}
                </SubMenu>
            );
        });
    };

    // fn: render component tương ứng
    const renderMenuComponent = (key) => {
        switch (key) {
            case 'd':
                dispatch(actionsChart.getTopProduct());
                dispatch(actionsChart.getRevenue('2022-12-07', '2022-12-14'));
                return <pages.Dashboard />;
            case 'c':
                dispatch(actionsCategory.getAllCategory());
                return <pages.Categories />;
            case 'b':
                dispatch(actionsBrand.getAllBrand());
                return <pages.Brands />;
            case 'p0':
                dispatch(actionsProduct.getAllProducts());
                dispatch(actionsCategory.getAllCategory());
                dispatch(actionsBrand.getAllBrand());
                return <pages.Products />;
            case 'p1':
                dispatch(actionsCategory.getAllCategory());
                dispatch(actionsBrand.getAllBrand());
                return <pages.AddProduct />;
            case 'i':
                dispatch(actionsImport.getAllImport());
                return <pages.Import />;
            case 'u':
                dispatch(actionsUser.getAllUser());
                return <pages.Users />;
            case 'o':
                dispatch(actionsOrder.getAllOrder());
                return <pages.Orders />;
            default:
                break;
        }
    };

    // event: logout
    const onLogout = () => {
        dispatch(actionsAuth.logout());
    };

    return (
        <div className="Admin-Page" style={{ backgroundColor: '#e5e5e5' }}>
            {/* header */}
            <div className="d-flex align-i-center" style={{ height: '72px', backgroundColor: mainColor }}>
                <div className="logo t-center" style={{ flexBasis: '200px' }}>
                    <img width={100} height={48} src={logoUrl} alt={'logo'} />
                </div>
                <div className="flex-grow-1 d-flex align-i-end">
                    {/* <h2 className="t-color-primary flex-grow-1 p-l-44 main-title">
                        <span>Admin Page &gt; </span>
                        <span className="option-title">{showTitleSelected(keyMenu)}</span>
                    </h2> */}
                    <div className="flex-grow-1 p-l-44"></div>
                    <a href="/" className="open-web p-r-24 t-color-primary font-weight-500 p-b-10">
                        <HomeOutlined
                            className="icon font-size-28px t-color-primary m-r-10"
                            style={{ transform: 'translateY(3px)' }}
                        />
                        <span className="open-web-title">Open the website</span>
                    </a>
                    <div className="user-admin p-r-24 t-color-primary font-weight-500">
                        <Avatar size={36} className="m-r-10" src={defaultAvt} />
                        <span className="user-admin-title">{userInfo.email}</span>
                    </div>
                    <Button onClick={onLogout} className="m-r-44" type="dashed">
                        Đăng xuất
                    </Button>
                </div>
            </div>
            {/* main content */}
            <div className="d-flex">
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    {/* menu dashboard */}
                    <Menu
                        className="menu pt-6 min-h-screen basis-[200px]"
                        onClick={handleSelected}
                        style={{
                            height: 'inherit',
                            backgroundColor: mainColor,
                        }}
                        defaultSelectedKeys={keyMenu}
                        mode="inline"
                    >
                        {renderMenuItem()}
                    </Menu>
                </Sider>
                {/* main contents */}
                <div className="w-full bg-white">{renderMenuComponent(keyMenu)}</div>
            </div>
        </div>
    );
}

export default AdminPage;
