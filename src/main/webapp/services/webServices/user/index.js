/**
 * Api calls for User endpoints
 * */

// api
import requestHandler from '../RequestHandler';
import URL from '../UrlMappings';
import {userFromLocalStorage} from "../../../sagas/AuthenticationManager";
import AppConfig from "Constants/AppConfig";

const defaultConfig = (data)=>({
    method:'post',
    data
});


/**
 * login
 */
const loginUser = (email,password) => {
    let config = {
        method:'post',
        auth:{
            username: email,
            password: password
        }
    };
    return requestHandler.loadData(URL.USER_LOGIN_USER,config);
};

const logout = () => {
    let user = userFromLocalStorage();
    let data = {
        email:user?.primaryEmail
    };
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.USER_LOGOUT,config);
};

const isUserEnabled = (username,password) => {
    let data = {
        username,
        password : btoa(password)
    };
    let config = {
        method:'post',
        data
    };
    return requestHandler.loadData(URL.USER_IS_USER_ENABLED,config);
};

export default {
    loginUser,
    isUserEnabled,
    logout
}