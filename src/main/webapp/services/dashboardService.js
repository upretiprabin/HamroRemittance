import {userFromLocalStorage} from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadDashboardData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Dashboard.loadData({
        email
    });
};
