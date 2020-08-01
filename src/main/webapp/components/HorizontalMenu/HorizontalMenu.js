/**
 * Horizontal Menu
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AppConfig from 'Constants/AppConfig';

class HorizontalMenu extends Component {
    render() {
        return (
            <div className="horizontal-menu">
                <div className="container">
                    <div className = "rct-header d-flex">
                        <div className="site-logo mr-15">
                            <a href="/" className="logo-normal">
                                <img src={AppConfig.appLogo} className="" alt="site-logo" width="100" height="55" />
                            </a>
                        </div>
                        <div className={"mt-15 menus"}>
                            <ul className="list-inline footer-menus mb-0">
                                <li className="list-inline-item">
                                    <Link to={"/send"}><span className={"header-menu"}>SEND</span></Link>
                                </li>
                                <li className="list-inline-item">
                                    <a href={"#how-it-works"} ><span className={"header-menu"}>HOW IT WORKS</span></a>
                                </li>
                                <li className="list-inline-item">
                                    <Link to={"/signin"}><span className={"header-menu"}>LOG IN</span></Link>
                                </li>
                                <li className="list-inline-item sign-up">
                                    <Link to={"/signup"} className={"btn btn-primary"}><span className={"header-menu"}>SIGN UP</span></Link>
                                </li>
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

export default HorizontalMenu;
