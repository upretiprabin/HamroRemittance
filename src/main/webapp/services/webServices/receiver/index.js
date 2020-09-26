/**
 * Api calls for Receiver endpoints
 * */

// api
import requestHandler from '../RequestHandler';
import URL from '../UrlMappings';

const defaultConfig = (data) => ({
    method: 'post',
    data
});

const loadData = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA, config);
};
const postReceiver = (data) => {
    const config = defaultConfig(data);
    return requestHandler.loadData(URL.RECIEVER_REGISTER, config);
}
const postReceiverAdmin = (data) => {
    const config = defaultConfig(data);
    return requestHandler.loadData(URL.USER_CREATE, config);
}

const deleteReceiver = (data) => {
    const config = defaultConfig(data);
    console.log(URL.DELETE_CUSTOMER, config)
    return requestHandler.loadData(URL.DELETE_CUSTOMER, config);
}
const editReceiver = (data) => {
    const config = defaultConfig(data);
    console.log(URL.DELETE_CUSTOMER, config)
    return requestHandler.loadData(URL.UPDATE_USER_DETAILS, config);
}

export default {
    loadData,
    postReceiver,
    deleteReceiver,
    editReceiver,
    postReceiverAdmin
}