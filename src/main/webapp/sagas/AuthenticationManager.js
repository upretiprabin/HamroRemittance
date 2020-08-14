/**
 * BasicAuth Sagas
 */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
    LOGIN_USER,
    LOGOUT_USER
} from 'Actions/types';

import {
    signinUserSuccess,
    signinUserFailure,
    logoutUserFailure,
    logoutUserSuccess
} from 'Actions';
import { NotificationManager } from 'react-notifications';

import middleware from 'Middleware'
import log from '../services/loggerService'

/**
 * Signin User With BasicAuth
 */
export function* signinUserWithBasicAuth() {
    yield takeLatest(LOGIN_USER, signInUserWithEmailPassword);
}

/**
 * Signout User
 */
export function* signOutUser() {
    yield takeLatest(LOGOUT_USER, signOut);
}

export function clearLocalStorage() {
    localStorage.clear()
}

export function userFromLocalStorage(){
    return JSON.parse(localStorage.getItem('user'))
}

export function userProfileFromLocalStorage(){
    return JSON.parse(localStorage.getItem('user-profile'))
}

export function isUserAdmin(){
    let user = userFromLocalStorage();
    // return user?.isAdmin
    return true;
}

const signInUserWithEmailPasswordRequest = (email, password) =>
    middleware.User.loginUser(email, password);

/**
 * Signout Request
 */
const signOutRequest = async () =>
    await middleware.User.logout()
        .then(authUser => authUser)
        .catch(error => error);

const isUserEnabledCheck = (email, password)=>
    middleware.User.isUserEnabled(email,password);

export function getUserView(){
    return location.pathname.includes("admin")?"admin":"customer";
}

/**
 * Check user session
 * */
export const authenticateUser = ()=>
    middleware.User.checkSession(userFromLocalStorage()?.username);

/**
 * Signin User With Email & Password
 */
export function* signInUserWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;

    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);
        if (signInUser.message) {
            yield put(signinUserFailure(signInUser.message));
        }
        else {
            let user = signInUser.data.result;
            if(user){
                user['sessionPassword'] = btoa(password);
                localStorage.setItem('user', JSON.stringify(user));
                yield put(signinUserSuccess(signInUser.data.result));
                history.push('/app/dashboard');
                NotificationManager.success('User Logged In');
            }else{
                yield put(signinUserFailure("Error Occurred"));
            }
        }
    }
    catch (error) {
        log.error(error.message);
        try{
            const checkUser = yield call(isUserEnabledCheck, email,password);
            if(checkUser.message){
                yield put(signinUserFailure(checkUser.message));
            }else{
                let result = checkUser.data.Error;
                if(result){
                    if(result.toString().toLowerCase() === "account locked"){
                        clearLocalStorage()
                    }
                    yield put(signinUserFailure(result));
                }
            }
        }catch(error){
            log.error(error.message);
            yield put(signinUserFailure(error.message));
        }
    }
}


/**
 * Signout User
 */
function* signOut({message}) {
    try {
        if(message !== "Expired")
            yield call(signOutRequest);
        clearLocalStorage();
        yield put(logoutUserSuccess(message))
    } catch (error) {
        yield put(logoutUserFailure());
    }
}



/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(signinUserWithBasicAuth),
        fork(signOutUser)
    ]);
}