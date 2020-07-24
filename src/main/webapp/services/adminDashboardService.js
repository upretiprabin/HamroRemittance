import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadAdminDashboardData = () => {
    // let email = userFromLocalStorage().primaryEmail;
    return middleware.AdminDashboard.loadData({});
};
export const loadTxnStatusData = () => {
    // let email = userFromLocalStorage().primaryEmail;
    return middleware.AdminDashboard.loadStatusData();
};

export const loadFilteredAdminData = (data) => {
    return middleware.AdminDashboard.loadFilteredData(data);
}
export const postBulkUpdateData = (data) => {
    return middleware.AdminDashboard.postBulkUpdate(data);
}
export const updateStatus = (data) => {
    return middleware.AdminDashboard.updateTxnStatus(data);
}
export const deleteTransaction=(data)=>{
    return middleware.AdminDashboard.deleteTransactionData(data);
}