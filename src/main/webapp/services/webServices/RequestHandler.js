// api
import api from 'Api';
import { userFromLocalStorage, clearLocalStorage } from "../../sagas/AuthenticationManager";
import log from '../loggerService';
import { NotificationManager } from "react-notifications"

// //api interceptors
api.interceptors.request.use(function (config) {
    if (config.noAuth) {
        delete config.noAuth;
        return config
    }
    if (!config.auth) {
        let user = userFromLocalStorage();
        if (user && user.sessionPassword && user.username) {
            config.auth = {
                username: user.username,
                password: atob(user.sessionPassword)
            }
        }
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    return response;
},function(error){
    let authorizedStatusList = [403,401];
    if(authorizedStatusList.includes(error.response?.status)){
        clearLocalStorage();
        if(location.pathname !== "/signin" && !location.pathname.includes("home")){
            location.href = "/signin";
        }
    }
    return Promise.reject(error);
});

const fakeData = () => {
    return new Promise((res, rej) => {
        res({ data: 'aa11' })
    }).then((d) => d)
};

const loadData = (url,config)=>{
    return api(url,config);
    // return fakeData();
};

export default {
    loadData
}