/**
 * Dashboard
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorBoundary from "Components/ErrorBoundary/index";
import Controller from "../../controllers/dashboardController"
import { NotificationContainer } from "react-notifications";
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
    ordersData,
    txnTableColumns,
    txnTableData,
    txnTableOptions
} from './data';
import MUIDataTable from 'mui-datatables';

class Index extends Component {

    _isMounted = false;

    state = {
        data: null,
        loading: false
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        this.setState(data)
    }

    loadData() {
        Controller.loadData(this);
    }

    render() {
        const {
            loading
        } = this.state;
        return (
            <div className="dashboard-wrapper">

            </div>
        )
    }
}

export default connect(null)(Index);