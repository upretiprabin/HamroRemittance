/**
 * Horizontal Menu
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import AppConfig from 'Constants/AppConfig';
import UserBlock from '../Sidebar/UserBlock';

class HorizontalMenu extends Component {

    getHomeUrl(){
        let homeUrl = "/home";
        let pathName = location.pathname;
        if(pathName.includes("dashboard"))
            homeUrl = "/app/dashboard";
        return homeUrl;
    }

    getIndexPageNameAndUrl(){
        let pathName = location.pathname;
        let indexPageUrl = pathName.includes("home")?"/app/dashboard":"/home";
        let indexPage = pathName.includes("home")?"DASHBOARD":"HOME";
        return {indexPage,indexPageUrl}
    }

    render() {
        const {user} = this.props;
        let homeUrl = this.getHomeUrl();
        let {indexPage,indexPageUrl} = this.getIndexPageNameAndUrl();
        return (
            <div className="horizontal-menu">
                <div className="container">
                    <div className = "rct-header d-flex">
                        <div className="site-logo mr-15">
                            <a href={homeUrl} className="logo-normal">
                                <img src={AppConfig.appLogo} className="" alt="site-logo" width="100" height="55" />
                            </a>
                        </div>
                        <div className={"mt-15 menus"}>
                            <ul className="list-inline footer-menus mb-0">
                                <li className="list-inline-item">
                                    <Link to={"/send"}><span className={"header-menu"}>SEND</span></Link>
                                </li>
                                <li className="list-inline-item">
                                    <a href={"/home#how-it-works"} ><span className={"header-menu"}>HOW IT WORKS</span></a>
                                </li>
                                {!user &&
                                    <li className="list-inline-item">
                                        <Link to={"/signin"}><span className={"header-menu"}>LOG IN</span></Link>
                                    </li>
                                }
                                {!user &&
                                    <li className="list-inline-item sign-up">
                                        <Link to={"/signup"} className={"btn btn-primary"}><span className={"header-menu"}>SIGN UP</span></Link>
                                    </li>
                                }
                                {user &&
                                    <li className="list-inline-item sign-up">
                                        <Link to={indexPageUrl} className={"btn btn-primary"}><span className={"header-menu"}>{indexPage}</span></Link>
                                    </li>
                                }
                                {user &&
                                    <li className="list-inline-item">
                                        <UserBlock/>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        );
    }
}
// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user}
};
export default connect(mapStateToProps)(HorizontalMenu);
