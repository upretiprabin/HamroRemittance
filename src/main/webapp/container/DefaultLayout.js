/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

class DefaultLayout extends Component {
	render() {
		const { match,loading } = this.props;
		if(loading){
			return(
                <div className="page-loader d-flex justify-content-center mb-30">
                    <CircularProgress />
                </div>
			)
		}
		return (
			<RctAppLayout>
				{routerService && routerService.map((route,key)=>
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
