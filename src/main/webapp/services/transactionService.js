import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadTransactionData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Transaction.loadData({
        email
    });
};

export const postTransationData = (data) => {
    return middleware.Transaction.postData(data);
}
export const registerReceiver = (data) => {
    return middleware.Receiver.postReciever(data);
}
export const testData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Transaction.testData({
        email
    });
};
