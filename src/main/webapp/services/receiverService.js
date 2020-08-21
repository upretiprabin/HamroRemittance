import middleware from "Middleware";

export const deleteReceiver = (data) => {
    const params = { receiver: true, userName: data };
    return middleware.Receiver.deleteReceiver(params);
};