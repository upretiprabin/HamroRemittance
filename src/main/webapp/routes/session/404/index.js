import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import AppConfig from 'Constants/AppConfig';

export default class NotFound extends Component {
   render() {
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="error-wrapper" key="1">
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="app-horizontal container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                              </Link>
                           </div>
                           <div className="session-social-icon">
                              <IconButton className="text-white" aria-label="facebook">
                                  <a href={"http://www.facebook.com/hamro.remit.96"}><i className="zmdi zmdi-facebook"/></a>
                              </IconButton>
                              <IconButton className="text-white" aria-label="twitter">
                                  <a href={"http://www.twitter.com/"}><i className="zmdi zmdi-twitter"/></a>
                              </IconButton>
                              <IconButton className="text-white" aria-label="google">
                                  <a href={"http://www.google.com/"}><i className="zmdi zmdi-google"/></a>
                              </IconButton>
                           </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="row">
                     <div className="col-sm-12 col-md-12 col-lg-9 mx-auto">
                        <div className="error-body text-center">
                           <h2 className="oops">Oops.. </h2>
                           <h2 className="bold mb-0">404</h2>
                           <h2 className="error-msg mb-30">Sorry, page not found</h2>
                           <Button component={Link} to="/" variant="contained" className="btn-light btn-lg">Go To Home Page</Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}
