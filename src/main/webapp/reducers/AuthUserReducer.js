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
    LOGOUT_USER_FAILURE,
    CHECK_USER_SESSION,
    UNCHECK_USER_SESSION,
    USER_LOADED,
    SWITCH_VIEW
} from 'Actions/types';
import {getUserView} from "../sagas/AuthenticationManager";

/**
 * initial auth user
 */
const INIT_STATE = {
    user: userFromLocalStorage(),
    loading: false,
    checkSession : false,
    view : getUserView()
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };
        case CHECK_USER_SESSION:
            return { ...state, loading:true, checkSession : true };
        case UNCHECK_USER_SESSION:
            return { ...state, checkSession : false };
        case USER_LOADED:
            return { ...state, loading:false };
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
        case SWITCH_VIEW:
            let view = action.payload.view;
            if(view){
                // localStorage.setItem("view",view);
                location.pathname = view === "admin"?"/admin":"/app/dashboard";
            }
            return { ...state, view:view?view:INIT_STATE.view };
        default: return { ...state };
    }
}
