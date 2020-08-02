import middleware from 'Middleware';

export const sendPasswordResetEmail = (email) => middleware.User.forgotPassword(email);

export const resetPassword = (resetCode, password) => middleware.User.resetPassword(resetCode, password);

export const userRegistration = (data) => {
    return middleware.User.userRegistration(data)
}
export const sendVerificationCodeToEmail = (data) => {
    return middleware.User.sendVerificationCode(data)
}
export const verifyUserCode = (data) => {
    return middleware.User.verifyUser(data)
}
export const saveUserData = (data) => {
    return middleware.User.saveUserDetails(data)
}