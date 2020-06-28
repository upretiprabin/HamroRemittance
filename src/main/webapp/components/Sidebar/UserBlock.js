/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { logoutUser } from 'Actions';
import IntlMessages from 'Util/IntlMessages';
import {userFromLocalStorage} from "../../sagas/AuthenticationManager";

class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false
	};

	/**
	 * Logout User
	 */
	logoutUser() {
		this.props.logoutUser();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	getUserDetails(){
	    let user = userFromLocalStorage();
	    let firstLetter = user?.firstName?.toString()?.charAt(0)?.toUpperCase();
	    let shortName = user?.firstName?.toString() + " " + user?.lastName?.toString()?.charAt(0).toUpperCase()+".";
	    let fullName = user?.fullName;
	    let email = user.primaryEmail;
	    return {firstLetter,shortName,fullName,email}
    }

	render() {
	    let user = this.getUserDetails();
        return (
            <Dropdown
                isOpen={this.state.userDropdownMenu}
                toggle={() => this.toggleUserDropdownMenu()}
                className="list-inline-item user-block-custom"
            >
                <DropdownToggle
                    tag="div"
                    className="d-flex align-items-center"
                >
                    <div className="user-info">
                    <span className="user-profile">
                        <span className={"user-profile-box"}><span style={{display:"inline-block"}}>{user.firstLetter}</span></span>
                    </span>
                    <span >
                        <span className="user-name ml-2">{user.shortName}</span>
                    </span>
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    <ul className="list-unstyled mb-0">
                        <li className="p-15 border-bottom user-profile-top rounded-top">
                            <p className="text-white mb-0 fs-14">{user.fullName}</p>
                            <span className="text-white fs-14">{user.email}</span>
                        </li>
                        <li className="border-top">
                            <a href="#" onClick={(e) => this.logoutUser(e)}>
                                <i className="zmdi zmdi-power text-danger mr-3"></i>
                                <span><IntlMessages id="widgets.logOut" /></span>
                            </a>
                        </li>
                    </ul>
                </DropdownMenu>
            </Dropdown>
        );
	}
}

const mapStateToProps = ({ settings }) => {
	return settings;
};

export default connect(mapStateToProps, {
    logoutUser
})(UserBlock);
