// routes
import {
    AsyncDashboardComponent,
    AsyncTransactionComponent,
    AsyncPomUsersComponent,
    AsyncMessageCenterComponent,
    AsyncAppointmentComponent,
    AsyncAlertComponent,
    AsyncAdminUserComponent,
    AsyncUserAssignment,
    AsyncGeofenceComponent,
    AsyncSettingsComponent
} from "Components/AsyncComponent/AsyncComponent";

export default [
    {
        path: 'dashboard',
        component: AsyncDashboardComponent
    },
    {
        path: 'transaction',
        component: AsyncTransactionComponent
    }
]