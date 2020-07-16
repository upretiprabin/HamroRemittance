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
const postReciever = (data) => {
    const config = defaultConfig(data);
    console.log(URL.RECIEVER_REGISTER, config)
    return requestHandler.loadData(URL.RECIEVER_REGISTER, config);
}

export default {
    loadData,
    postReciever
}