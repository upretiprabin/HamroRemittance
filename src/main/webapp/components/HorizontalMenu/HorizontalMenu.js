/**
 * Horizontal Menu
 */
import React, { Component } from 'react';

import IntlMessages from 'Util/IntlMessages';

import navLinks from './NavLinks';

import NavMenuItem from './NavMenuItem';
import {Link} from "react-router-dom";
import AppConfig from 'Constants/AppConfig';

class HorizontalMenu extends Component {
    render() {
        return (
            <div className="horizontal-menu">
                <div className="container">
                    <div className = "rct-header d-flex">
                        <div className="site-logo">
                            <Link to="/" className="logo-normal">
                                <img src={AppConfig.appLogo} className="" alt="site-logo" width="95" height="45" />
                            </Link>
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
