import {all, takeEvery, put, call} from 'redux-saga/effects';
import actions from './actions';

const serverApi = 'http://89.223.29.186:17500/';
const fakerApi = 'https://jsonplaceholder.typicode.com';
const githubApi = 'https://api.github.com/search/repositories?per_page=10&q=javascript&page=1';

const param = {
    //mode: 'no-cors',
    method: 'POST',
};

// GET http://89.223.29.186:17500/settings – получить настройки
// PUT http://89.223.29.186:17500/settings – сохранить настройки
// GET http://89.223.29.186:17500/chart1 – данные для первого графика
// GET http://89.223.29.186:17500/chart2 – данные для второго графика
// GET http://89.223.29.186:17500/value1 – данные первого показателя
// GET http://89.223.29.186:17500/value2 – данные второго показателя

const onRequest = async (url, type) =>
    //await fetch(`${serverApi}${url}`, Object.assign(param, { method: type }))
    await fetch(`${fakerApi}/users`)
        .then(res => res.json())
        .catch(error => error);

function* Request(payload) {
    const { url, type } = payload.payload;
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

export default function* rootSaga() {
    yield all(
        [takeEvery(actions.GET_DATA, Request)]
    );
}
