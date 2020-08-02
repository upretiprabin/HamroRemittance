/**
 * Dashboard
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorBoundary from "Components/ErrorBoundary/index";
import { NotificationContainer } from "react-notifications";
import { connect } from 'react-redux';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import ReceiverList from '../../components/Dashboard/ReceiverList';
import UserTransactionDetails from '../../components/Dashboard/UserTransactionDetails';
import UserProfileCard from '../../components/Dashboard/UserProfileCard';
import SendMoneyNow from '../../components/Dashboard/SendMoneyNow';

class Index extends Component {

    _isMounted = false;

    state = {
        data: null,
        loading: false
    };

    componentDidMount() {
        this._isMounted = true;
        if (!localStorage.getItem('isRegistered')) {
            this.props.history.push('/register')
        } else {
            this.loadData();
        }
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        this.setState(data)
    }

    loadData() {
        // Controller.loadData(this);
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
                        <div className="container mt-40">
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-8">
                                    <RctCollapsibleCard
                                        heading='Recent Transactions'
                                        collapsible
                                        fullBlock
                                    >
                                        <UserTransactionDetails />
                                    </RctCollapsibleCard>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-4">
                                    <UserProfileCard />

                                    {/* Send Money Button */}
                                    <RctCollapsibleCard>
                                        <SendMoneyNow />
                                    </RctCollapsibleCard>

                                    {/* Reciever List */}
                                    <RctCollapsibleCard
                                        heading='Receivers'
                                        collapsible
                                        fullBlock
                                    >
                                        <ReceiverList />
                                    </RctCollapsibleCard>
                                </div>

                            </div>
                        </div>
                    }
                    <NotificationContainer />
                </ErrorBoundary>
            </div>
        )
    }
}

export default connect(null)(Index);