import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import AppConfig from 'Constants/AppConfig';
import {
    signIn
} from 'Actions';
import {validateEmail} from 'Helpers/helpers'
import { NotificationContainer } from 'react-notifications';

class SignIn extends Component {

   state = {
      email: '',
      password: '',
      invalidEmail:false
   };

	/**
	 * On User Login
	 */
   onUserLogin() {
      if (this.state.email !== '' && !this.state.invalidEmail && this.state.password !== '') {
          this.props.signIn(this.state, this.props.history);
      }
   }

   onKeyPress(event){
       if(event.key === "Enter"){
           this.onUserLogin();
       }
   }

    handleEmail(event){
        return new Promise((res,rej)=>{
            this.setState({ email: event.target.value });
            res();
        }).then(()=>this.emailValidator())
    }

    handlePassword(event){
        return new Promise((res,rej)=>{
            this.setState({ password: event.target.value });
            res();
        })
    }

    emailValidator(){
        let validate = validateEmail(this.state.email);
        validate ? this.setState({invalidEmail:false}) : this.setState({invalidEmail:true});
    };

    /**
     * On User Sign Up
     */
    onUserSignUp() {
        this.props.history.push('/signup');
    }

   render() {
       const { email, password } = this.state;
       const { loading,user } = this.props;
       return (
           <QueueAnim type="bottom" duration={2000}>
               <NotificationContainer/>
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
                                                        <img src={AppConfig.appLogo} alt="Hamro Remit" height={55} width={100}/>
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
                                            <Form>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        type="mail"
                                                        value={email}
                                                        name="user-mail"
                                                        id="user-mail"
                                                        className="has-input input-lg"
                                                        placeholder="Email Address"
                                                        onKeyPress={(event)=>{this.onKeyPress(event)}}
                                                        onChange={(event) => this.handleEmail(event)}
                                                    />
                                                    <span className="has-icon"><i className="ti-email"/></span>
                                                    <span className={this.state.invalidEmail?"cred-error-label":"d-none"}>Email must be a valid format</span>
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        value={password}
                                                        type="Password"
                                                        name="user-pwd"
                                                        id="pwd"
                                                        className="has-input input-lg"
                                                        placeholder="Password"
                                                        onKeyPress={(event)=>{this.onKeyPress(event)}}
                                                        onChange={(event) => this.handlePassword(event)}
                                                    />
                                                    <span title={"Show"} className="has-icon"><i className="ti-eye"/></span>
                                                </FormGroup>
                                                <FormGroup className="mb-15">
                                                    <Button
                                                        color="primary"
                                                        className="btn-block btn-primary text-white w-100"
                                                        variant="contained"
                                                        size="large"
                                                        onClick={() => this.onUserLogin()}
                                                    >
                                                        <span className={"p-5"}>Log In</span>
                                                    </Button>
                                                </FormGroup>
                                            </Form>
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
