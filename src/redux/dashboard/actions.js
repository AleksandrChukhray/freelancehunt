const dashboardActons = {
    GET_DATA: 'GET_DATA',
    DATA_SUCCESS_RESULT: 'DATA_SUCCESS_RESULT',
    DATA_ERROR_RESULT: 'DATA_ERROR_RESULT',

    UPDATE_DATA: 'UPDATE_DATA',
    UPDATE_SUCCESS_RESULT: 'UPDATE_SUCCESS_RESULT',
    UPDATE_ERROR_RESULT: 'UPDATE_ERROR_RESULT',

    getData: (url, type) => ({
        type: dashboardActons.GET_DATA,
        payload: {url, type}
    }),
    getDataSuccessResult: (result, url) => ({
        type: dashboardActons.DATA_SUCCESS_RESULT,
        payload: result,
        url
    }),
    getDataErrorResult: () => ({
        type: dashboardActons.DATA_ERROR_RESULT
    }),
    updateDataSuccessResult: (result, url) => ({
        type: dashboardActons.UPDATE_SUCCESS_RESULT,
        payload: result,
        url
    }),
    updateDataErrorResult: () => ({
        type: dashboardActons.UPDATE_ERROR_RESULT
    }),
    updateData: (url, type, params) => ({
        type: dashboardActons.UPDATE_DATA,
        payload: {url, type, params}
    })
};
export default dashboardActons;
