import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { createNewPayingAgent, fetchPayingAgentList, createNewPayingAgentTransaction, fetchOrdersForPayingAgent } from "../services/payingAgentService";

const createPayingAgent = (ctx, data) => {
    ctx.setLoading(true)
    createNewPayingAgent(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.error("Paying Agent Created!")
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
            ctx.setLoading(false)
        })
};
const fetchPayingAgents = (ctx) => {
    ctx.setLoading(true)
    let list = []
    fetchPayingAgentList()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                list = data.data.result
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
            ctx.setLoading(false)
            ctx.setPayingAgents(list)
        })
}

const createPayingAgentTransaction = (ctx) => {
    ctx.setLoading(true)
    createNewPayingAgentTransaction(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.error("Paying Agent Transaction Created!")
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
            ctx.setLoading(false)
        })
}

const fetchOrdersForSelectedPayingAgent = (ctx) => {
    ctx.setLoading(true)
    let list = []
    fetchOrdersForPayingAgent()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                list = data.data.result
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
            ctx.setLoading(false)
            ctx.setOrders(list)
        })
}

export default {
    createPayingAgent,
    createPayingAgentTransaction,
    fetchPayingAgents,
    fetchOrdersForSelectedPayingAgent
}