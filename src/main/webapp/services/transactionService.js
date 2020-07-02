import {userFromLocalStorage} from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadTransactionData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Transaction.loadData({
        email
    });
};
