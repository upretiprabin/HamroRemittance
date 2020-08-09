import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { loadCompanyChargesData } from "../services/transactionService";

const loadCompanyCharges = (ctx) => {
    ctx.changeState({ loading: true })
    let stateData = {};
    loadCompanyChargesData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                const companyRates = data.data.result[0]
                stateData = {
                    countryRate: companyRates?.exchangeRate,
                    serviceCharge: companyRates?.serviceCharge
                }
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
                ...stateData,
                loading: false
            })
        })

};

export default {
    loadCompanyCharges
}