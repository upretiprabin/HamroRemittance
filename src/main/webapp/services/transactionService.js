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
export const registerReceiver = (data) => {
    data.senderEmailAddress = userFromLocalStorage().username;
    return middleware.Receiver.postReceiver(data);
}

export const loadReceiverData = () => {
    const data = { senderEmailAddress: userFromLocalStorage().username };
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
