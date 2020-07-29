/**
* Main App
*/
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import './lib/reactifyCss';
import App from './container/App';
import store from './store';
import ForgotPassword from "./container/ForgotPassword";
import AppSignIn from "./container/SignIn";
import Signup from "./container/SignUp";
import Verify from "./container/Verify";
import Register from "./container/Register";
import { NotificationContainer } from 'react-notifications';

const MainApp = () => (
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Router>
				<Switch>
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route path="/signin" component={AppSignIn} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/verify" component={Verify} />
                    <Route path="/register" component={Register} />
					<Route path="/" component={App} />
				</Switch>
			</Router>
			<NotificationContainer/>
		</MuiPickersUtilsProvider>
	</Provider>
);

export default MainApp;
