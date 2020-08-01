import { registerUser } from "../services/userService";
import log from "../services/loggerService"
import { NotificationManager } from "react-notifications";

const register = (ctx,data) => {
    registerUser(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success('User Registered! Logging in..')
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
            /**
             * change this block of code for sign in
             */
            ctx.props.signIn(
                {
                    email: '',
                    password: ''
                }
                , ctx.props.history);
        })

};

export default { register }