import constantsChart from '../constants/chart';
import fetch from '../../services/annual';
import helpers from '@/utils/helpers';

const actions = {
    getRevenue: (startDate, endDate) => async (dispatch) => {
        try {
            const datasets = [];
            const labels = [];
            dispatch({
                type: constantsChart.GET_REVENUE_REQUEST,
            });

            const { data } = await fetch.annualDate(startDate, endDate);
            const object = data.data.map(([label, data]) => ({ label, data }));
            for (let i = 0; i <= object.length - 1; i++) {
                datasets.push(object[i].data);
                labels.push(object[i].label);
            }
            dispatch({
                type: constantsChart.GET_REVENUE_SUCCESS,
                payload: { datasets, labels },
            });
        } catch (error) {
            dispatch({
                type: constantsChart.GET_REVENUE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin thất bại', error.message);
        }
    },

    getTopProduct: () => async (dispatch, getState) => {
        try {
            const datasets = [];
            const labels = [];
            dispatch({
                type: constantsChart.GET_TOP_PRODUCT_REQUEST,
            });

            const { data } = await fetch.annualProduct();
            const object = data.data.map(([id, label, code, data]) => ({ id, label, code, data }));
            for (let i = 0; i <= object.length - 1; i++) {
                datasets.push(object[i].data);
                labels.push(object[i].label);
            }
            dispatch({
                type: constantsChart.GET_TOP_PRODUCT_SUCCESS,
                payload: { datasets, labels },
            });
        } catch (error) {
            dispatch({
                type: constantsChart.GET_TOP_PRODUCT_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            error.response && error.response.data.message
                ? helpers.openNotificationError('Lấy thông tin thất bại', error.response.data.message)
                : helpers.openNotificationError('Lấy thông tin thất bại', error.message);
        }
    },
};

export default actions;
