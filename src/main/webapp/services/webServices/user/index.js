/**
 * Api calls for User endpoints
 * */

// api
import requestHandler from '../RequestHandler';
import URL from '../UrlMappings';
import { userFromLocalStorage } from "../../../sagas/AuthenticationManager";
import AppConfig from "Constants/AppConfig";

const defaultConfig = (data) => ({
    method: 'post',
    data
});

/**
 * login
 */
const loginUser = (email, password) => {
    let config = {
        method: 'post',
        auth: {
            username: email,
            password: password
        }
    };
    return requestHandler.loadData(URL.USER_LOGIN_USER, config);
};

const logout = () => {
    let user = userFromLocalStorage();
    let data = {
        email: user?.username
    };
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.USER_LOGOUT, config);
};

const isUserEnabled = (username, password) => {
    let data = {
        username,
        password: btoa(password)
    };
    let config = {
        method: 'post',
        data
    };
    return requestHandler.loadData(URL.USER_IS_USER_ENABLED, config);
};
const userRegistration = data => {
    let config = defaultConfig(data)
    return requestHandler.loadData(URL.USER_CREATE, config)
}
const sendVerificationCode = data => {
    let config = defaultConfig(data)
    return requestHandler.loadData(URL.SEND_VERIFICATION_CODE, config)
}
const saveUserDetails = data => {
    let config = defaultConfig(data)
    return requestHandler.loadData(URL.USER_REGISTER, config)
}
const verifyUser = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.VERIFY_USER, config)
}

const forgotPassword = (email) => {
    let data = {
        email
    };
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.USER_FORGOT_PASSWORD, config)
}

const resetPassword = (resetCode, password) => {
    let data = {
        resetCode,
        password
    };
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.USER_RESET_PASSWORD, config)
}

const checkSession = (username) => {
    let data = {
        username
    };
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.CHECK_SESSION, config)
}
const updateUserDetails = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.UPDATE_USER_DETAILS, config)
}

const updateUserPassword = (data) => {
    let config = defaultConfig(data)
    return requestHandler.loadData(URL.USER_PASSWORD_CHANGE, config)
}
const registerUser = (data) => {
    let config = defaultConfig(data);
    /**TODO remove fake data and call endpoint after data has all keys present */
    // return requestHandler.loadData(URL.USER_REGISTER, config);
    return new Promise((res, rej) => { res({ data: { result: "" } }) })
};

export default {
    loginUser,
    registerUser,
    isUserEnabled,
    logout,
    userRegistration,
    sendVerificationCode,
    saveUserDetails,
    verifyUser,
    forgotPassword,
    resetPassword,
    checkSession,
    updateUserDetails,
    updateUserPassword
}