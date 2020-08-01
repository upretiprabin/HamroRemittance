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
    let config = defaultConfig(data);
    // return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA,config);
    return new Promise((res, rej) => {
        res({
            data: {
                result: {
                    firstName: "Maria",
                    middleName: "Doe",
                    lastName: "Ho",
                    userImage: 'http://kundenarea.at/app-assets/images/user/12.jpg',
                    email: "h0.maria.851@gmail.com",
                    phone: "+61 154 312 513"
                }
            }
        })
    }).then((d) => d)
}
const loadUserTxnData = (data) => {
    let config = defaultConfig(data);
    // return requestHandler.loadData(URL.DASHBOARD_LOAD_DATA,config);
    return new Promise((res, rej) => {
        res({
            data: {
                result: [{ "id": "#1212", "invoice": "INV-001001", "customerName": "Cristian Joy", "customerEmail": "cristian@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }, { "id": "#1213", "invoice": "INV-001003", "customerName": "Donatella Arin", "customerEmail": "conatella@example.com", "amount": "180.40", "status": "Paid", "labelClass": "badge-success" }, { "id": "#1214", "invoice": "INV-001004", "customerName": " Slurs", "customerEmail": "vikram@example.com", "amount": "200.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1215", "invoice": "INV-001005", "customerName": "Juan Rodriquez", "customerEmail": "juan@example.com", "amount": "158.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1216", "invoice": "INV-001006", "customerName": "Christia Slurs", "customerEmail": "christia@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }, { "id": "#1212", "invoice": "INV-001001", "customerName": "Cristian Joy", "customerEmail": "cristian@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }, { "id": "#1213", "invoice": "INV-001003", "customerName": "Donatella Arin", "customerEmail": "conatella@example.com", "amount": "180.40", "status": "Paid", "labelClass": "badge-success" }, { "id": "#1214", "invoice": "INV-001004", "customerName": " Slurs", "customerEmail": "vikram@example.com", "amount": "200.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1215", "invoice": "INV-001005", "customerName": "Juan Rodriquez", "customerEmail": "juan@example.com", "amount": "158.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1216", "invoice": "INV-001006", "customerName": "Christia Slurs", "customerEmail": "christia@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }]
            }
        })
    }).then((d) => d)
}
export default {
    loadData, loadUserProfileData, loadUserTxnData
}