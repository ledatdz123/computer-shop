import constants from '@/redux/constants/rating';

export const ratingAllReducer = (state = { rates: [] }, action) => {
    switch (action.type) {
        case constants.RATING_ALL_REQUEST:
            return { loading: true, rates: [] };
        case constants.RATING_ALL_SUCCESS:
            return { loading: false, rates: action.payload };
        case constants.RATING_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ratingCreateReducer = (state = { rate: {} }, action) => {
    switch (action.type) {
        case constants.RATING_CREATE_REQUEST:
            return { loading: true };
        case constants.RATING_CREATE_SUCCESS:
            return { loading: false, success: true, rate: action.payload };
        case constants.RATING_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.RATING_CREATE_RESET:
            return { success: false };
        default:
            return state;
    }
};
