/**
 * Api calls for Paying Agents endpoints
 * */

// api
import requestHandler from '../RequestHandler';
import URL from '../UrlMappings';

const defaultConfig = (data) => ({
    method: 'post',
    data
});

const createPayingAgent = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.CREATE_PAYING_AGENT, config);
};
const fetchAgents = () => {
    const config = defaultConfig({});
    return requestHandler.loadData(URL.FETCH_PAYING_AGENTS, config);
}
const createTransaction = (data) => {
    const config = defaultConfig(data);
    return requestHandler.loadData(URL.CREATE_PAYING_TRANSACTION, config);
}

const fetchOrders = (data) => {
    const config = defaultConfig({});
    return requestHandler.loadData(URL.FETCH_ORDERS, config);
}

export default {
    createPayingAgent,
    fetchAgents,
    createTransaction,
    fetchOrders,
}