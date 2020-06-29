/**
 * Dashboard
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorBoundary from "Components/ErrorBoundary/index";
import Controller from "../../controllers/dashboardController"
import {NotificationContainer} from "react-notifications";
import { connect } from 'react-redux';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IntlMessages from 'Util/IntlMessages';

import {
    VisitorAreaChartWidget,
    SalesAreaChartWidget,
    OrdersAreaChartWidget,
    RecentOrdersWidget,
    SupportRequest
} from "Components/Widgets";


// widgets data
import {
    visitorsData,
    salesData,
    ordersData
} from './data';

class Index extends Component {

    _isMounted = false;

    state = {
        data : null,
        loading : false
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data){
        this.setState(data)
    }

    loadData (){
        Controller.loadData(this);
    }

    render() {
        const {
            loading
        } = this.state;
        return (
            <div className="dashboard-wrapper">
                <ErrorBoundary>
                    {loading &&
                    <div className="page-loader d-flex justify-content-center mb-30">
                        <CircularProgress />
                    </div>
                    }
                    {!loading &&
                    <div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 w-xs-half-block">
                                <VisitorAreaChartWidget
                                    data={visitorsData}
                                />
                            </div>

                            <div className="col-sm-12 col-md-4 w-xs-half-block">
                                <OrdersAreaChartWidget
                                    data={ordersData}
                                />
                            </div>
                            <div className="col-sm-6 col-md-4 w-xs-full">
                                <SalesAreaChartWidget
                                    data={salesData}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <RctCollapsibleCard
                                colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                                heading={<IntlMessages id="widgets.supportRequest" />}
                                collapsible
                                reloadable
                                closeable
                                fullBlock
                                customClasses="overflow-hidden"
                            >
                                <SupportRequest />
                            </RctCollapsibleCard>
                            <RctCollapsibleCard
                                colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
                                heading={<IntlMessages id="widgets.RecentOrders" />}
                                collapsible
                                reloadable
                                closeable
                                fullBlock
                            >
                                <RecentOrdersWidget />
                            </RctCollapsibleCard>
                        </div>
                    </div>
                    }
                    <NotificationContainer/>
                </ErrorBoundary>
            </div>
        )
    }
}

export default connect(null)(Index);