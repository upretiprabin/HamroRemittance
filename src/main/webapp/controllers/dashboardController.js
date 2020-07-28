import { loadDashboardData, loadUserData, loadUserTxnDetails } from "../services/dashboardService";
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
    //TODO get Sender id from localStorage
    const data = { sender: 2 }
    loadUserData(data)
        .then(data => {
            console.log(data);
            if (!data.data.hasOwnProperty("Error")) {
                userProfileData = data.data.result
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
    let stateData = {};
    loadUserTxnDetails()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                stateData = {
                    recentOrders: data.data.result
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
                ...stateData
            })
        })

};
const receiverList = (ctx) => {

}
const getCurrentRates = (ctx) =>{
    
}
export default {
    loadData,
    loadUserProfileData,
    pastTxnData,
    receiverList,
    getCurrentRates
}