import {all} from 'redux-saga/effects';
import authSagas from './auth/saga';
import dashboardSaga from './dashboard/saga';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        dashboardSaga()
    ]);
}
