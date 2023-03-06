import constants from '../constants/product';

export const ProductFilterReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_FILTER_REQUEST:
            return { loading: true, products: [] };
        case constants.PRODUCT_FILTER_SUCCESS:
            return { loading: false, products: action.payload };
        case constants.PRODUCT_FILTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case constants.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case constants.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ProductDetailReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case constants.PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: { reviews: [] } };
        case constants.PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload };
        case constants.PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ProductAllReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_ALL_REQUEST:
            return { loading: true, products: [] };
        case constants.PRODUCT_ALL_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case constants.PRODUCT_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const PeviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case constants.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case constants.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const ProductDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case constants.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case constants.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_DELETE_RESET:
            return { success: false };
        default:
            return state;
    }
};

export const ProductUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case constants.PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case constants.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case constants.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

export const ProductCreateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case constants.PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case constants.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case constants.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_CREATE_RESET:
            return { success: false };
        default:
            return state;
    }
};
