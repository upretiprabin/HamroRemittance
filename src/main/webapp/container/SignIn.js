import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import AppConfig from 'Constants/AppConfig';
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
               <div className="app-horizontal rct-session-wrapper">
                   {loading &&
                   <LinearProgress />
                   }
                   <div className="container-fluid px-0 h-100">
                        <div className="row no-gutters h-100">
                            <div className="col-md-6">
                                <div className="hero-wrap d-flex align-items-center h-100">
                                    <div className="hero-mask opacity-8"/>
                                    <div className="hero-bg hero-bg-scroll"/>
                                    <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
                                        <div className="row no-gutters">
                                            <div className="col-10 col-lg-9 mx-auto">
                                                <div className="logo mt-40 mb-5 mb-md-0">
                                                    <a className="d-flex"
                                                       href="/"
                                                       title="Hamro Remit">
                                                        <img src={AppConfig.appLogo} alt="Hamro Remit" height={50} width={100}/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters my-auto">
                                            <div className="col-10 col-lg-9 mx-auto">
                                                <h1 className="text-11 text-white mb-4">Welcome back!</h1>
                                                <p className="text-4 text-white line-height-4 mb-5">We are glad to see
                                                    you again! </p>
                                                <p className="text-4 text-white line-height-4 mb-5">Instant money transfer from Australia to Nepal.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="container my-4">
                                    <div className="row">
                                        <div className="col-11 col-lg-9 col-xl-8 mx-auto">
                                            <h3 className="ml-5 mb-4">Log In</h3>
                                            <form id="loginForm" method="post">
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        type="mail"
                                                        value={email}
                                                        name="user-mail"
                                                        id="user-mail"
                                                        className="has-input input-lg"
                                                        placeholder="Email Address"
                                                        onChange={(event) => this.setState({ email: event.target.value })}
                                                    />
                                                    <span className="has-icon"><i className="ti-email"/></span>
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
                                                    <span className="has-icon"><i className="ti-lock"/></span>
                                                </FormGroup>
                                                <FormGroup className="mb-15">
                                                    <Button
                                                        color="primary"
                                                        className="btn-block btn-primary text-white w-100"
                                                        variant="contained"
                                                        size="large"
                                                        onClick={() => this.onUserLogin()}
                                                    >
                                                        Log In
                                                    </Button>
                                                </FormGroup>
                                            </form>
                                            <div className="row">
                                                <div className="col-sm text-left mb-4 ml-5">
                                                    <a className="btn-link" href="#">Forgotten Password ?</a>
                                                </div>
                                            </div>
                                            <p className="text-3 text-center text-muted">
                                                Don't have an account?
                                                <a href={"#"} className="ml-5 btn-link" onClick={() => this.onUserSignUp()}>Sign Up</a>
                                            </p>
                                        </div>
                                    </div>
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
