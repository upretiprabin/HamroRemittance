/**
 * Auth User Reducers
 */
import { NotificationManager } from 'react-notifications';
import {userFromLocalStorage} from "../sagas/AuthenticationManager";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE
} from 'Actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    user: userFromLocalStorage(),
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case LOGIN_USER_FAILURE:
            NotificationManager.error(action.payload?action.payload:'Email and password combination invalid');
            return { ...state, loading: false };
        case LOGOUT_USER:
            return { ...state, loading : false };
        case LOGOUT_USER_SUCCESS:
            if(action.message !== "Expired")
				NotificationManager.success(action.message?action.message:'User Logged Out');
            return { ...state, user: null, loading : false };
        case LOGOUT_USER_FAILURE:
            return { ...state, loading : false };
        default: return { ...state };
    }
}
