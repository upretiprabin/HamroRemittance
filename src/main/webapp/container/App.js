/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';
//Main App
import RctDefaultLayout from './DefaultLayout';
// app signin
import AppSignIn from './SignIn';
import log from '../services/loggerService';
import AppConfig from "Constants/AppConfig";
import Signup from "./Signup";

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
        if (location.pathname === '/') {
            if (user === null) {
                return (<Redirect to={'/signin'} />);
            } else {
                return (<Redirect to={'/app/'+AppConfig.homePage} />);
            }
        }
        return (
            <RctThemeProvider>
                <NotificationContainer />
                <InitialPath
                    path={`${match.url}app`}
                    authUser={user}
                    component={RctDefaultLayout}
                />
                <Route path="/signin" component={AppSignIn} />
                <Route path="/signup" component={Signup} />
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
