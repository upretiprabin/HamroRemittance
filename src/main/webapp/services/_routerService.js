// routes
import {
    AsyncHomeComponent,
    AsyncDashboardComponent,
    AsyncTransactionComponent,
    AsyncAdminDashboardComponent
} from "Components/AsyncComponent/AsyncComponent";
import HowItWorks from "../routes/howItWorks";

const customerRoutes = [
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
        path: 'how-it-works',
        component: HowItWorks
    }
];

const adminRoutes =  [
    {
        path: 'dashboard',
        component: AsyncAdminDashboardComponent
    }
];

export default {
    adminRoutes,
    customerRoutes
}