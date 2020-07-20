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
import {
    Player, ControlBar,BigPlayButton
} from 'video-react';
import DownloadButton from '../../components/VideoDownloadButton/DownloadButton';

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
                <div className="choose mb-40">
                    <Card body>
                        <h2 className={"text-9 text-center mt-60"}>Why should you choose Hamro Remit?</h2>
                        <p className="text-4 text-center mb-5">Here’s Top 4 reasons why</p>
                        <div className="mt-30 container">
                            <div className="row">
                                <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                    <div className="featured-box">
                                        <div className="featured-box-icon text-primary">
                                            <i className="fa fa-hand-pointer-o fa-lg" aria-hidden="true"/>                                        </div>
                                        <h3>Easy to use</h3>
                                        <p className="text-3">We provide sophisticated UI which makes your transaction smooth and easy </p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                    <div className="featured-box">
                                        <div className="featured-box-icon text-primary">
                                            <i className="fa fa-share fa-lg" aria-hidden="true"/>                                        </div>
                                        <h3>Faster Payments</h3>
                                        <p className="text-3">We have developed our system to be quick. We won't keep you waiting for long</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                    <div className="featured-box">
                                        <div className="featured-box-icon text-primary">
                                            <i className="fa fa-dollar fa-lg" aria-hidden="true"/>                                        </div>
                                        <h3>Lower Fees</h3>
                                        <p className="text-3">We charge very reasonable service to our customer</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                    <div className="featured-box">
                                        <div className="featured-box-icon text-primary">
                                            <i className="fa fa-lock fa-lg" aria-hidden="true"/>                                        </div>
                                        <h3>100% Secure</h3>
                                        <p className="text-3">Our main goal is to make our customers feel safe about their transactions. We guarantee 100% security</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="how-it-works section">
                    <div className="container">
                        <div className="row">
                            <div className="video-player-wrapper col-lg-6">
                                    <Player
                                        poster="https://reactify.theironnetwork.org/data/images/bunny-poster.jpg"
                                        src="http://media.w3.org/2010/05/bunny/movie.mp4"
                                    >
                                        <ControlBar autoHide={false}>
                                            <DownloadButton order={7} />
                                            <BigPlayButton position="center" />
                                        </ControlBar>
                                    </Player>
                            </div>
                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <div className="ml-4">
                                    <h2 className="text-9">How does it work?</h2>
                                    <p className="text-4">Hamro remit is very fast, simple and safe. Here are the few steps you need to follow to make your transaction.</p>
                                    <ul className="list-unstyled text-3 line-height-5">
                                        <li><i className="fa fa-check mr-2"/>Create an account for free</li>
                                        <li><i className="fa fa-check mr-2"/>Select the amount.</li>
                                        <li><i className="fa fa-check mr-2"/>Pick your transfer method.</li>
                                        <li><i className="fa fa-check mr-2"/>Pick existing recipient or create new one</li>
                                        <li><i className="fa fa-check mr-2"/>Confirm and send</li>
                                    </ul>
                                    <a href="#" className="btn btn-outline-primary shadow-none mt-2">
                                        Open a Free Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(Index);