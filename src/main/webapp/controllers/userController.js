import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { userRegistration, sendVerificationCodeToEmail, verifyUserCode, saveUserData } from "../services/passwordService";
const registerUser = (ctx) => {
    const data = { username: ctx.state.email, password: ctx.state.password }
    let isSuccess = false;
    userRegistration(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("User Credentials Saved!")
                isSuccess = true
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            if (isSuccess) {
                sendVerificationCode(ctx.state.email)
                ctx.props.history.push('/verify')

            }
        })

};

const sendVerificationCode = (email) => {
    const data = { email }
    sendVerificationCodeToEmail(data)
        .then(data => {
            if (!data.data.hasOwnProperty('Error')) {
                NotificationManager.success('Verification Code Sent! Please check your email.')
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
}

const verifyUser = (ctx, data) => {
    let isSuccess = false
    verifyUserCode(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                isSuccess = true
                NotificationManager.success("User Verified!")
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            if (isSuccess) {
                ctx.props.history.push('/register')
            }
        })
}
const saveUserDetails = (ctx, formData, data) => {
    saveUserData(formData)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                isSuccess = true
                NotificationManager.success("User Registered!")
            } else {
                if (data.data.Error === "no data available")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            if (isSuccess) {
                localStorage.removeItem('user-email')
                localStorage.removeItem('key')
                this.props.signIn(data, ctx.props.history)
            }
        })
}
export default {
    registerUser, sendVerificationCode, verifyUser, saveUserDetails
}