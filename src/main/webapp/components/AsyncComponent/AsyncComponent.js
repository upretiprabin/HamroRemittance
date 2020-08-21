/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// home
const AsyncHomeComponent = Loadable({
    loader: () => import("../../routes/home"),
    loading: () => <RctPageLoader />,
});

// dashboard
const AsyncDashboardComponent = Loadable({
    loader: () => import("../../routes/dashboard"),
    loading: () => <RctPageLoader />,
});

// dashboard
const AsyncTransactionComponent = Loadable({
    loader: () => import("../../routes/transaction"),
    loading: () => <RctPageLoader />,
});

// receiver
const AsyncReceiverComponent = Loadable({
    loader: () => import("../../routes/receiver"),
    loading: () => <RctPageLoader />
});

// Session Page 404
const AsyncSessionPage404Component = Loadable({
    loader: () => import("Routes/session/404"),
    loading: () => <RctPageLoader />,
});

// admin-dashboard
const AsyncAdminDashboardComponent = Loadable({
    loader: () => import("../../routes/admin-dashboard"),
    loading: () => <RctPageLoader />,
});
export {
    AsyncDashboardComponent,
    AsyncHomeComponent,
    AsyncSessionPage404Component,
    AsyncTransactionComponent,
    AsyncReceiverComponent,
    AsyncAdminDashboardComponent
};
