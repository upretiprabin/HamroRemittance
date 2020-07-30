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
import { NotificationContainer } from 'react-notifications';

const MainApp = () => (
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Router>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>
			<NotificationContainer/>
		</MuiPickersUtilsProvider>
	</Provider>
);

export default MainApp;
