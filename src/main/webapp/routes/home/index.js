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
        const countryList = [
            {
                'id' : 1,
                'name' : 'Nepal'
            }
        ];

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
                        <h5>Today's Rate : {countryRate} NPR</h5>
                        <MatButton className="btn btn-primary mt-10" onClick={() => this.onUserLogin()}>Continue</MatButton>
                    </div>
                    <div className="choose mb-40">
                        <Card body>
                            <h2 className={"text-9 text-center mt-60"}>Why should you choose Hamro Remit?</h2>
                            <p className="text-4 text-center mb-5">Here’s Top 4 reasons why</p>
                            <div className="mt-30 container mb-30">
                                <div className="row">
                                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                        <div className="featured-box">
                                            <div className="featured-box-icon text-primary">
                                                <i className="fa fa-hand-pointer-o fa-lg" aria-hidden="true"/></div>
                                            <h3>Easy to use</h3>
                                            <p className="text-3">We provide sophisticated UI which makes your
                                                transaction smooth and easy </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                        <div className="featured-box">
                                            <div className="featured-box-icon text-primary">
                                                <i className="fa fa-share fa-lg" aria-hidden="true"/></div>
                                            <h3>Faster Payments</h3>
                                            <p className="text-3">We have developed our system to be quick. We won't
                                                keep you waiting for long</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                        <div className="featured-box">
                                            <div className="featured-box-icon text-primary">
                                                <i className="fa fa-dollar fa-lg" aria-hidden="true"/></div>
                                            <h3>Lower Fees</h3>
                                            <p className="text-3">We charge very reasonable service to our customer</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                        <div className="featured-box">
                                            <div className="featured-box-icon text-primary">
                                                <i className="fa fa-lock fa-lg" aria-hidden="true"/></div>
                                            <h3>100% Secure</h3>
                                            <p className="text-3">Our main goal is to make our customers feel safe about
                                                their transactions. We guarantee 100% security</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div id={"how-it-works"} className="how-it-works section">
                        <div className="container">
                            <div className="container">
                                <h2 className="text-9 text-center text-uppercase font-weight-400">How does it work?</h2>
                                <p className="text-4 text-center font-weight-300 mb-70">Hamro remit is very fast, simple and safe. Here are the
                                    few steps you need to follow to make your transaction.</p>
                                <div className="row">
                                    <div className="col-sm-4 mb-4">
                                        <div className="featured-box style-4">
                                            <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                                className="w-100 text-20 font-weight-500">1</span></div>
                                            <h3 className="mb-3">Create an account</h3>
                                            <p className="text-3 font-weight-300">Sign up for your free
                                                personal account just in a minute.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4">
                                        <div className="featured-box style-4">
                                            <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                                className="w-100 text-20 font-weight-500">2</span></div>
                                            <h3 className="mb-3">Select the amount</h3>
                                            <p className="text-3 font-weight-300">Select the required amount. You will get our transfer rates and service charge instantly.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4 mb-sm-0">
                                        <div className="featured-box style-4">
                                            <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                                className="w-100 text-20 font-weight-500">3</span></div>
                                            <h3 className="mb-3">Pick your transfer method</h3>
                                            <p className="text-3 font-weight-300">You can pay via Bank or Local Remit.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4 mb-sm-0">
                                        <div className="featured-box style-4">
                                            <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                                className="w-100 text-20 font-weight-500">4</span></div>
                                            <h3 className="mb-3">Select recipient</h3>
                                            <p className="text-3 font-weight-300">Pick existing recipient or create new
                                                one</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4 mb-sm-0">
                                        <div className="featured-box style-4">
                                            <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                                className="w-100 text-20 font-weight-500">5</span></div>
                                            <h3 className="mb-3">Verify document and source</h3>
                                            <p className="text-3 font-weight-300">Upload your identity document and mention source of fund</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4 mb-sm-0">
                                        <div className="featured-box style-4">
                                            <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                                className="w-100 text-20 font-weight-500">6</span></div>
                                            <h3 className="mb-3">Confirm and send</h3>
                                            <p className="text-3 font-weight-300">Confirm your transaction with the help of detailed summary</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <a href="#" onClick={() => this.signUp()} className="btn btn-outline-primary shadow-none mt-2">
                                    Open a Free Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                <NotificationContainer/>
            </ErrorBoundary>
        )
    }
}

export default connect(null)(Index);