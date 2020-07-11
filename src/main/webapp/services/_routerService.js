// routes
import {
    AsyncDashboardComponent,
    AsyncTransactionComponent
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