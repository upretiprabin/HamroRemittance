/**
 * Dashboard
 */

import React, { Component } from 'react'
import ErrorBoundary from "Components/ErrorBoundary/index";
import Controller from "../../controllers/homeController"
import { NotificationContainer } from "react-notifications";
import { connect } from 'react-redux';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

// components
import {
    SessionSlider
} from 'Components/Widgets';
import InstantSend from "../../components/Homepage/InstantSend";
import WhyChooseUs from "../../components/Homepage/WhyChooseUs";
import HowItWorks from "../../components/Homepage/HowItWorks";

class Index extends Component {

    _isMounted = false;

    state = {
        data: null,
        loading: false,
        countryRate: 0
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
        Controller.loadCompanyCharges(this);
    }

    onSend() {
        if (this.props.user)
            this.props.history.push('/app/transaction');
        else
            this.props.history.push('/signin');

    }

    signUp() {
        this.props.history.push('/signup');
    }

    render() {
        const {
            loading, countryRate
        } = this.state;
        const { user } = this.props;
        const noSignUp = !!user;
        return (
            <ErrorBoundary>
                {loading &&
                    <div className="page-loader d-flex justify-content-center mb-30">
                        <CircularProgress />
                    </div>
                }
                {!loading &&
                    <div id={"dashboard-wrapper"} className="dashboard-wrapper">
                        <div className="">
                            <SessionSlider />
                        </div>
                        <InstantSend countryRate={countryRate} onContinue={() => { this.onSend() }} />
                        <WhyChooseUs />
                        <HowItWorks onSignUp={() => { this.signUp() }} noSignup={noSignUp} />
                    </div>
                }
                <NotificationContainer />
            </ErrorBoundary>
        )
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user }
};

export default connect(mapStateToProps)(Index);