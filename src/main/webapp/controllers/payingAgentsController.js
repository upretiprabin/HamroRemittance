import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { createNewPayingAgent, fetchPayingAgentList, createNewPayingAgentTransaction, fetchOrdersForPayingAgent } from "../services/payingAgentService";

const createPayingAgent = (ctx, data) => {
    ctx.setLoading(true)
    createNewPayingAgent(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Paying Agent Created!")
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
            ctx.handleIndexChange(1)
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

const createPayingAgentTransaction = (ctx, data) => {
    ctx.setLoading(true)
    createNewPayingAgentTransaction(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Paying Agent Transaction Created!")
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
            ctx.handleIndexChange(0)
        })
}

const fetchOrdersForSelectedPayingAgent = (ctx,data) => {
    ctx.setLoading(true)
    let list = []
    fetchOrdersForPayingAgent(data)
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