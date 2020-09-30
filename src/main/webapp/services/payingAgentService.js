import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const createNewPayingAgent = (data) => {
    return middleware.PayingAgents.createPayingAgent({
        data
    });
};
export const fetchPayingAgentList = () => {
    return middleware.PayingAgents.fetchAgents();
};

export const createNewPayingAgentTransaction = (data) => {
    return middleware.PayingAgents.createTransaction({
        data
    });
};
export const fetchOrdersForPayingAgent = () => {
    return middleware.PayingAgents.fetchOrders();
};