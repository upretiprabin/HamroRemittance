/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

class DefaultLayout extends Component {
	render() {
        const { match, location } = this.props;
        if (location.pathname === '/admin') {
            return (<Redirect to={'/admin/dashboard'} />);
        }
        console.log("ss",`${match.url}/`)
		return (
			<RctAppLayout>
				{routerService.adminRoutes && routerService.adminRoutes.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctAppLayout>
		);
	}
}
const mapStateToProps = ({ authUser }) => {
    const { loading } = authUser;
    return { loading }
};

export default withRouter(connect(mapStateToProps)(DefaultLayout));
