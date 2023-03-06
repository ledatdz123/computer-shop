import constants from '../constants/import';

export const importAllReducer = (state = { imports: [] }, action) => {
    switch (action.type) {
        case constants.IMPORT_ALL_REQUEST:
            return { loading: true, imports: [] };
        case constants.IMPORT_ALL_SUCCESS:
            return { loading: false, imports: action.payload };
        case constants.IMPORT_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const importDetailReducer = (state = { import: {} }, action) => {
    switch (action.type) {
        case constants.IMPORT_DETAIL_REQUEST:
            return { loading: true, import: {} };
        case constants.IMPORT_DETAIL_SUCCESS:
            return { loading: false, import: action.payload };
        case constants.IMPORT_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const importCreateReducer = (state = { import: {} }, action) => {
    switch (action.type) {
        case constants.IMPORT_CREATE_REQUEST:
            return { loading: true };
        case constants.IMPORT_CREATE_SUCCESS:
            return { loading: false, success: true, import: action.payload };
        case constants.IMPORT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case constants.IMPORT_CREATE_RESET:
            return { success: false };
        default:
            return state;
    }
};
