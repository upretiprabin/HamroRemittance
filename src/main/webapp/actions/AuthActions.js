/**
 * Auth Actions
 * Auth Action With Basic Auth, Google, Facebook, Twitter and Github
 */
import {
    LOGIN_USER,
    CHECK_USER_SESSION,
    UNCHECK_USER_SESSION,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    USER_LOADED
} from './types';

/**
 * Custom action for basic authentication
 * */
export const signIn = (user, history) => ({
    type: LOGIN_USER,
    payload: { user, history }
});


/**
 * Redux Action Signin User Success
 */
export const signinUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

/**
 * Redux Action Signin User Failure
 */
export const signinUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error
});

/**
 * Redux Action To Signout User
 */
export const logoutUser = (message = null) => ({
    type: LOGOUT_USER,
    message : message
});

/**
 * Redux Action Signout User Success
 */
export const logoutUserSuccess = (message) => ({
    type: LOGOUT_USER_SUCCESS,
    message
});

/**
 * Redux Action Signout User Failure
 */
export const logoutUserFailure = () => ({
    type: LOGOUT_USER_FAILURE
});
