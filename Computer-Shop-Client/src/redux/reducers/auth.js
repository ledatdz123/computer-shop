import constants from '../constants/auth';

export const AuthLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.AUTH_LOGIN_REQUEST:
            return { loading: true };
        case constants.AUTH_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case constants.AUTH_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case constants.AUTH_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const AuthRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.AUTH_REGISTER_REQUEST:
            return { loading: true };
        case constants.AUTH_REGISTER_SUCCESS:
            return { loading: false, success: true };
        case constants.AUTH_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const AuthProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.AUTH_PROFILE_REQUEST:
            return { ...state, loading: true };
        case constants.AUTH_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case constants.AUTH_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case constants.AUTH_PROFILE_RESET:
            return { user: {} };
        default:
            return state;
    }
};

export const AuthUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.AUTH_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true };
        case constants.AUTH_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case constants.AUTH_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case constants.AUTH_UPDATE_PROFILE_RESET:
            return { success: false };
        default:
            return state;
    }
};
