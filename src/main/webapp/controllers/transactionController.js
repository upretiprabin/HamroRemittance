import { loadTransactionData, postTransationData, testData, registerReceiver, loadReceiverData, loadCompanyChargesData } from "../services/transactionService";
import log from "../services/loggerService"
import { NotificationManager } from "react-notifications";

const loadData = (ctx) => {
    ctx.changeState({ loading: true })
    let stateData = {};
    testTransaction();
    loadTransactionData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                stateData = {
                    // countries: data.data.countiesData,
                    // recievers: data.data.recieverData,
                    sender: data.data.userData
                }
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                ...stateData,
                loading: false
            })
        })

};
const postData = (ctx, data) => {
    ctx.changeState({ loading: true })
    postTransationData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                console.log('data posted')
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                loading: false
            })
        })

};
const loadReceivers = (ctx) => {
    ctx.changeState({ loading: true })
    let stateData = {};
    //TODO : change later
    let data = { "senderId": 2 }
    loadReceiverData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                let recieverData = []
                data.data.result.forEach(el => {
                    recieverData.push({
                        _id: 1,
                        name: { fName: el.firstName, mName: el.middleName, lName: el.lastName },
                        email: el.emailAddress,
                        relation: el.relationshipToSender,
                        address: {
                            aLine1: 'Baneshwor - 3', aLine2: '', state: 'Bagmati', zip: '44600',
                            country: 'Nepal',
                        },
                        phoneNumber: el.phoneNumber,
                        bankDetails: {
                            name: "Kumari Bank Ltd",
                            branch: 'Branch A',
                            acNo: 84223866063914
                        }
                    })
                });
                stateData = {
                    recievers: recieverData
                }
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                ...stateData,
                loading: false
            })
        })

};
const loadCompanyCharges = (ctx) => {
    ctx.changeState({ loading: true })
    let stateData = {};
    loadCompanyChargesData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                let countiesData = []
                data.data.result.forEach(el => {
                    countiesData.push({
                        currency: el.defaultCurrency,
                        name: 'Nepal',
                        rate: el.exchangeRate,
                        code: el.id,
                        fees: el.serviceCharge,
                        taxPercentage: el.taxPercentage,
                        dateCreated: el.dateCreated
                    })
                });
                stateData = {
                    countries: countiesData,
                }
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                ...stateData,
                loading: false
            })
        })

};
const addReceiver = (ctx, data) => {
    ctx.changeState({ loading: true })
    registerReceiver(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                console.log('data posted')
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                loading: false
            })
        })

};


const testTransaction = () => {
    testData()
        .then((data) => {
            console.log(data.data)
        })
}


export default {
    loadData,
    postData,
    addReceiver,
    loadReceivers,
    loadCompanyCharges
}