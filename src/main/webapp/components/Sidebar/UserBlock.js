/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser,switchView } from 'Actions';
import IntlMessages from 'Util/IntlMessages';
import {isUserAdmin,userProfileFromLocalStorage} from "../../sagas/AuthenticationManager";
import {Link} from "react-router-dom";

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

    switchView(){
        let switchView = "customer";
        if(this.props.view === "customer")
            switchView = "admin";
        this.toggleUserDropdownMenu();
        this.props.switchView(switchView);
    }

    goToUserProfile(){
        if(this.props.view === "customer")
            this.props.history?.push("/app/user-profile");
        else
            this.props.history?.push("/admin/user-profile");
    }


    render() {
        let userProfile = userProfileFromLocalStorage();
        let view = this.props.view;
        let isAdmin = isUserAdmin();
        let switchViewText = "Admin Panel";
        if (view === "admin"){
            switchViewText = "Customer Portal";
        }
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
							<span className={"user-profile-box"}>
								<i className="fa fa-user"/>
							</span>
						</span>
                    </div>
                </DropdownToggle>
                <DropdownMenu right>
                    <ul className="list-unstyled mb-0">
                        {userProfile &&
                            <li className="p-15 border-bottom user-profile-top rounded-top">
                                <a href={"#"} onClick={()=>{this.goToUserProfile()}}>
                                    <p className="text-white mb-0 fs-14">{userProfile?.firstName?userProfile.firstName:""} {userProfile?.middleName?userProfile.middleName:""} {userProfile?.lastName?userProfile.lastName:""}</p>
                                    <span className="text-white fs-14">{userProfile?.emailAddress?userProfile.emailAddress:""}</span>
                                </a>
                            </li>
                        }
                        {isAdmin &&
                        <li className="border-top">
                            <a href="#" onClick={() => this.switchView()}>
                                <i className="user-menu-drpdwn fa fa-exchange mr-3"/>
                                <span>{switchViewText}</span>
                            </a>
                        </li>
                        }
                        <li className="border-top">
                            <a href="#" onClick={(e) => this.logoutUser(e)}>
                                <i className="user-menu-drpdwn zmdi zmdi-power text-danger mr-3"/>
                                <span><IntlMessages id="widgets.logOut" /></span>
                            </a>
                        </li>
                    </ul>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {view : authUser.view};
};

export default connect(mapStateToProps, {
    logoutUser,
    switchView
})(UserBlock);
