import middleware from "Middleware";
import { userFromLocalStorage } from "../sagas/AuthenticationManager";
export const deleteReceiver = (data) => {
    const params = { receiver: true, userName: data };
    return middleware.Receiver.deleteReceiver(params);
};
export const updateReceiver = (data) => {
    data.senderEmailAddress = userFromLocalStorage().username;
    return middleware.Receiver.editReceiver(data);
}
