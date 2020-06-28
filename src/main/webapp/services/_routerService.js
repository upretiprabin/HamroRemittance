// routes
import {
    AsyncDashboardComponent,
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
    }
]