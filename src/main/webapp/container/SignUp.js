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
import { validateEmail, validatePasswordStrength } from 'Helpers/helpers'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        invalidPassword: false,
        invalidEmail: false,
        passwordMatch: true,
        loading: false
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        if (this._isMounted)
            this.setState(data);
    }

    onKeyPress(event) {
        if (event.key === "Enter") {
            this.onUserSignUp();
        }
    }

    handleEmail(event) {
        return new Promise((res, rej) => {
            this.setState({ email: event.target.value });
            res();
        }).then(() => this.emailValidator())
    }

    handlePassword(event) {
        new Promise((res, rej) => {
            this.setState({ password: event.target.value });
            res();
        }).then(() => {
            this.passwordValidator();
            if (this.state.confirmPassword !== "")
                this.matchPasswords()
        })
    }

    matchPasswords() {
        this.setState({ passwordMatch: this.state.password === this.state.confirmPassword })
    }

    emailValidator() {
        let validate = validateEmail(this.state.email);
        validate ? this.setState({ invalidEmail: false }) : this.setState({ invalidEmail: true });
    };

    handleConfirmPassword(event) {
        new Promise((res, rej) => {
            this.setState({ confirmPassword: event.target.value });
            res();
        }).then(() => this.matchPasswords())

    }

    /**
     * On User Sign Up
     */
    onUserSignUp() {
        if (this.validateForm()) {
            Controller.registerUser(this)
        }
    }

    validateForm() {
        return this.state.email !== '' && this.state.password !== '' && !this.state.invalidPassword && this.state.passwordMatch
    }

    passwordValidator() {
        let validate = validatePasswordStrength(this.state.password);
        validate ? this.setState({ invalidPassword: false }) : this.setState({ invalidPassword: true });
    };

    /**
     * On Login
     */
    onUserSignIn() {
        this.props.history.push('/signIn');
    }

    onShowPassword(target) {
        if (target === 'PASSWORD')
            this.setState({ showPassword: !this.state.showPassword });
        if (target === 'CONFIRM_PASSWORD')
            this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
    }

    render() {
        const {
            email,
            password,
            confirmPassword,
            invalidPassword,
            invalidEmail,
            passwordMatch,
            loading,
            showPassword,
            showConfirmPassword
        } = this.state;
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
                                                        <img src={AppConfig.appLogo} alt="Hamro Remit" height={55} width={100} />
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
                                                        type="mail"
                                                        value={email}
                                                        name="user-mail"
                                                        id="user-mail"
                                                        className="has-input input-lg"
                                                        placeholder="Email Address"
                                                        onKeyPress={(event) => { this.onKeyPress(event) }}
                                                        onChange={(event) => this.handleEmail(event)}
                                                    />
                                                    <span className="has-icon"><i className="ti-email" /></span>
                                                    <span className={invalidEmail ? "cred-error-label" : "d-none"}>Email must be a valid format</span>
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        value={password}
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="user-pwd"
                                                        id="pwd"
                                                        className="has-input input-lg"
                                                        placeholder="Password"
                                                        onKeyPress={(event) => { this.onKeyPress(event) }}
                                                        onChange={(event) => this.handlePassword(event)}
                                                    />
                                                    <span onClick={() => {
                                                        this.onShowPassword('PASSWORD');
                                                    }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                                    <span className={invalidPassword ? "cred-error-label" : "d-none"}><strong>Weak password</strong> <br /> Your password must have at least 8 characters, upper & lower case letters, at least one special character and at least one number.</span>
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        value={confirmPassword}
                                                        name="usr-pwd-confirm"
                                                        id="usr-pwd-confirm"
                                                        className={"has-input input-lg"}
                                                        placeholder="Confirm Password"
                                                        onChange={(event) => this.handleConfirmPassword(event)}
                                                    />
                                                    <span onClick={() => {
                                                        this.onShowPassword('CONFIRM_PASSWORD');
                                                    }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                                    <span className={!passwordMatch ? "cred-error-label" : "d-none"}>Passwords don't match</span>
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
