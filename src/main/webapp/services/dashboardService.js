import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadDashboardData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Dashboard.loadData({
        email
    });
};
export const loadUserData = (data) => {
    // let email = userFromLocalStorage().primaryEmail;
    return middleware.Dashboard.loadUserProfileData({
        data
    });
};

export const loadUserTxnDetails = (data) => {
    // let email = userFromLocalStorage().primaryEmail;
    return middleware.Dashboard.loadUserTxnData({
        data
    });
};