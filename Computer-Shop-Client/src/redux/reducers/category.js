import constants from "../constants/category";

export const CategoryAllReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      case constants.CATEGORY_ALL_REQUEST:
        return { loading: true, categories: [] };
      case constants.CATEGORY_ALL_SUCCESS:
        return { loading: false, categories: action.payload };
      case constants.CATEGORY_ALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const CategoryDetailReducer = (
    state = { category: {} },
    action
  ) => {
    switch (action.type) {
      case constants.CATEGORY_DETAIL_REQUEST:
        return { loading: true, category: {} };
      case constants.CATEGORY_DETAIL_SUCCESS:
        return { loading: false, category: action.payload };
      case constants.CATEGORY_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const CategoryCreateReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case constants.CATEGORY_CREATE_REQUEST:
        return { loading: true };
      case constants.CATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case constants.CATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case constants.CATEGORY_CREATE_RESET:
        return { success: false };
      default:
        return state;
    }};

  export const CategoryUpdateReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case constants.CATEGORY_UPDATE_REQUEST:
        return { loading: true };
      case constants.CATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case constants.CATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case constants.CATEGORY_UPDATE_RESET:
        return { category: {} };
      default:
        return state;
    }
  };

  export const CategoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case constants.CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case constants.CATEGORY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case constants.CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case constants.CATEGORY_DELETE_RESET:
        return { success: false };
      default:
        return state;
    }
  };
