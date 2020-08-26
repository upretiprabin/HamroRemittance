import { NotificationManager } from "react-notifications";

import { loadReceiverData, registerReceiver } from "../services/transactionService";
import { deleteReceiver,updateReceiver } from "../services/receiverService";
import log from "../services/loggerService"

const loadReceivers = (ctx) => {
    let stateData = {};
    loadReceiverData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                let receiverData = []
                let receiverDetails = []
                data.data.result.forEach(el => {
                    let receiverInfo = el.receiver;
                    let address = el.address;
                    let bankDetails = el.bankDetails;
                    receiverData.push({
                        id: receiverInfo?.id,
                        name: (receiverInfo?.firstName ? receiverInfo?.firstName : "") + " " + (receiverInfo?.middleName ? receiverInfo?.middleName : "") + " " + (receiverInfo?.lastName ? receiverInfo?.lastName : ""),
                        email: receiverInfo?.emailAddress,
                        relation: receiverInfo?.relationshipToSender,
                        country: address?.country,
                        phoneNumber: receiverInfo?.phoneNumber,
                        bankName: bankDetails?.bankName
                    })
                    receiverDetails.push({
                        _id: receiverInfo?.id,
                        name: { fName: receiverInfo?.firstName, mName: receiverInfo?.middleName, lName: receiverInfo?.lastName },
                        email: receiverInfo?.emailAddress,
                        relation: receiverInfo?.relationshipToSender,
                        address: {
                            aLine1: address?.addressLineOne, aLine2: address?.addressLineTwo, state: address?.stateProvince, zip: address?.zipCode,
                            country: address?.country,
                            subUrb: address?.suburbCity
                        },
                        phoneNumber: receiverInfo?.phoneNumber,
                        bankDetails: {
                            name: bankDetails?.bankName,
                            branch: bankDetails?.branchId,
                            acNo: bankDetails?.accountNumber
                        }
                    })
                });
                stateData = {
                    receivers: receiverData,
                    receiverDetails: receiverDetails
                }
            } else {
                if (data.data.Error === "No receiver found")
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
            ctx.changeState({
                ...stateData,
            })
            ctx.isAddEdit()
        })

};
const getSelectedReceiverDetails = (ctx, selectedId) => {
    ctx.changeState({
        loading: true
    })
    let stateData = {};
    loadReceiverData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {

            } else {
                if (data.data.Error === "No receiver found")
                    log.info("No data");
                else {
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e => {
            console.log(e)
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                ...stateData,
                loading: false
            })
        })
}

const deleteReceiverData = (ctx, data1, data2) => {
    let stateData = {};
    deleteReceiver(data1).then(data => {
        if (!data.data.hasOwnProperty("Error")) {
            NotificationManager.success(data.data.result.message);
        } else {
            NotificationManager.error(data.data.Error);
        }
        stateData = {
            openDialog: false,
            receiverIndexInUse: 0,
            receivers: data2
        }
    })
        .catch(e => {
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(() => {
            ctx.changeState({
                ...stateData,
            })
        });
};
const addReceiver = (ctx, data) => {
    registerReceiver(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Receiver Added")
                loadReceivers(ctx);
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
            ctx.changeState({
                tableData: true,
                add: false
            })
        })

};

const editReceiver = (ctx, data) => {
    updateReceiver(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success("Receiver Added")
                loadReceivers(ctx);
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
            ctx.changeState({
                tableData: true,
                add: false
            })
        })

};
export default { loadReceivers, deleteReceiverData, getSelectedReceiverDetails, addReceiver,editReceiver }