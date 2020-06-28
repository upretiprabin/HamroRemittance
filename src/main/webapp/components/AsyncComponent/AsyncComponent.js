/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// dashboard
const AsyncDashboardComponent = Loadable({
    loader: () => import("../../routes/dashboard"),
    loading: () => <RctPageLoader />,
});

export {
    AsyncDashboardComponent
};
