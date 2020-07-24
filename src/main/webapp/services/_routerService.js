// routes
import {
    AsyncDashboardComponent,
    AsyncTransactionComponent,
    AsyncAdminDashboardComponent
} from "Components/AsyncComponent/AsyncComponent";

export default [
    {
        path: 'dashboard',
        component: AsyncDashboardComponent
    },
    {
        path: 'transaction',
        component: AsyncTransactionComponent
    },
    {
        path: 'admin-dashboard',
        component: AsyncAdminDashboardComponent
    }
]