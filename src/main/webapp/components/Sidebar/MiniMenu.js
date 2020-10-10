import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";
import {IconButton, Divider, Drawer, ListItem, ListItemText} from '@material-ui/core';

class MiniMenu extends Component {

    state = {
        top: false
    };

    toggleDrawer = (open) => () => {
        this.setState({
            top: open
        });
    };

    render() {
        const {isDefault, user, propClassName} = this.props;

        return (
           <div>
                <IconButton color="primary" aria-label="Menu Toggle" className={propClassName} onClick={this.toggleDrawer(true)}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </IconButton>
                <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer(false)}>
                  <div tabIndex={0} role="button"
                     onClick={this.toggleDrawer(false)}
                     onKeyDown={this.toggleDrawer(false)}>
                        <ListItem button component={NavLink} to={{pathname: "/home"}} activeClassName="Mui-selected" exact>
                          <ListItemText primary="HOME" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={NavLink} to={{pathname: "/how-it-works"}} activeClassName="Mui-selected" exact>
                          <ListItemText primary="HOW IT WORKS" />
                        </ListItem>
                        <Divider />
                        {user &&
                            <ListItem button component={NavLink} to={{pathname: "/app/transaction"}} activeClassName="Mui-selected" exact>
                              <ListItemText primary="SEND" />
                            </ListItem>
                        }
                        {!user &&
                            <ListItem button component={NavLink} to={{pathname: "/send"}} activeClassName="Mui-selected" exact>
                              <ListItemText primary="SEND" />
                            </ListItem>
                        }
                        <Divider />
                        <ListItem button component={NavLink} to={{pathname: "/about-us"}} activeClassName="Mui-selected" exact>
                          <ListItemText primary="ABOUT US" />
                        </ListItem>
                        {user && <Divider />}
                        {user &&
                            <ListItem button component={NavLink} to={{pathname: "/app/dashboard"}} activeClassName="Mui-selected" exact>
                              <ListItemText primary="DASHBOARD" />
                            </ListItem>
                        }
                  </div>
                </Drawer>
            </div>
        );
    }
}

export default connect(null)(MiniMenu);
