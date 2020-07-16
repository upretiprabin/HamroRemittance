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
    // return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA, config);
    return new Promise((res, rej) => {
        res({
            data: {
                countiesData: [{ code: "NP", currency: 'NRS', name: "Nepal", rate: 87.16, fees: 9.49 }, { code: "JP", name: "Japan", currency: 'YEN', rate: 88.85, fees: 9.99 },],
                recieverData: [{
                    _id: 1,
                    name: { fName: 'Ram', mName: '', lName: 'Maharjan' },
                    email: 'rammahz018@gmail.com',
                    relation: "Friend",
                    address: {
                        aLine1: 'Baneshwor - 3', aLine2: '', state: 'Bagmati', zip: '44600',
                        country: 'Nepal',
                    },
                    phoneNumber: '9841453564',
                    bankDetails: {
                        name: "Civil Bank",
                        branch: 'Baneshwor',
                        acNo: 84223866063914
                    }
                }, {
                    _id: 2,
                    name: { fName: 'Hari', mName: '', lName: 'Devkota' },
                    email: 'hari.devk999@gmail.com',
                    relation: "Colleague",
                    address: {
                        aLine1: 'Kavre - 8', aLine2: '', state: 'Bagmati', zip: '44600',
                        country: 'Nepal',
                    },
                    phoneNumber: '9849458564',
                    bankDetails: {
                        name: "NIBL",
                        branch: 'Chabahil',
                        acNo: 74951054681914
                    }

                }],
                userData: {
                    _id: 2,
                    email: 'lucile.keb@gmail.com',
                    phoneNumber: '+61 491 570 156',
                    name: { fName: 'Lucile', mName: '', lName: 'Beck' },
                    address: {
                        aLine1: '3 Murphy Street', aLine2: 'Greenwoods Valley', state: 'Western Australia', country: 'Australia',
                    }
                }
            }
        })
    })
};
const postData = (data) => {
    const config = defaultConfig(data);
    console.log(URL.TRANSACTION_CREATE, config)
    return requestHandler.loadData(URL.TRANSACTION_CREATE, config);
}
const loadReceivers = (data) => {
    const config = defaultConfig(data);
    console.log(URL.GET_RECIEVERS, config)
    return requestHandler.loadData(URL.GET_RECIEVERS, config);
}
const loadCompanyCharges = () => {
    const config = {
        method: 'get'
    };
    console.log(URL.GET_COMPANY_CHARGES, config)
    return requestHandler.loadData(URL.GET_COMPANY_CHARGES, config);
}

const testData = (data) => {
    let config = defaultConfig(data);
    return requestHandler.loadData(URL.TRANSACTION_TEST_DATA, config);
}

export default {
    loadData,
    postData,
    testData,
    loadReceivers,
    loadCompanyCharges
}