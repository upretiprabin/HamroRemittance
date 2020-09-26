import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { getSenders, saveUserDataFromAdmin, saveIdDocument } from "../services/userService";
import { loadReceiverData, loadCompanyChargesData, postAdminTransactionData, registerReceiver, registerAdminReceiver } from "../services/transactionService";
import { getFormattedDate } from "../helpers/helpers";

const getSenderList = (ctx) => {
    ctx.setLoading(true);
    let userData = []
    getSenders()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                userData = data.data.result
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
            ctx.setLoading(false);
            ctx.setSenderList(userData)
        })
};

const getReceiverList = (data, ctx) => {
    ctx.setLoading(true);
    let receiverList = [];
    loadReceiverData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                receiverList = data.data.result
            } else {
                log.error(data.data.Error);
                NotificationManager.error(data.data.Error)
            }
        })
        .finally(() => {
            ctx.setLoading(false);
            ctx.setReceiverList(receiverList)
        })
};

const getTransactionRates = (ctx) => {
    ctx.setLoading(true);
    let transactionData = [];
    loadCompanyChargesData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                transactionData = data.data.result[0]
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
            ctx.setLoading(false);
            ctx.setCompanyCharges(transactionData)
        })
};
const saveAdminTransaction = (ctx, data) => {
    ctx.setLoader(true);
    postAdminTransactionData(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Transaction Saved!")
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
            ctx.setLoader(false);
        })
};
const saveSender = (ctx, formData) => {
    const userData = {
        username: formData.email,
        password: formData.password,
        firstName: formData.fName,
        middleName: formData.mName,
        lastName: formData.lName,
        phoneNumber: formData.phone,
        dateOfBirth: getFormattedDate(formData.dob.toString(), "MM/DD/YYYY"),
        nationality: formData.nationality,
        sender: true,
        emailAddress: formData.email,
        addressLineOne: formData.aLine1,
        addressLineTwo: formData.aLine2,
        suburbCity: formData.subUrb,
        country: formData.country,
        stateProvince: formData.state,
        zipCode: formData.zip,
    }
    debugger
    saveUserDataFromAdmin(userData)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("UserCreated!")
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
        .finally(() => {
            getSenderList(ctx)
            ctx.setModalOpen(false)
        })
};
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
const saveReceiver = (ctx, data, fetchData) => {
    let formData = {
        firstName: data.fName,
        middleName: data.mName,
        lastName: data.lName,
        relationshipToSender: data.relation,
        phoneNumber: data.phone,
        emailAddress: data.email,
        senderEmailAddress: fetchData.senderEmailAddress,
        receiver: true,
        addressLineOne: data.aLine1,
        addressLineTwo: data.aLine2,
        suburbCity: data.subUrb,
        country: data.country,
        stateProvince: data.state,
        zipCode: data.zip,
        bankName: data.bank,
        branchId: data.branch,
        accountNumber: data.accNumber
    }
    registerReceiver(formData)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Receiver Created!")
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
            getReceiverList(fetchData, ctx)
            ctx.setModalOpen(false)
        })
};

const saveReceiverFromAdmin = (ctx, data, fetchData) => {
    let formData = {
        firstName: data.fName,
        middleName: data.mName,
        lastName: data.lName,
        relationshipToSender: data.relation,
        phoneNumber: data.phone,
        emailAddress: data.email,
        senderEmailAddress: fetchData.senderEmailAddress,
        receiver: true,
        addressLineOne: data.aLine1,
        addressLineTwo: data.aLine2,
        suburbCity: data.subUrb,
        country: data.country,
        stateProvince: data.state,
        zipCode: data.zip,
        remitName: data.remit,
        district: data.district,
        phNumber: data.remitPhone
    }
    registerAdminReceiver(formData)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Receiver Created!")
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
            getReceiverList(fetchData, ctx)
            ctx.setModalOpen(false)
        })
};

export default {
    getSenderList,
    getTransactionRates,
    getReceiverList,
    saveAdminTransaction,
    saveSender,
    saveReceiver,
    saveReceiverFromAdmin
}