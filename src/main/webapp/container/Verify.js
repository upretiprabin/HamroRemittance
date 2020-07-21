import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {Form, FormGroup, Input } from 'reactstrap';
import AppConfig from 'Constants/AppConfig';
import {
    signIn
} from 'Actions';
import OtpInput from 'react-otp-input';

class Verify extends Component {

    state = {
        otp : ''
    };

    onKeyPress(event){
        if(event.key === "Enter"){
            this.onUserSignUp();
        }
    }

    /**
     * On User Sign Up
     */
    onUserSignUp() {
        this.props.history.push('/signup');
    }

    handleChange = otp => this.setState({ otp });

    render() {
        const email  = "upretiprabin7946@gmail.com";
        const {otp} = this.state;
        return (
            <div className="app-horizontal rct-session-wrapper">
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
                                            <h1 className="text-11 text-white mb-4">Get Verified!</h1>
                                            <p className="text-4 text-white line-height-4 mb-5">Every day, Hamro Remit makes thousands of customers happy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="container my-4">
                                <div className="row">
                                    <div className="col-11 col-lg-9 col-xl-8 mx-auto">
                                        <h2 className="ml-5 mb-4 text-center">Email Verification</h2>
                                        <h3 className="ml-5 mb-10 text-center">Please enter the 4-digit code sent to your email</h3>
                                        <h5 className="ml-5 mb-4 text-center text-primary"><i>{email}</i></h5>
                                        <Form>
                                            <FormGroup className="mb-30">
                                                <OtpInput
                                                    onChange={this.handleChange}
                                                    numInputs={4}
                                                    containerStyle={'otp-container'}
                                                    inputStyle={'has-input input-lg form-control'}
                                                    value={otp}
                                                    isInputNum={true}
                                                    shouldAutoFocus={true}
                                                    separator={<span>&nbsp;</span>}
                                                />
                                            </FormGroup>
                                            <FormGroup className="mb-15 otp-btn">
                                                <Button
                                                    color="primary"
                                                    className="btn-block btn-primary text-white w-100"
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() => this.onUserSignUp()}
                                                >
                                                    <span className={"p-5"}>Verify</span>
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                        <p className="text-3 text-center text-muted">
                                            Didn't receive the verification code?
                                            <a href={"#"} className="ml-5 btn-link" onClick={() => this.onUserSignIn()}>Resend Code</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null,{
    signIn
})(Verify);
