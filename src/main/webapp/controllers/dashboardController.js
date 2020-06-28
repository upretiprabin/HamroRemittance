import {loadDashboardData} from "../services/dashboardService";
import log from "../services/loggerService"
import {NotificationManager} from "react-notifications";

const loadData = (ctx) =>{
    let stateData = {};
    loadDashboardData()
        .then(data=>{
            if(!data.data.hasOwnProperty("Error")){
                stateData = {
                    userData : data.data.result
                }
            }else{
                if(data.data.Error === "no data available")
                    log.info("No data");
                else{
                    log.error(data.data.Error);
                    NotificationManager.error(data.data.Error)
                }
            }
        })
        .catch(e=>{
            log.error(e);
            NotificationManager.error("Error Occurred!")
        })
        .finally(()=>{
            ctx.changeState({
                ...stateData,
                loading : false
            })
        })

};


export default {
    loadData
}