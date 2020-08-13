/**
 * Dashboard
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorBoundary from "Components/ErrorBoundary/index";
import { NotificationContainer, NotificationManager } from "react-notifications";
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
        loading: true
    };

    componentDidMount() {
        this._isMounted = true;
        const {user} = this.props;
        if (!user['isRegistered']) {
            NotificationManager.error("You haven't been registered yet! Please register to continue.")
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
        this.changeState({loading:false})
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

                                    {/* Receiver List */}
                                    <RctCollapsibleCard
                                        heading='Receivers'
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

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user };
};

export default connect(mapStateToProps)(Index);