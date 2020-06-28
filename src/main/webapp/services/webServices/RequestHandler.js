// api
import api from 'Api';
import {userFromLocalStorage} from "../../sagas/AuthenticationManager";
import log from '../loggerService';

//api interceptors
api.interceptors.request.use(function (config) {
    if(config.noAuth){
        delete config.noAuth;
        return config
    }
    if(!config.auth){
        let user = userFromLocalStorage();
        if(user?.sessionPassword && user?.primaryEmail){
            config.auth = {
                username : user.primaryEmail,
                password : user.sessionPassword
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
        if(location.pathname !== "/signin")
            location.href = "/signin";
    }
    return Promise.reject(error);
});

const fakeData = ()=>{
    return new Promise((res,rej)=>{
        res({data:'aa11'})
    }).then((d)=>d)
};

const loadData = (url,config)=>{
    // return api(url,config);
    return fakeData();
};

export default {
    loadData
}