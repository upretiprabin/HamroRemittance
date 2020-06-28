/**
 * Api calls for User endpoints
 * */

// api
import requestHandler from '../RequestHandler';
import URL from '../UrlMappings';

const defaultConfig = (data)=>({
    method:'post',
    data
});

const loadData = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA,config);
};

export default {
    loadData
}