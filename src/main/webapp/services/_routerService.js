// routes
import {
    AsyncHomeComponent,
    AsyncDashboardComponent,
    AsyncTransactionComponent,
    AsyncAdminDashboardComponent
} from "Components/AsyncComponent/AsyncComponent";

export default [
    {
        path: 'home',
        component: AsyncHomeComponent
    },
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