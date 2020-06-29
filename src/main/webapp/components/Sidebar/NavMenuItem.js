/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class NavMenuItem extends Component {

    state = {
        subMenuOpen: ''
    };

    /**
     * On Toggle Collapse Menu
     */
    onToggleCollapseMenu(index) {
        if (this.state.subMenuOpen === '') {
            this.setState({
                subMenuOpen: index
            })
        }
        else if (this.state.subMenuOpen !== index) {
            this.setState({
                subMenuOpen: index
            })
        }
        else {
            this.setState({ subMenuOpen: '' });
        }
    }

    render() {
        const { menu } = this.props;
        const menuIcons = {
            'dashboard' : 'fa-dashboard',
            'settings' : 'fa-cog'
        };
        return (
            <ListItem button component="li">
                <NavLink activeClassName="item-active" to={menu.path}>
                    <ListItemIcon className="menu-icon menu-icon-custom">
                        <i className={`fa ${menuIcons[menu.menu_icon]}`} aria-hidden="true"/>
                    </ListItemIcon>
                    <span className="menu menu-custom">
                  <IntlMessages id={menu.menu_title} />
               </span>
                </NavLink>
            </ListItem>
        );
    }
}

export default NavMenuItem;
