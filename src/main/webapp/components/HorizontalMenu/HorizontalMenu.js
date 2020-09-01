/**
 * Horizontal Menu
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import AppConfig from 'Constants/AppConfig';
import UserBlock from '../Sidebar/UserBlock';
import MiniMenu from '../Sidebar/MiniMenu';

class HorizontalMenu extends Component {

    getHomeUrl(isDefault){
        let homeUrl = "/home";
        if(!isDefault && !this.isHome())
            homeUrl = "/app/dashboard";
        return homeUrl;
    }

    getSendUrl(isDefault,user){
        let sendUrl = "/send";
        if(user)
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

    isDashboard(){
        return location.pathname.includes("dashboard");
    }

    isDescriptionPage(){
        return location.pathname.includes("about-us") || location.pathname.includes("how-it-works");
    }

    render() {
        const {user,isDefault,history} = this.props;
        let homeUrl = this.getHomeUrl(isDefault);
        let sendUrl = this.getSendUrl(isDefault,user);
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
                        <MiniMenu isDefault={isDefault} user={user} propClassName="hideHamBtn"/>
                        <div className={"mt-15 menus"}>
                            <ul className="list-inline footer-menus mb-0">
                                {!this.isHome() && !isDefault &&
                                    <li className="list-inline-item">
                                        <Link to={"/app/dashboard"} ><span className={"header-menu"}>DASHBOARD</span></Link>
                                    </li>
                                }
                                <li className="list-inline-item">
                                    <Link to={sendUrl}><span className={"header-menu"}>SEND</span></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to={"/how-it-works"} ><span className={"header-menu"}>HOW IT WORKS</span></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to={"/about-us"}><span className={"header-menu"}>ABOUT US</span></Link>
                                </li>
                                {!user &&
                                    <li className="list-inline-item">
                                        <Link to={"/signin"}><span className={"header-menu"}>LOG IN</span></Link>
                                    </li>
                                }
                                {!user &&
                                    <li className="list-inline-item sign-up">
                                        <Link to={"/signup"} className={"btn btn-primary header-menu-btn"}><span className={"header-menu"}>SIGN UP</span></Link>
                                    </li>
                                }
                                {user && this.isDescriptionPage() && !this.isDashboard() &&
                                    <li className="list-inline-item">
                                        <Link to={"/app/dashboard"}><span className={"header-menu"}>DASHBOARD</span></Link>
                                    </li>
                                }
                                {user && !isDefault &&
                                    <li className="list-inline-item sign-up">
                                        <Link to={indexPageUrl} className={"btn btn-primary header-menu-btn"}><span className={"header-menu"}>{indexPage}</span></Link>
                                    </li>
                                }
                                {user &&
                                    <li className="list-inline-item hideUser">
                                        <UserBlock history={history}/>
                                    </li>
                                }
                            </ul>
                        </div>
                        <div className="hideLogin">
                            {!user &&
                                <div className="list-inline-item"><Link to={"/signin"}><span>LOG IN</span></Link></div>
                            }
                            {user &&
                                <div className="list-inline-item">
                                    <UserBlock/>
                                </div>
                            }
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
