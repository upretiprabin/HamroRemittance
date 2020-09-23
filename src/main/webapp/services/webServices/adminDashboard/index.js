/**
 * Api calls for admin-dashboard endpoints
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
    return requestHandler.loadData(URL.GET_TXN_DATA, config);
};
const loadStatusData = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.GET_TXT_STATUS, config)
}
const loadFilteredData = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.GET_FILTERED_TXT_DATA, config)
}
const postBulkUpdate = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.POST_BULK_DATA, config)
}
const updateTxnStatus = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.UPDATE_TXN_STATUS, config)
}
const deleteTransactionData = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.TRANSACTION_DELETE, config)
}

const saveTrnValue = (trn,orderDetailsId) => {
    let config = defaultConfig({trnNumber: trn, orderDetailsId: orderDetailsId});
    return requestHandler.loadData(URL.SAVE_TRN_VALUE, config)
}

export default {
    loadData,
    loadStatusData,
    loadFilteredData,
    postBulkUpdate,
    updateTxnStatus,
    deleteTransactionData,
    saveTrnValue
}