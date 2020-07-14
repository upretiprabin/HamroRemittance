import { loadTransactionData, postTransationData, testData, registerReceiver } from "../services/transactionService";
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
                    countries: data.data.countiesData,
                    recievers: data.data.recieverData,
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
    addReceiver
}