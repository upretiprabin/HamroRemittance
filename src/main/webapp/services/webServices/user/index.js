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
    let data = {
        email: email
    };
    let config = {
        method: 'post',
        data,
        auth: {
            username: email,
            password: password
        }
    };
    return new Promise((res, rej) => { res({ data: { result: "" } }) })
    // return requestHandler.loadData(URL.USER_LOGIN_USER,config);
};

const logout = () => {
    let user = userFromLocalStorage();
    let data = {
        email: user?.primaryEmail
    };
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.USER_LOGOUT, config);
};

const registerUser = (data) =>{
    let config = defaultConfig(data);
    /**TODO remove fake data and call endpoint after data has all keys present */
    // return requestHandler.loadData(URL.USER_REGISTER, config);
    return new Promise((res, rej) => { res({ data: { result: "" } }) })
}

export default {
    loginUser,
    logout,
    registerUser
}