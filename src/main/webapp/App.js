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

const MainApp = () => (
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Router>
				<Switch>
                    <Route exact path="/forgot-password" component={ForgotPassword} />
					<Route path="/" component={App} />
				</Switch>
			</Router>
		</MuiPickersUtilsProvider>
	</Provider>
);

export default MainApp;
