import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const loadTransactionData = () => {
    let email = userFromLocalStorage().primaryEmail;
    return middleware.Transaction.loadData({
        email
    });
};

export const postTransactionData = (data) => {
    data.senderEmailAddress = userFromLocalStorage().username;
    return middleware.Transaction.postData(data);
}
export const postAdminTransactionData = (data) => {
    return middleware.Transaction.postData(data);
}
export const registerReceiver = (data) => {
    data.senderEmailAddress = userFromLocalStorage().username;
    return middleware.Receiver.postReceiver(data);
}
export const registerAdminReceiver = (data) => {
    data.adminUserName = userFromLocalStorage().username;
    return middleware.Receiver.postReceiverAdmin(data);
}

export const loadReceiverData = (data) => {
    if (!data) data = { senderEmailAddress: userFromLocalStorage().username, isCustomerPortal: true };
    return middleware.Transaction.loadReceivers(data);
};

export const loadCompanyChargesData = () => {
    return middleware.Transaction.loadCompanyCharges();
};

export const testData = () => {
    let email = userFromLocalStorage().username;
    return middleware.Transaction.testData({
        email
    });
};
