import constants from '@/redux/constants/chart';

export const revenueReducer = (state = { datasets: [], labels: [] }, action) => {
    switch (action.type) {
        case constants.GET_REVENUE_REQUEST:
            return { loading: true };
        case constants.GET_REVENUE_SUCCESS:
            return { loading: false, revenue: action.payload };
        case constants.GET_REVENUE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const topProductReducer = (state = { datasets: [], labels: [] }, action) => {
    switch (action.type) {
        case constants.GET_TOP_PRODUCT_REQUEST:
            return { loading: true };
        case constants.GET_TOP_PRODUCT_SUCCESS:
            return { loading: false, success: true, topProducts: action.payload };
        case constants.GET_TOP_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case constants.GET_TOP_PRODUCT_RESET:
            return { success: false };
        default:
            return state;
    }
};
