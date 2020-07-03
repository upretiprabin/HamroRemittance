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
    // return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA,config);
    return new Promise((res, rej) => {
        res({
            data: {
                countiesData: [{ code: "NP", currency: 'NRS', name: "Nepal", rate: 87.16, fees: 9.49 }, { code: "JP", name: "Japan", currency: 'YEN', rate: 88.85, fees: 9.99 },],
                recieverData: [{
                    _id: "5eff463bf7af7db563f0e1eb",
                    name: { fName: 'Ram', mName: '', lName: 'Maharjan' },
                    email: 'rammahz018@gmail.com',
                    address: {
                        aLine1: 'Baneshwor - 3', aLine2: '', state: 'Bagmati',
                        country: 'Nepal',
                    },
                    phoneNumber: '+977 984 1453 564',
                    bankDetails: {
                        name: "Civil Bank",
                        branch: 'Baneshwor',
                        acNo: 84223866063914
                    }
                }, {
                    _id: "5eff463b1b3c901f846c104e",
                    name: { fName: 'Hari', mName: '', lName: 'Devkota' },
                    email: 'hari.devk999@gmail.com',
                    address: {
                        aLine1: 'Kavre - 8', aLine2: '', state: 'Bagmati',
                        country: 'Nepal',
                    },
                    phoneNumber: '+977 984 9458 564',
                    bankDetails: {
                        name: "NIBL",
                        branch: 'Chabahil',
                        acNo: 74951054681914
                    }

                }],
                userData: {
                    _id: "5eff463bd8fd0aa6161a2db8",
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

export default {
    loadData
}