/**
 * Dashboard
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorBoundary from "Components/ErrorBoundary/index";
import Controller from "../../controllers/dashboardController"
import {NotificationContainer} from "react-notifications";
import { connect } from 'react-redux';

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
                        <p>This is a dashboard</p>
                    </div>
                    }
                    <NotificationContainer/>
                </ErrorBoundary>
            </div>
        )
    }
}

export default connect(null)(Index);