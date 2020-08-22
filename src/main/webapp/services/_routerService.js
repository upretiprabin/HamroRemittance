// routes
import {
    AsyncHomeComponent,
    AsyncDashboardComponent,
    AsyncTransactionComponent,
    AsyncReceiverComponent,
    AsyncAdminDashboardComponent,
    AsyncUserProfileComponent
} from "Components/AsyncComponent/AsyncComponent";
import HowItWorks from "../routes/howItWorks";
import AboutUs from "../container/AboutUs";

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
        path: 'receiver',
        component: AsyncReceiverComponent
    },
    {
        path: 'user-profile',
        component: AsyncUserProfileComponent
    }
];

const adminRoutes = [
    {
        path: 'dashboard',
        component: AsyncAdminDashboardComponent
    }
];

export default {
    adminRoutes,
    customerRoutes
}