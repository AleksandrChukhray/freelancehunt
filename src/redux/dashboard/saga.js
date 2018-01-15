import {all, takeEvery, put, call} from 'redux-saga/effects';

import Notification from '../../components/notification';
import actions from './actions';

const serverApi = 'http://localhost:17500/'; /*'http://89.223.29.186:17500/';*/


const param = {
    //mode: 'no-cors',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

// GET http://89.223.29.186:17500/settings – получить настройки
// PUT http://89.223.29.186:17500/settings – сохранить настройки
// GET http://89.223.29.186:17500/chart1 – данные для первого графика
// GET http://89.223.29.186:17500/chart2 – данные для второго графика
// GET http://89.223.29.186:17500/value1 – данные первого показателя
// GET http://89.223.29.186:17500/value2 – данные второго показателя

const onRequest = async (url, type, params) =>{
    const prms = Object.assign(param, {
        method: type, body: JSON.stringify(params)
    });

    return await fetch(`${serverApi}${url}`, prms)
        .then(res => res.json())
        .catch(error => error);
}

function* Request(payload) {
    const {url, type} = payload.payload;
    try {
        const Result = yield call(onRequest, url, type);
        if (Result) {
            yield put(
                actions.getDataSuccessResult(Result, url)
            );
        } else {
            yield put(actions.getDataSuccessResult('', url));
        }
    } catch (error) {
        yield put(actions.getDataErrorResult());
    }
}

function* RequestChart(payload) {
    const {url, type} = payload.payload;
    try {
        const Result = yield call(onRequest, url, type);
        if (Result) {
            yield put(
                actions.chartDataSuccessResult(Result, url)
            );
        } else {
            yield put(actions.chartDataSuccessResult('', url));
        }
    } catch (error) {
        yield put(actions.getDataErrorResult());
    }
}

function* RequestWithNotification(payload) {
    const {url, type, params} = payload.payload;

    try {
        const Result = yield call(onRequest, url, type, params);

        if (Result) {
            if (Result.error){
                yield put(actions.updateDataErrorResult(Result, url));
                    Notification(
                        'error',
                        'Received values of form',
                        JSON.stringify(Result.error)
                    )
            }else{
                yield put(actions.updateDataSuccessResult(Result, url));
                Notification(
                    'success',
                    'Received values of form',
                    JSON.stringify(Result)
                )
            }
        }

    } catch (error) {
        yield put(actions.updateDataErrorResult());
        Notification(
            'error',
            'Received values of form',
            {}
        )
    }
}

export default function* rootSaga() {
    yield all(
        [
            takeEvery(actions.GET_DATA, Request),
            takeEvery(actions.CHART_DATA, RequestChart),
            takeEvery(actions.UPDATE_DATA, RequestWithNotification)
        ]
    );
}
