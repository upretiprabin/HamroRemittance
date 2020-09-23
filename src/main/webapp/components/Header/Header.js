/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';

// actions
import { collapsedSidebarAction } from 'Actions';

// helpers
import { getAppLayout } from "Helpers/helpers";

// components
import Notifications from './Notifications';
import ChatSidebar from './ChatSidebar';
import DashboardOverlay from '../DashboardOverlay/DashboardOverlay';
import SearchForm from './SearchForm';
import QuickLinks from './QuickLinks';
import MobileSearchForm from './MobileSearchForm';

import AppConfig from 'Constants/AppConfig';
import UserBlock from "../Sidebar/UserBlock";
import {Scrollbars} from "react-custom-scrollbars";

class Header extends Component {

	state = {
		customizer: false,
		isMobileSearchFormVisible: false
	}

	// function to change the state of collapsed sidebar
	onToggleNavCollapsed = (event) => {
		const val = !this.props.navCollapsed;
		this.props.collapsedSidebarAction(val);
	}

	// open dashboard overlay
	openDashboardOverlay(e) {
		var el = document.getElementsByClassName('dashboard-overlay')[0];
		el.classList.toggle("d-none");
		el.classList.toggle("show");
		if (el.classList.contains('show')) {
			document.body.style.overflow = "hidden";
		}
		else {
			document.body.style.overflow = "";
		}
		e.preventDefault();
	}

	// close dashboard overlay
	closeDashboardOverlay() {
		var e = document.getElementsByClassName('dashboard-overlay')[0];
		e.classList.remove('show');
		e.classList.add('d-none');
		document.body.style.overflow = "";
	}

	// toggle screen full
	toggleScreenFull() {
		screenfull.toggle();
	}

	// mobile search form
	openMobileSearchForm() {
		this.setState({ isMobileSearchFormVisible: true });
	}

	render() {
		const { isMobileSearchFormVisible } = this.state;
		return (
			<AppBar position="static" className="rct-header">
				<Toolbar className="d-flex justify-content-between w-100 pl-0">
					<div className="d-flex align-items-center">
							<ul className="list-inline mb-0 navbar-left">
                                <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
                                    <Tooltip title="Sidebar Toggle" placement="bottom">
                                        <IconButton color="inherit" mini="true" aria-label="Menu" className="humburger p-0">
                                            <MenuIcon />
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <QuickLinks />
								<li className="list-inline-item search-icon d-inline-block">
									<SearchForm />
									<IconButton mini="true" className="search-icon-btn" onClick={() => this.openMobileSearchForm()}>
										<i className="zmdi zmdi-search"/>
									</IconButton>
									<MobileSearchForm
										isOpen={isMobileSearchFormVisible}
										onClose={() => this.setState({ isMobileSearchFormVisible: false })}
									/>
								</li>
							</ul>
					</div>
					<ul className="navbar-right list-inline mb-0">
						<li className="list-inline-item summary-icon">
							<Tooltip title="Summary" placement="bottom">
								<a href="#" className="header-icon tour-step-3" onClick={(e) => this.openDashboardOverlay(e)}>
									<i className="zmdi zmdi-info-outline"/>
								</a>
							</Tooltip>
						</li>
						<li className="d-flex">
                            <UserBlock />
                        </li>
					</ul>
				</Toolbar>
				<DashboardOverlay
					onClose={() => this.closeDashboardOverlay()}
				/>
			</AppBar>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction
})(Header));
