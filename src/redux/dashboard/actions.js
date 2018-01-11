const dashboardActons = {
    GET_DATA: 'GET_DATA',
    DATA_SUCCESS_RESULT: 'DATA_SUCCESS_RESULT',
    DATA_ERROR_RESULT: 'DATA_ERROR_RESULT',
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
    })
};
export default dashboardActons;
