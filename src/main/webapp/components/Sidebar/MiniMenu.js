import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import CustomIcon from '../../components/CustomIcon/index';
import classNames from 'classnames';

class MiniMenu extends Component {

    state = {
        userDropdownMenu: false
    };

    toggleUserDropdownMenu() {
        this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
    }

    getSendUrl(isDefault,user){
        let sendUrl = "/send";
        if(user)
            sendUrl = "/app/transaction";
        return sendUrl;
    }

    pageActive(){
        const _path = location.pathname;
        let menuActive = 0;
        if(_path.includes("send") || _path.includes("transaction")) menuActive = 1;
        if(_path.includes("how-it-works")) menuActive = 2;
        if(_path.includes("about-us")) menuActive = 3;
        if(_path.includes("dashboard")) menuActive = 4;
        if(_path.includes("home")) menuActive = 5;
        return menuActive;
    }

    render() {
        const {isDefault, user, propClassName} = this.props;
        let sendUrl = this.getSendUrl(isDefault,user);
        let pageNo = this.pageActive();

        return (
            <Dropdown
            isOpen={this.state.userDropdownMenu}
            toggle={() => this.toggleUserDropdownMenu()}
            className="list-inline-item d-flex"
            >
                <DropdownToggle
                tag="div"
                className={classNames("d-flex align-items-center",propClassName)}
                >
                    <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
                </DropdownToggle>
                <DropdownMenu className="header-nav">
                    <ul className="list-unstyled mb-0">
                        <li className={"p-1 border-bottom rounded-top"}>
                            <Link to={sendUrl} className={classNames("dropdown-item",pageNo==1?"active":"")}><span className={"header-menu"}>SEND</span></Link>
                        </li>
                        <li className="p-1 border-top">
                            <Link to={"/how-it-works"} className={classNames("dropdown-item",pageNo==2?"active":"")}><span className={"header-menu"}>HOW IT WORKS</span></Link>
                        </li>
                        <li className="p-1 border-top">
                            <Link to={"/about-us"} className={classNames("dropdown-item",pageNo==3?"active":"")}><span className={"header-menu"}>ABOUT US</span></Link>
                        </li>
                        {user &&
                            <li className="p-1 border-top">
                                <Link to={"/app/dashboard"} className={classNames("dropdown-item",pageNo==4?"active":"")}><span className={"header-menu"}>DASHBOARD</span></Link>
                            </li>
                        }
                        <li className="p-1 border-top">
                            <Link to={"/home"} className={classNames("dropdown-item",pageNo==5?"active":"")}><span className={"header-menu"}>HOME</span></Link>
                        </li>
                    </ul>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default connect(null)(MiniMenu);
