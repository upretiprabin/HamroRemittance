import { loadTransactionData, postTransactionData, testData, registerReceiver, loadReceiverData, loadCompanyChargesData } from "../services/transactionService";
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
    let isSuccess = false
    postTransactionData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                isSuccess = true;
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
        .finally(async () => {
            if (isSuccess) {
                NotificationManager.success('Transaction Posted for Verification')
                ctx.changeState({ loading: false })
            }
        })

};
const loadReceivers = (ctx) => {
    // ctx.changeState({ loading: true })
    let stateData = {};
    //TODO : change later
    let data = { "senderId": 3 }
    loadReceiverData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                let receiverData = []
                data.data.result.forEach(el => {
                    console.log("el", el)
                    let receiverInfo = el.receiver;
                    let address = el.address;
                    let bankDetails = el.bankDetails;

                    receiverData.push({
                        _id: receiverInfo?.id,
                        name: { fName: receiverInfo?.firstName, mName: receiverInfo?.middleName, lName: receiverInfo?.lastName },
                        email: receiverInfo?.emailAddress,
                        relation: receiverInfo?.relationshipToSender,
                        address: {
                            aLine1: address?.addressLineOne, aLine2: address?.addressLineTwo, state: address?.stateProvince, zip: address?.zipCode,
                            country: address?.country,
                        },
                        phoneNumber: receiverInfo?.phoneNumber,
                        bankDetails: {
                            name: bankDetails?.bankName,
                            branch: bankDetails?.branchId,
                            acNo: bankDetails?.accountNumber
                        }
                    })
                });
                stateData = {
                    receivers: receiverData
                }
            } else {
                if (data.data.Error === "No receiver found")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            console.log(e)
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                ...stateData,
                // loading: false
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
    // ctx.changeState({ loading: true })
    registerReceiver(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                console.log('data posted')
                loadReceivers(ctx);
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
            // ctx.changeState({
            //     loading: false
            // })
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