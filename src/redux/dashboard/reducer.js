import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    index: 0
});

const dashboardReducer= (state = initState, action) => {
    switch (action.type) {
        case actions.GET_DATA:
            return state
                .set('loading', true);
        case actions.DATA_SUCCESS_RESULT:
            return state
                .set(action.url, action.payload)
                .set('loading', false)
                .set('error', false);
        case actions.DATA_ERROR_RESULT:
            return state
                .set('result', [])
                .set('loading', false)
                .set('error', true);
        default:
            return state;
    }
};

export default dashboardReducer
