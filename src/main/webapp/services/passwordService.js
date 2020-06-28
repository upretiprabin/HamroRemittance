import middleware from 'Middleware';

export const sendPasswordResetEmail = (email)=> middleware.User.forgotPassword(email);

export const resetPassword = (resetCode,password)=> middleware.User.resetPassword(resetCode,password);