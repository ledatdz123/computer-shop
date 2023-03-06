import fetch from '@/services/import';
import helpers from '@/utils/helpers';
import constantsImport from '../constants/import';
const actions = {
    createImport: (importDetail) => async (dispatch, getState) => {
        try {
            dispatch({ type: constantsImport.IMPORT_CREATE_REQUEST });
            const {
                authLogin: { userInfo },
            } = getState();
            const value = { iduser: userInfo.id };
            const { data } = await fetch.createImport(value);
            const importItem = {
                idimport: data.data.id,
                idproduct: importDetail.id,
                quantity: importDetail.quantity,
                price: importDetail.importPrice,
            };
            await fetch.addDetailImport(importItem);
            dispatch({
                type: constantsImport.IMPORT_CREATE_SUCCESS,
                payload: data,
            });
            helpers.openNotificationSucces('Nhập hàng thành công', 'Vui lòng check mail để xem đơn hàng');
        } catch (error) {
            dispatch({
                type: constantsImport.IMPORT_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Nhập hàng thất bại', error.response.data.message)
                : helpers.openNotificationError('Nhập hàng thất bại', error.message);
        }
    },

    getAllImport: () => async (dispatch) => {
        try {
            dispatch({
                type: constantsImport.IMPORT_ALL_REQUEST,
            });

            const { data } = await fetch.getAllImport();
            dispatch({
                type: constantsImport.IMPORT_ALL_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: constantsImport.IMPORT_ALL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin phiếu nhập thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin phiếu nhập thất bại', error.message);
        }
    },

    getDetailImport: (id) => async (dispatch) => {
        try {
            dispatch({
                type: constantsImport.IMPORT_DETAIL_REQUEST,
            });

            const { data } = await fetch.getDetailOrder(id);

            dispatch({
                type: constantsImport.IMPORT_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constantsImport.IMPORT_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin phiếu nhập thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin phiếu nhập thất bại', error.message);
        }
    },
};

export default actions;
