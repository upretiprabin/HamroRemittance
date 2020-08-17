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
import ResetPassword from "./ResetPassword";
import AppSignIn from "./SignIn";
import Signup from "./SignUp";
import InstantSend from "./InstantSend";
import Verify from "./Verify";
import Register from "./Register";
import HomeLayout from "../routes/home/HomeLayout";
import log from '../services/loggerService';
import {checkUserSession,logoutUser,userLoaded} from 'Actions';
import {authenticateUser} from '../sagas/AuthenticationManager';
import TermsAndConditions from "./TermsAndConditions";
import AboutUs from "./AboutUs";
import HowItWorksPage from "../routes/howItWorks";

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

    componentDidMount(){
        this._isMounted = true;
        const {user,checkSession} = this.props;
        if(user && checkSession){
            log.info("Checking user session !!!");
            this.checkUserSession();
        }
        this.props.checkUserSession(false);
    }

    checkUserSession(){
        authenticateUser()
            .then(()=>{
                this.props.userLoaded();
            })
            .catch(()=>{
                if(this._isMounted)
                    this.props.logoutUser("Expired")
            })
    }

    render() {
        const { location, match, user } = this.props;
        if (location.pathname === '/') {
            return (<Redirect to={'/'+AppConfig.homePage} />);
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
                        <Route path="/home" component={HomeLayout} />
                        <Route path="/admin" component={RctDefaultLayout} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Route path="/reset-password" component={ResetPassword} />
                        <Route path="/signin" component={AppSignIn} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/send" component={InstantSend} />
                        <Route path="/verify" component={Verify} />
                        <Route path="/register" component={Register} />
                        <Route path="/terms-and-conditions" component={TermsAndConditions} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path="/how-it-works" component={HowItWorksPage} />
                        <Route component={AsyncSessionPage404Component} />
                    </Switch>
                </Router>
            </RctThemeProvider>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user,checkSession } = authUser;
    return { user,checkSession };
};

export default connect(mapStateToProps,{checkUserSession,logoutUser,userLoaded})(App);
