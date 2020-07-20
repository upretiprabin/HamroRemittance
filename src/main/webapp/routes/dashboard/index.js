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
import {Card, CardTitle, FormGroup, Input} from "reactstrap";
import MatButton from '@material-ui/core/Button';
import Select from "../../components/Select/Select"
import {
    VisitorAreaChartWidget,
    SalesAreaChartWidget,
    OrdersAreaChartWidget,
    RecentOrdersWidget,
    SupportRequest
} from "Components/Widgets";

// components
import {
    SessionSlider
} from 'Components/Widgets';

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
        const countryList = [
            {
            'id' : 1,
            'name' : 'Nepal'
            }
        ];

        return (
            <div className="dashboard-wrapper">
                <div className="">
                    <SessionSlider />
                </div>
                <div className="container send">
                    <div className="mb-15">
                        <h1>A better and secure way</h1>
                    </div>
                    <h3>to send money from Australia to Nepal</h3>
                    <div className="select-country mt-15 mb-15">
                        <Select
                            optionList={countryList}
                            selection={"Nepal"}
                        />
                    </div>
                    <h5>Today's Rate : 83.2900 NPR</h5>
                    <MatButton className="btn btn-primary mt-10">Continue</MatButton>
                </div>
            </div>
        )
    }
}

export default connect(null)(Index);