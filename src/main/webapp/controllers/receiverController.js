import { NotificationManager } from "react-notifications";

import { loadReceiverData } from "../services/transactionService";
import { deleteReceiver } from "../services/receiverService";
import log from "../services/loggerService"

const loadReceivers = (ctx) => {
    let stateData = {};
    loadReceiverData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                let receiverData = []
                data.data.result.forEach(el => {
                    let receiverInfo = el.receiver;
                    let address = el.address;
                    let bankDetails = el.bankDetails;
                    receiverData.push({
                        id: receiverInfo?.id,
                        name: (receiverInfo?.firstName?receiverInfo?.firstName:"") + " " + (receiverInfo?.middleName?receiverInfo?.middleName:"") + " " + (receiverInfo?.lastName?receiverInfo?.lastName:""),
                        email: receiverInfo?.emailAddress,
                        relation: receiverInfo?.relationshipToSender,
                        country: address?.country,
                        phoneNumber: receiverInfo?.phoneNumber,
                        bankName: bankDetails?.bankName
                    })
                });
                stateData = {
                    receivers: receiverData
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
        })

};

const deleteReceiverData = (ctx, data1, data2) => {
    let stateData = {};
    deleteReceiver(data1).then(data => {
        if (!data.data.hasOwnProperty("Error")) {
            NotificationManager.success(data.data.result.message);
        }else{
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

export default { loadReceivers, deleteReceiverData }