/**
 * Transaction
 */

import React, { Component } from 'react'
import Controller from "../../controllers/transactionController"
import { NotificationContainer } from "react-notifications";
import ErrorBoundary from "Components/ErrorBoundary/index";
import { connect } from 'react-redux';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import HorizontalLabelPositionBelowStepper from 'Components/Transaction/HorizontalLabelPositionBelowStepper.js';
class Index extends Component {

    _isMounted = false;

    state = {
        countries: [],
        recievers: [],
        sender: null,
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
        if (this._isMounted) {
            this.setState(data)
        }
    }

    loadData() {
        Controller.loadData(this);
        Controller.loadReceivers(this);
        Controller.loadCompanyCharges(this);
    }
    postData(data) {
        Controller.postData(this, data);
    }
    addReceiver(data) {
        Controller.addReceiver(this, data);
    }
    render() {
        const {
            loading
        } = this.state;
        const options = {
            filterType: 'textField',
            rowsPerPage: 5
        };
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
                            <RctCollapsibleCard heading="Send Money">
                                <HorizontalLabelPositionBelowStepper
                                    senderInfo={this.state.sender}
                                    recieverInfo={this.state.recievers}
                                    countries={this.state.countries}
                                    saveTransaction={data => this.postData(data)}
                                    addReceiver={data => { this.addReceiver(data) }} />
                            </RctCollapsibleCard>
                        </div>
                    }
                    <NotificationContainer />
                </ErrorBoundary>
            </div>
        )
    }
}

export default connect(null)(Index);