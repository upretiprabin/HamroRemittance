import { loadAdminDashboardData, loadTxnStatusData, loadFilteredAdminData, postBulkUpdateData, updateStatus, deleteTransaction, saveTrnValue} from "../services/adminDashboardService";
import log from "../services/loggerService"
import { NotificationManager } from "react-notifications";

const loadData = (ctx) => {
    let tableData = [];
    ctx.setIsLoading(true)
    loadAdminDashboardData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                tableData = data.data.result
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
            ctx.setTableData(tableData)
            ctx.setIsLoading(false)
        })

};
const loadTxnStatus = (ctx) => {
    let txnData = [];
    loadTxnStatusData()
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
            ctx.setTxnStatus(txnData)
        })
}
const loadFilteredData = (ctx) => {
    let tableData = [];
    ctx.setIsLoading(true)
    loadFilteredAdminData(ctx.data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                tableData = data.data.result
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
            ctx.setTableData(tableData)
            ctx.setIsLoading(false)
        })
}

const postBulkUpdate = (ctx) => {
    ctx.setIsLoading(true)
    postBulkUpdateData(ctx.data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success(data.data.result);
            } else {
                if (data.data.Error === "no data available")
                    NotificationManager.error("No data");
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
            ctx.refreshPage();
        })
}
const updateTxnStatus = (ctx) => {
    ctx.setIsLoading(true)
    updateStatus(ctx.data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success(data.data.result);
            } else {
                if (data.data.Error === "no data available")
                    NotificationManager.error("No data");
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
            ctx.refreshPage()
        })
}
const deleteRecord = (ctx) => {
    ctx.setIsLoading(true)
    deleteTransaction(ctx.data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success(data.data.result);
            } else {
                if (data.data.Error === "no data available")
                    NotificationManager.error("No data");
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
            ctx.refreshPage()
        })
}

const saveTRN = (ctx) => {
    ctx.setIsLoading(true)
    saveTrnValue(ctx.trn,ctx.orderDetailsId)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success(data.data.result);
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.refreshPage()
        })
}
export default {
    loadData,
    loadTxnStatus,
    loadFilteredData,
    postBulkUpdate,
    updateTxnStatus,
    deleteRecord,
    saveTRN
}