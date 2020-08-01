import { userFromLocalStorage } from "../sagas/AuthenticationManager";
import middleware from "Middleware";

export const registerUser = (data) => {
    // let email = userFromLocalStorage().primaryEmail;
    return middleware.User.registerUser(data);
};