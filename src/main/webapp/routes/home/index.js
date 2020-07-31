/**
 * Dashboard
 */

import React, { Component } from 'react'
import ErrorBoundary from "Components/ErrorBoundary/index";
import Controller from "../../controllers/dashboardController"
import { NotificationContainer } from "react-notifications";
import { connect } from 'react-redux';
import {Card} from "reactstrap";
import MatButton from '@material-ui/core/Button';
import Select from "../../components/Select/Select"
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

    onUserLogin() {
        this.props.history.push('/signin');
    }

    signUp(){
        this.props.history.push('/signup');
    }

    render() {
        const {
            loading
        } = this.state;
        const countryRate = 83.29;
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
                        <SessionSlider/>
                    </div>
                    <InstantSend countryRate={countryRate} onContinue={()=>{this.onUserLogin()}}/>
                    <WhyChooseUs/>
                    <HowItWorks onSignUp={()=>{this.signUp()}}/>
                </div>
                }
                <NotificationContainer/>
            </ErrorBoundary>
        )
    }
}

export default connect(null)(Index);