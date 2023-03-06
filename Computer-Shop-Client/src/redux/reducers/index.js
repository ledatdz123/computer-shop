import { combineReducers } from 'redux';
import { AuthLoginReducer, AuthProfileReducer, AuthRegisterReducer, AuthUpdateProfileReducer } from './auth';
import {
    brandAllReducer,
    brandCreateReducer,
    brandDeleteReducer,
    brandDetailReducer,
    brandUpdateReducer,
} from './brands';
import { CartReducer } from './cart';
import {
    CategoryAllReducer,
    CategoryCreateReducer,
    CategoryDeleteReducer,
    CategoryDetailReducer,
    CategoryUpdateReducer,
} from './category';
import {
    OrderCancelReducer,
    OrderCreateReducer,
    OrderDeliverReducer,
    OrderStatusReducer,
    OrderDetailsReducer,
    OrderListsReducer,
    OrderMyListReducer,
    OrderPayReducer,
} from './order';
import {
    ProductAllReducer,
    PeviewCreateReducer,
    ProductCreateReducer,
    ProductDeleteReducer,
    ProductDetailReducer,
    ProductListReducer,
    ProductFilterReducer,
    ProductUpdateReducer,
} from './product';
import { importAllReducer, importCreateReducer, importDetailReducer } from './import';
import { UserDeleteReducer, UserDetailReducer, UserListReducer, UserUpdateReducer, UserCreateReducer } from './user';
import { ratingAllReducer, ratingCreateReducer } from './rating';
import { revenueReducer, topProductReducer } from './chart';
export default combineReducers({
    authLogin: AuthLoginReducer,
    authRegister: AuthRegisterReducer,
    authProfile: AuthProfileReducer,
    authUpdateProfile: AuthUpdateProfileReducer,

    brandAll: brandAllReducer,
    brandCreate: brandCreateReducer,
    brandDelete: brandDeleteReducer,
    brandDetail: brandDetailReducer,
    brandUpdate: brandUpdateReducer,

    cart: CartReducer,

    categoryAll: CategoryAllReducer,
    categoryCreate: CategoryCreateReducer,
    categoryDelete: CategoryDeleteReducer,
    categoryDetail: CategoryDetailReducer,
    categoryUpdate: CategoryUpdateReducer,

    orderCancel: OrderCancelReducer,
    orderCreate: OrderCreateReducer,
    orderStatus: OrderStatusReducer,
    orderDetails: OrderDetailsReducer,
    orderLists: OrderListsReducer,
    orderMyList: OrderMyListReducer,
    orderPay: OrderPayReducer,

    productAll: ProductAllReducer,
    peviewCreate: PeviewCreateReducer,
    productCreate: ProductCreateReducer,
    productDelete: ProductDeleteReducer,
    productDetail: ProductDetailReducer,
    productList: ProductListReducer,
    productFilter: ProductFilterReducer,
    productUpdate: ProductUpdateReducer,

    importAll: importAllReducer,
    importCreate: importCreateReducer,
    importDetail: importDetailReducer,

    userDelete: UserDeleteReducer,
    userDetail: UserDetailReducer,
    userList: UserListReducer,
    userUpdate: UserUpdateReducer,
    userCreate: UserCreateReducer,

    ratingAll: ratingAllReducer,
    ratingCreate: ratingCreateReducer,

    revenue: revenueReducer,
    topProduct: topProductReducer,
});
