import middleware from "Middleware";
import { userFromLocalStorage } from "../sagas/AuthenticationManager";

export const registerUser = (data) => {
    return middleware.User.registerUser(data);
};

export const userRegistration = (data) => {
    return middleware.User.userRegistration(data)
};

export const sendVerificationCodeToEmail = (data) => {
    return middleware.User.sendVerificationCode(data)
};

export const verifyUserCode = (data) => {
    return middleware.User.verifyUser(data)
};

export const saveUserData = (data) => {
    return middleware.User.saveUserDetails(data)
};
export const updateUserData = (data) => {
    data.emailAddress = userFromLocalStorage().username
    data.sender = true
    return middleware.User.updateUserDetails(data)
}
export const changeUserPassword = (data) => {
    data.username = userFromLocalStorage().username
    data.oldPassword = new Buffer(data.existingPassword).toString('base64')
    data.newPassword = new Buffer(data.password).toString('base64')
    return middleware.User.updateUserPassword(data)
}
export const saveIdDocument = (data) =>{
    data.emailAddress = userFromLocalStorage().username
    return middleware.User.saveIdentificationDocument(data)
}