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
    const userData = {
        firstName: formData.fname,
        middleName: formData.mName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        dateOfBirth: formData.dob,
        nationality: formData.nationality,
        sender: true,
        emailAddress: localStorage.getItem('user-email'),
        addressLineOne: formData.aLine1,
        addressLineTwo: formData.aLine2,
        suburbCity: formData.subUrb,
        country: formData.country,
        stateProvince: formData.state,
        zipCode: formData.zip,
        bankName: "Himalayan Bank",
        branchId: "KathmanduNP",
        accountNumber: "123456"
    }
    saveUserData(userData)
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
            localStorage.setItem('isRegistered', true)
        })
}
export default {
    registerUser, sendVerificationCode, verifyUser, saveUserDetails
}