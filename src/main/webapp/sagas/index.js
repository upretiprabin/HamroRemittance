/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import basicAuthSagas from './AuthenticationManager';

export default function* rootSaga(getState) {
    yield all([
        basicAuthSagas()
    ]);
}