import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    spinLoading: false
});

const dashboardReducer= (state = initState, action) => {
    switch (action.type) {
        case actions.GET_DATA:
            return state
                .set('loading', true);
        case actions.DATA_SUCCESS_RESULT:
            let nextState;

            if(action.url === 'settings'){
                nextState = state
                    .set(action.url, action.payload)
                    .set('loading', false)
                    .set('error', false);
            }else{
                nextState = state
                    .set(action.url, action.payload.value ? action.payload : (state.get(action.url) || 0))
                    .set('loading', false)
                    .set('error', false);
            }

            return nextState;

        case actions.DATA_ERROR_RESULT:
            return state
                .set('loading', false)
                .set('error', true);


        case actions.GET_CHART:
            return state
                .set('loading', true);
        case actions.CHART_SUCCESS_RESULT:

            const elements = action.payload.elements.filter(value => value[1] !== null);

            return state
                .set(action.url, {elements})
                .set('loading', false)
                .set('error', false);
        case actions.CHART_ERROR_RESULT:
            return state
                .set('loading', false)
                .set('error', true);


        case actions.UPDATE_DATA:
            return state
                .set('loading', true)
                .set('spinLoading', true);
        case actions.UPDATE_SUCCESS_RESULT:
            return state
                .set(action.url, action.payload.pool)
                .set('loading', false)
                .set('error', false)
                .set('spinLoading', false);
        case actions.UPDATE_ERROR_RESULT:
            return state
                .set(action.url, action.payload.pool)
                .set('loading', false)
                .set('error', true)
                .set('spinLoading', false);
        default:
            return state;
    }
};

export default dashboardReducer
