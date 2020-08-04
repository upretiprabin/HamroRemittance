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
        if(!this.isHome())
            homeUrl = "/app/dashboard";
        return homeUrl;
    }

    getSendUrl(){
        let sendUrl = "/send";
        if(!this.isHome())
            sendUrl = "/app/transaction";
        return sendUrl;
    }

    getIndexPageNameAndUrl(){
        let isHome = this.isHome();
        let indexPageUrl = isHome?"/app/dashboard":"/home";
        let indexPage = isHome?"DASHBOARD":"HOME";
        return {indexPage,indexPageUrl}
    }

    isHome(){
        return location.pathname.includes("home");
    }

    render() {
        const {user} = this.props;
        let homeUrl = this.getHomeUrl();
        let sendUrl = this.getSendUrl();
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
                                    <Link to={sendUrl}><span className={"header-menu"}>SEND</span></Link>
                                </li>
                                <li className="list-inline-item">
                                    {this.isHome() &&
                                        <a href={"/home#how-it-works"} ><span className={"header-menu"}>HOW IT WORKS</span></a>
                                    }
                                    {!this.isHome() &&
                                        <Link to={"/app/how-it-works"} ><span className={"header-menu"}>HOW IT WORKS</span></Link>
                                    }
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
