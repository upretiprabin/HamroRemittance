import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import AppConfig from 'Constants/AppConfig';
import { signIn } from 'Actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {validateEmail,validatePasswordStrength} from 'Helpers/helpers'
import log from '../services/loggerService';
import {clearLocalStorage} from "../sagas/AuthenticationManager";
import {resetPassword} from "../services/passwordService";

class ResetPassword extends Component {

    state = {
        password: '',
        confirmPassword:'',
        passwordMatch:true,
        invalidPassword:false,
        isResetDone : false,
        showPassword: false,
        loading:false
    };

    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handlePassword(event){
        new Promise((res,rej)=>{
            this.setState({ password: event.target.value });
            res();
        }).then(()=>{
            this.passwordValidator();
            if(this.state.confirmPassword !== "")
                this.matchPasswords()
        })
    }

    onShowPassword(e) {
        let show = this.state.showPassword;
        this.setState({ showPassword: !show });
    }

    matchPasswords(){
        this.setState({passwordMatch : this.state.password === this.state.confirmPassword})
    }

    handleConfirmPassword(event){
        new Promise((res,rej)=>{
            this.setState({ confirmPassword: event.target.value });
            res();
        }).then(()=> this.matchPasswords())

    }

    passwordValidator(){
        let validate = validatePasswordStrength(this.state.password);
        validate ? this.setState({invalidPassword:false}) : this.setState({invalidPassword:true});
    };

    resetPassword() {
        if (this.state.password !== '' && !this.state.invalidPassword && this.state.passwordMatch) {
            this.setState({loading:true});
            let queryObj = new URLSearchParams(location.search);
            let resetCode = queryObj.get('reset-code');
            log.info("Reset code : "+resetCode);
            resetPassword(resetCode,btoa(this.state.password))
                .then((success)=>{
                    if(this._isMounted){
                        this.setState({loading:false});
                        if(!success.data.hasOwnProperty("Error")){
                            clearLocalStorage();
                            setTimeout(()=>{
                                NotificationManager.listNotify = [];
                                this.props.history.push("/signin/")
                            },2000);
                            NotificationManager.success("Password Changed Successfully");
                        }else{
                            NotificationManager.error(success.data.Error);
                        }
                    }
                })
                .catch((failure)=>{
                        log.error(failure.message);
                        if(this._isMounted)
                            this.setState({loading:false});
                        NotificationManager.error("Error Occurred!");
                    }
                )
        }
    }

    render() {
        const {
            password,
            confirmPassword,
            invalidPassword,
            passwordMatch,
            loading
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
                                                        <img src={AppConfig.appLogo} alt="Hamro Remit" height={55} width={100}/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters my-auto">
                                            <div className="col-10 col-lg-9 mx-auto">
                                                <h1 className="text-11 text-white mb-4">Be with us</h1>
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
                                            <h3 className="ml-5 mb-4">Reset Password</h3>
                                            <Form>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        value={password}
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        name="reset-pwd"
                                                        id="reset-pwd"
                                                        className="has-input input-lg"
                                                        placeholder="Password"
                                                        onChange={(event) => this.handlePassword(event)}
                                                    />
                                                    <span onClick={() => {
                                                        this.onShowPassword();
                                                    }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                                    <span className={invalidPassword?"cred-error-label":"d-none"}><strong>Weak password</strong> <br/> Your password must have at least 8 characters, upper & lower case letters, at least one special character and at least one number.</span>
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        type="Password"
                                                        value={confirmPassword}
                                                        name="reset-pwd-confirm"
                                                        id="reset-pwd-confirm"
                                                        className={"has-input input-lg"}
                                                        placeholder="Confirm Password"
                                                        onChange={(event) => this.handleConfirmPassword(event)}
                                                    />
                                                    <span className={!passwordMatch?"cred-error-label":"d-none"}>Passwords don't match</span>
                                                </FormGroup>
                                                <FormGroup className="mb-15">
                                                    <Button
                                                        color="primary"
                                                        className="btn-block btn-primary text-white w-100"
                                                        variant="contained"
                                                        size="large"
                                                        onClick={() => this.resetPassword()}
                                                    >
                                                        <span className={"p-5"}>Reset Password</span>
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NotificationContainer/>
                </div>
            </QueueAnim>
        );
    }
}

export default connect()(ResetPassword);

