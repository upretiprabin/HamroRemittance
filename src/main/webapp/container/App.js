/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';
//Main App
import RctDefaultLayout from './DefaultLayout';
import HorizontalLayout from './HorizontalLayout';
import AppConfig from "Constants/AppConfig";
import {AsyncSessionPage404Component} from "../components/AsyncComponent/AsyncComponent";
import ForgotPassword from "./ForgotPassword";
import AppSignIn from "./SignIn";
import Signup from "./SignUp";
import Verify from "./Verify";
import Register from "./Register";

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />}
    />;

class App extends Component {

    _isMounted = false;

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        const { location, match, user } = this.props;
        if (location.pathname === '/' || location.pathname === '/app') {
            return (<Redirect to={'/app/'+AppConfig.homePage} />);
        }
        return (
            <RctThemeProvider>
                <NotificationContainer />
                <Router>
                    <Switch>
                        <InitialPath
                            path={`${match.url}app`}
                            authUser={user}
                            component={HorizontalLayout}
                        />
                        <Route path="/admin" component={RctDefaultLayout} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Route path="/signin" component={AppSignIn} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/verify" component={Verify} />
                        <Route path="/register" component={Register} />
                        <Route component={AsyncSessionPage404Component} />
                    </Switch>
                </Router>
            </RctThemeProvider>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user };
};

export default connect(mapStateToProps)(App);
