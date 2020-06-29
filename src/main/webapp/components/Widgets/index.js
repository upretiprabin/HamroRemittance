/**
 * App Widgets
 */
import React from 'react';
import Loadable from 'react-loadable';
import PreloadWidget from 'Components/PreloadLayout/PreloadWidget';

const MyLoadingComponent = () => (
   <PreloadWidget />
);

const SessionSlider = Loadable({
   loader: () => import("./SessionSlider"),
   loading: MyLoadingComponent
});

const VisitorAreaChartWidget = Loadable({
    loader: () => import("./VisitorAreaChart"),
    loading: MyLoadingComponent
});

const SalesAreaChartWidget = Loadable({
    loader: () => import("./SalesAreaChart"),
    loading: MyLoadingComponent
});

const OrdersAreaChartWidget = Loadable({
    loader: () => import("./OrdersAreaChart"),
    loading: MyLoadingComponent
});

const RecentOrdersWidget = Loadable({
    loader: () => import("./RecentOrders"),
    loading: MyLoadingComponent
});

const SupportRequest = Loadable({
    loader: () => import("./SupportRequest"),
    loading: MyLoadingComponent
});

export {
    SessionSlider,
    VisitorAreaChartWidget,
    SalesAreaChartWidget,
    OrdersAreaChartWidget,
    RecentOrdersWidget,
    SupportRequest
}