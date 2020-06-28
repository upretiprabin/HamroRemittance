import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

// components
import SessionSlider from '../components/Widgets/SessionSlider';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
    signIn
} from 'Actions';

class SignIn extends Component {

   state = {
      email: '',
      password: ''
   };

	/**
	 * On User Login
	 */
   onUserLogin() {
      if (this.state.email !== '' && this.state.password !== '') {
         this.props.signIn(this.state, this.props.history);
      }
   }

   onKeyPress(event){
       if(event.key === "Enter"){
           this.onUserLogin();
       }
   }

    /**
     * On User Sign Up
     */
    onUserSignUp() {
        this.props.history.push('/signup');
    }

   render() {
       const { email, password } = this.state;
       const { loading } = this.props;
       return (
           <QueueAnim type="bottom" duration={2000}>
               <div className="rct-session-wrapper">
                   {loading &&
                   <LinearProgress />
                   }
                   <AppBar position="static" className="session-header">
                       <Toolbar>
                           <div className="container">
                               <div className="d-flex justify-content-between">
                                   <div className="session-logo">
                                       <Link to="/">
                                           <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                       </Link>
                                   </div>
                                   <div>
                                       <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                                       <Button variant="contained" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
                                   </div>
                               </div>
                           </div>
                       </Toolbar>
                   </AppBar>
                   <div className="session-inner-wrapper">
                       <div className="container">
                           <div className="row row-eq-height">
                               <div className="col-sm-7 col-md-7 col-lg-8">
                                   <div className="session-body text-center">
                                       <div className="session-head mb-30">
                                           <h2 className="font-weight-bold">{AppConfig.brandName}</h2>
                                       </div>
                                       <Form>
                                           <FormGroup className="has-wrapper">
                                               <Input
                                                   type="mail"
                                                   value={email}
                                                   name="user-mail"
                                                   id="user-mail"
                                                   className="has-input input-lg"
                                                   placeholder="Enter Email Address"
                                                   onChange={(event) => this.setState({ email: event.target.value })}
                                               />
                                               <span className="has-icon"><i className="ti-email"></i></span>
                                           </FormGroup>
                                           <FormGroup className="has-wrapper">
                                               <Input
                                                   value={password}
                                                   type="Password"
                                                   name="user-pwd"
                                                   id="pwd"
                                                   className="has-input input-lg"
                                                   placeholder="Password"
                                                   onChange={(event) => this.setState({ password: event.target.value })}
                                               />
                                               <span className="has-icon"><i className="ti-lock"></i></span>
                                           </FormGroup>
                                           <FormGroup className="mb-15">
                                               <Button
                                                   color="primary"
                                                   className="btn-block text-white w-100"
                                                   variant="contained"
                                                   size="large"
                                                   onClick={() => this.onUserLogin()}
                                               >
                                                   Sign In
                                               </Button>
                                           </FormGroup>

                                       </Form>
                                   </div>
                               </div>
                               <div className="col-sm-5 col-md-5 col-lg-4">
                                   <SessionSlider />
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </QueueAnim>
       );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { loading } = authUser;
   return { loading }
};

export default connect(mapStateToProps, {
    signIn
})(SignIn);
