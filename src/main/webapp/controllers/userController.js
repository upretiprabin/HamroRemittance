import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { userRegistration, sendVerificationCodeToEmail, verifyUserCode, saveUserData, saveIdDocument } from "../services/userService";
import { getFormattedDate } from "../helpers/helpers";

const registerUser = (ctx) => {
    const data = { username: ctx.state.email, password: ctx.state.password };
    ctx.setState({ loading: true });
    userRegistration(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("User Created Successfully");
                localStorage.setItem("user-email", ctx.state.email);
                ctx.props.history.push("/verify")
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({ loading: false })
        })

};

const sendVerificationCode = (ctx, email) => {
    const data = { username: email };
    ctx.changeState({ loading: true });
    sendVerificationCodeToEmail(data)
        .then(data => {
            if (!data.data.hasOwnProperty('Error')) {
                NotificationManager.success('Verification Code Sent! Please check your email.')
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({ loading: false })
        })
}

const verifyUser = (ctx, data) => {
    ctx.setState({ loading: true });
    verifyUserCode(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("User Verified!");
                ctx.props.history.push('/register')
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.setState({ loading: true });
        })
};

const saveUserDetails = (ctx, formData) => {
    let email = localStorage.getItem("user-email");
    const userData = {
        firstName: formData.fName,
        middleName: formData.mName,
        lastName: formData.lName,
        phoneNumber: formData.phone,
        dateOfBirth: getFormattedDate(formData.dob.toString(), "MM/DD/YYYY"),
        nationality: formData.nationality,
        sender: true,
        emailAddress: email,
        addressLineOne: formData.aLine1,
        addressLineTwo: formData.aLine2,
        suburbCity: formData.subUrb,
        country: formData.country,
        stateProvince: formData.state,
        zipCode: formData.zip,
    }
    saveUserData(userData)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                localStorage.removeItem("user-email");
                NotificationManager.success("User Registered Successfully");
                saveUserIdentificationDoc(ctx, formData);
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
}

const saveUserIdentificationDoc = (ctx, formData) => {
    const fileData = {
        documentType: formData.docType.value,
        identityNumber: formData.docId.value,
        issuedBy: "***",
        expiryDate: formData.docType.value,
        identityImage: formData.file.value
    }
    saveIdDocument(fileData)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Document Saved");
                ctx.props.history.push('/signin');
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
}
export default {
    registerUser, sendVerificationCode, verifyUser, saveUserDetails, saveUserIdentificationDoc
}