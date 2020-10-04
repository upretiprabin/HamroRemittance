/**
 * Horizontal Menu
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, NavLink} from "react-router-dom";
import AppConfig from 'Constants/AppConfig';
import UserBlock from '../Sidebar/UserBlock';
import MiniMenu from '../Sidebar/MiniMenu';

class HorizontalMenu extends Component {

    render() {
        const {user,isDefault,history} = this.props;

        return (
            <div className="horizontal-menu">
                <div className="container">
                    <div className = "rct-header d-flex">
                        <div className="site-logo mr-15">
                            <a href={"/home"} className="logo-normal">
                                <img src={AppConfig.appLogo} className="" alt="site-logo" width="100" height="55" />
                            </a>
                        </div>
                        <MiniMenu isDefault={isDefault} user={user} propClassName="hideHamBtn"/>
                        <div className={"mt-15 menus"}>
                            <ul className="list-inline footer-menus mb-0">
                                <li className="list-inline-item">
                                    <NavLink to={{pathname: "/home"}} activeClassName="selected" exact className={"header-menu"}>HOME</NavLink>
                                </li>
                                <li className="list-inline-item">
                                    <NavLink to={{pathname: "/how-it-works"}} activeClassName="selected" exact className={"header-menu"}>HOW IT WORKS</NavLink>
                                </li>
                                <li className="list-inline-item">
                                    {!user && <NavLink to={{pathname:"/send"}} activeClassName="selected" exact className={"header-menu"}>SEND</NavLink>}
                                    {user && <NavLink to={{pathname:"/app/transaction"}} activeClassName="selected" exact className={"header-menu"}>SEND</NavLink>}
                                </li>
                                <li className="list-inline-item">
                                    <NavLink to={{pathname:"/about-us"}} activeClassName="selected" exact className={"header-menu"}>ABOUT US</NavLink>
                                </li>
                                {!user &&
                                    <li className="list-inline-item">
                                        <NavLink to={{pathname:"/signin"}} activeClassName="selected" exact className={"header-menu"}>LOG IN</NavLink>
                                    </li>
                                }
                                {!user &&
                                    <li className="list-inline-item sign-up">
                                        <Link to={"/signup"} className={"btn btn-primary header-menu-btn"}><span className={"header-menu"}>SIGN UP</span></Link>
                                    </li>
                                }
                                {user &&
                                    <li className="list-inline-item">
                                        <NavLink to={{pathname:"/app/dashboard"}} activeClassName="selected" exact className={"header-menu"}>DASHBOARD</NavLink>
                                    </li>
                                }
                                {user &&
                                    <li className="list-inline-item">
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
