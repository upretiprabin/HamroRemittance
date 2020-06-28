/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import { collapsedSidebarAction } from 'Actions';
import UserBlock from '../Sidebar/UserBlock';
class Header extends Component {

	state = {
	};

	onToggleNavCollapsed = (event) => {
		const val = !this.props.navCollapsed;
		this.props.collapsedSidebarAction(val);
	};

	render() {
		return (
            <AppBar position="static" className="rct-header rct-header-custom">
                <Toolbar className="d-flex justify-content-between w-100 pl-0 pd-custom">
                    <div className="d-flex align-items-center">
                        <ul className="list-inline mb-0 navbar-left">
                            <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
                                <Tooltip title="Sidebar Toggle" placement="bottom">
                                    <IconButton color="inherit" mini="true" aria-label="Menu" className="humburger p-0">
                                        <MenuIcon />
                                    </IconButton>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
					<ul className="list-inline header-list mr-40 mt-10">
                        <li className="list-inline-item">
							<UserBlock/>
                        </li>
					</ul>
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = ({ settings }) => {
	return settings;
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction
})(Header));
