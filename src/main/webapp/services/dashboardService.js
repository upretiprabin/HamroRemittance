import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadDashboardData = () => {
    let email = userFromLocalStorage().username;
    return middleware.Dashboard.loadData({
        email
    });
};
export const loadUserData = () => {
    let data = { emailAddress: userFromLocalStorage().username };
    return middleware.Dashboard.loadUserProfileData({
        data
    });
};

export const loadUserTxnDetails = () => {
    let data = { emailAddress: userFromLocalStorage().username };
    return middleware.Dashboard.loadUserTxnData({
        data
    });
};