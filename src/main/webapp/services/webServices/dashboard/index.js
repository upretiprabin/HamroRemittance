/**
 * Api calls for User endpoints
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
const loadUserProfileData = (data) => {
    let config = defaultConfig(data.data);
    return requestHandler.loadData(URL.LOAD_PERSONAL_DATA,config);
}
const loadUserTxnData = (data) => {
    let config = defaultConfig(data.data);
    return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA,config);
}
export default {
    loadData, loadUserProfileData, loadUserTxnData
}