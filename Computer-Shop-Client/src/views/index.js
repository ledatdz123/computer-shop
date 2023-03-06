import React from 'react';
// import Home from './Home';
// import Login from './Login';
// import Product from './Product';
// import Register from './Register';
// import Filter from './SearchFilter/Filter';

// import Admin from './Admin';
// import Users from './Admin/Users';
// import Orders from './Admin/Orders';
// import Products from './Admin/Products/SeeProduct';
// import AddProduct from './Admin/Products/ProductAddForm';
// import Customers from './Admin/Customers';
// import Dashboard from './Admin/Dashboard';

// import Result_403 from './Result/403';
// import Result_404 from './Result/404';
// import Result_500 from './Result/500';

const pages = {
    Home: React.lazy(() => import('./Home')),
    Login: React.lazy(() => import('./Login')),
    Product: React.lazy(() => import('./Product')),
    Register: React.lazy(() => import('./Register')),
    Filter: React.lazy(() => import('./SearchFilter/Filter')),
    Cart: React.lazy(() => import('@/components/Cart')),
    Payment: React.lazy(() => import('./Payment')),
    Profile: React.lazy(() => import('./Profile')),
    MyOrder: React.lazy(() => import('./Profile/OrderList')),
    Search: React.lazy(() => import('./SearchFilter/Search')),

    Admin: React.lazy(() => import('./Admin')),
    Users: React.lazy(() => import('./Admin/Users/UserList')),
    Orders: React.lazy(() => import('./Admin/Orders')),
    Products: React.lazy(() => import('./Admin/Products/ProductList')),
    AddProduct: React.lazy(() => import('./Admin/Products/ProductCreate')),
    Dashboard: React.lazy(() => import('./Admin/Dashboard')),
    Categories: React.lazy(() => import('./Admin/Categories/CategoryList')),
    Import: React.lazy(() => import('./Admin/Import/ImportList')),
    Brands: React.lazy(() => import('./Admin/Brands/BrandList')),

    Result_403: React.lazy(() => import('./Result/403')),
    Result_404: React.lazy(() => import('./Result/404')),
    Result_500: React.lazy(() => import('./Result/500')),
};

// const pages = {
//     Home,
//     Login,
//     Product,
//     Register,
//     Filter,

//     Admin,
//     Users,
//     Orders,
//     Products,
//     AddProduct,
//     Customers,
//     Dashboard,

//     Result_403,
//     Result_404,
//     Result_500,
// };

export default pages;
