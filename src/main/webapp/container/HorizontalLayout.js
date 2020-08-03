/**
 * Horizontal App
 */
import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

// horizontal layout
import RctHorizontalLayout from 'Components/RctHorizontalLayout';

// router service
import routerService from "../services/_routerService";

class RctHorizontalApp extends Component {
	render() {
        const { match, location } = this.props;
        console.log("match",match.url)
		return (
			<RctHorizontalLayout>
				{routerService && routerService.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctHorizontalLayout>
		);
	}
}

export default withRouter(RctHorizontalApp);
