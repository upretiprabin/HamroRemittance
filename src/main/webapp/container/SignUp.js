import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import AppConfig from 'Constants/AppConfig';
import { signIn } from 'Actions';
import Controller from './../controllers/userController.js'
import Validator from './../util/Validators'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        error: [false, false, false]
    };

    onKeyPress(event) {
        if (event.key === "Enter") {
            this.onUserSignUp();
        }
    }

    /**
     * On User Sign Up
     */
    onUserSignUp() {
        localStorage.setItem('user-email', this.state.email)
        localStorage.setItem('key', btoa(this.state.password))
        // this.props.history.push('/verify');
        if (!this.validateData()) {
            Controller.registerUser(this)
        }
    }
    /**
     * Validator
     */
    validateData() {
        const { email, password, confirmPassword } = this.state
        const isError = [false, false, false];
        if (!Validator.emailValidator(email)) {
            isError[0] = true
        }
        if (!Validator.passwordValidator(password)) {
            isError[1] = true
        }
        if (password !== confirmPassword) {
            isError[2] = true
        }
        this.setState({ error: isError })
        return isError[0] || isError[1] || isError[2]
    }

    /**
     * On Login
     */
    onUserSignIn() {
        this.props.history.push('/signIn');
    }

    onShowPassword() {
        // let pwdDom = document.getElementById("pwd");
        // if(!this.state.showPassword)
        //     pwdDom.type = "text";
        // else
        //     pwdDom.type = "password";
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        const { email, password, confirmPassword, error } = this.state;
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
                                    <div className="hero-mask opacity-8" />
                                    <div className="hero-bg hero-bg-scroll" />
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
                                            <h3 className="ml-5 mb-4">Sign Up</h3>
                                            <Form>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        invalid={error[0]}
                                                        type="mail"
                                                        value={email}
                                                        name="user-mail"
                                                        id="user-mail"
                                                        className="has-input input-lg"
                                                        placeholder="Email Address"
                                                        onChange={(event) => this.setState({ email: event.target.value })}
                                                    />
                                                    <span className="has-icon"><i className="ti-email" /></span>
                                                    <FormFeedback>Please enter valid e-mail id.</FormFeedback>
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        invalid={error[1]}
                                                        value={password}
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        name="user-pwd"
                                                        id="pwd"
                                                        className="has-input input-lg"
                                                        placeholder="Password"
                                                        onChange={(event) => this.setState({ password: event.target.value })}
                                                    />
                                                    <span onClick={() => {
                                                        this.onShowPassword();
                                                    }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                                    <FormFeedback>Password must contain more than 8 characters, 1 or more special character and a combination of upper and lowercase characters</FormFeedback>
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        invalid={error[2]}
                                                        value={confirmPassword}
                                                        type="password"
                                                        name="confirmPwd"
                                                        id="confirmPwd"
                                                        className="has-input input-lg"
                                                        placeholder="Confirm Password"
                                                        onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                                                    />
                                                    <FormFeedback>Passwords dont match or empty passwords</FormFeedback>
                                                </FormGroup>
                                                <FormGroup className="mb-15">
                                                    <Button
                                                        color="primary"
                                                        className="btn-block btn-primary text-white w-100"
                                                        variant="contained"
                                                        size="large"
                                                        onClick={() => this.onUserSignUp()}
                                                    >
                                                        <span className={"p-5"}>Sign Up</span>
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                            <p className="text-3 text-center text-muted">
                                                Already have an account?
                                                <a href={"#"} className="ml-5 btn-link" onClick={() => this.onUserSignIn()}>Log In</a>
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
})(SignUp);
