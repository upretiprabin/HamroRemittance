import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppConfig from 'Constants/AppConfig';
import {NotificationContainer,NotificationManager} from "react-notifications";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {validateEmail} from "../helpers/helpers";
import {sendPasswordResetEmail} from "../services/passwordService";

class ForgotPassword extends Component {

    state = {
        email: '',
        invalidEmail:false,
        resetEmailSent:false,
        loading:false
    };

    componentDidMount(){
        const {user} = this.props;
        if(user)
            this.props.history.push("/home")
    }

    onKeyPress(event) {
        if (event.key === "Enter") {
            this.sendResetEmail();
        }
    }

    handleEmail(event){
        new Promise((res,rej)=>{
            this.setState({ email: event.target.value });
            res();
        }).then(()=>this.emailValidator())
    }

    emailValidator(){
        let validate = validateEmail(this.state.email);
        validate ? this.setState({invalidEmail:false}) : this.setState({invalidEmail:true});
    };

    /**
     * Send reset email
     */
    sendResetEmail() {
        if(!this.state.resetEmailSent){
            if (this.state.email !== '' && !this.state.invalidEmail) {
                this.setState({loading:true});
                sendPasswordResetEmail(this.state.email)
                    .then((data)=>{
                        if(!data.data.hasOwnProperty("Error"))
                            this.setState({resetEmailSent:true,loading:false})
                        else{
                            this.setState({loading:false});
                            NotificationManager.error(data.data.Error)
                        }

                    })
                    .catch((failure)=>{
                            this.setState({loading:false});
                            NotificationManager.error(failure.message)
                        }
                    )
            }
        }else{
            this.props.history.push("/home/");
        }
    }

    render() {
        const { email,loading } = this.state;
        return (
            <QueueAnim type="bottom" duration={2000}>
                <NotificationContainer />
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
                                                <h1 className="text-11 text-white mb-4">Convenient, Quick & Secure</h1>
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
                                            <h3 className="ml-5 mb-4">Forgot Password?</h3>
                                            {!this.state.resetEmailSent &&

                                            <p className="black-text mb-20 ml-5">
                                                <span>Enter the email address associated with your account. We will email you instructions to reset your password.</span>
                                            </p>
                                            }
                                            {this.state.resetEmailSent &&

                                            <p className="black-text mb-20 ml-5">
                                                <span>A password reset email was sent to <span className={'theme-text-color'}><strong>{this.state.email}</strong>.</span> Please check this email for further instructions.</span>
                                            </p>
                                            }
                                            <div className={"ml-5"}>
                                                {!this.state.resetEmailSent &&
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
                                                    <span className={this.state.invalidEmail ? "cred-error-label" : "d-none"}>Email must be a valid format</span>
                                                </FormGroup>
                                                }
                                                <FormGroup className="mb-15">
                                                    <Button
                                                        color="primary"
                                                        className="btn-block btn-primary text-white w-100"
                                                        variant="contained"
                                                        size="large"
                                                        onClick={() => this.sendResetEmail()}
                                                    >
                                                        <span className={"p-5"}>{this.state.resetEmailSent?'Okay':'Send Reset Instructions'}</span>
                                                    </Button>
                                                </FormGroup>
                                            </div>
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
    const { user } = authUser;
    return { user }
};

export default connect(mapStateToProps)(ForgotPassword);
