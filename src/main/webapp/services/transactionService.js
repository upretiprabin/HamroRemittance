import {userFromLocalStorage} from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadTransactionData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Transaction.loadData({
        email
    });
};

export const testData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Transaction.testData({
        email
    });
};
