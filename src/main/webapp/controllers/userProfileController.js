import log from "../services/loggerService"
import { NotificationManager } from "react-notifications"
import { updateUserData, changeUserPassword } from "../services/userService";
import { loadUserData } from "../services/dashboardService";
import { getFormattedDate } from "../helpers/helpers";

const getUserDetails = (ctx) => {
    ctx.changeState({ loading: true });
    let userData = {};
    loadUserData()
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                userData = data.data.result
                userData.userImage = ''
                localStorage.setItem("user-profile", JSON.stringify(userData))
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
            ctx.setValuesAndErrors(userData)
        })
};
const updateUser = (ctx, data) => {
    ctx.changeState({ loading: true });
    data.dateOfBirth = getFormattedDate(data.dateOfBirth.toString(), "MM/DD/YYYY"),
        updateUserData(data)
            .then(data => {
                if (!data.data.hasOwnProperty("Error")) {
                    NotificationManager.success('User Updated Successfully!')
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
                ctx.changeState({ loading: false });
                getUserDetails(ctx)
            })
}
const updateUserPassword = (ctx, data) => {
    ctx.changeState({ loading: true });
    changeUserPassword(data)
        .then(data => {
            if (!data.data.hasOwnProperty("Error")) {
                NotificationManager.success('Password Changed Successfully!')
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
            let user = JSON.parse(localStorage.getItem('user'));
            user.sessionPassword = new Buffer(ctx.state.password.value).toString('base64');
            localStorage.setItem('user', JSON.stringify(user))
            ctx.changeState({ loading: false });
        })
}

export default {
    getUserDetails,
    updateUser,
    updateUserPassword
}