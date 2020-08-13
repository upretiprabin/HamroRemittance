import { loadDashboardData, loadUserData, loadUserTxnDetails } from "../services/dashboardService";
import { loadCompanyChargesData, loadReceiverData } from '../services/transactionService'
import log from "../services/loggerService"
import { NotificationManager } from "react-notifications";
//TODO: fetch data from endpoints when done
const loadData = (ctx) => {
    let stateData = {};
    loadDashboardData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                stateData = {
                    userData: data.data.result
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
const loadUserProfileData = (ctx) => {
    let userProfileData = {}
    loadUserData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                const temp = data.data.result
                const name = temp.name.split(' ')
                userProfileData = {
                    firstName: name[0],
                    middleName: name.length == 2 ? '' : name[1],
                    lastName: name.length == 2 ? '' : name[2],
                    userImage: "",
                    email: temp.emailAddress,
                    phone: temp.phoneNumber
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
            ctx.setUserData(userProfileData)
        })
}

const pastTxnData = (ctx) => {
    let txnData = [];
    loadUserTxnDetails()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                txnData = data.data.result
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
            ctx.setRecentOrders(txnData)
        })

};
const fetchReceivers = (ctx) => {
    let stateData = {};
    let data = { "senderId": 2 }
    loadReceiverData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                stateData = {
                    people: data.data.result
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
            ctx.setState({
                ...stateData,
                loading: false
            })
        })
}
const getCurrentRates = (ctx) => {
    let rateAndCharges = { rate: 0, charges: 0 }
    loadCompanyChargesData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                rateAndCharges.rate = data.data.result[0].exchangeRate
                rateAndCharges.charges = data.data.result[0].serviceCharge
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
            ctx.setFees(rateAndCharges.charges)
            ctx.setRates(rateAndCharges.rate)
        })

}
export default {
    loadData,
    loadUserProfileData,
    pastTxnData,
    fetchReceivers,
    getCurrentRates
}