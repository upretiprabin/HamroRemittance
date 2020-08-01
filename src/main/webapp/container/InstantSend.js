import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import AppConfig from 'Constants/AppConfig';
import {
    signIn
} from 'Actions';
import SendMoney from "../components/SendMoney/SendMoney";

class InstantSend extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword : '',
        showPassword : false
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
        this.props.history.push('/verify');
    }

    /**
     * On Login
     */
    onUserSignIn() {
        this.props.history.push('/signIn');
    }

    render() {
        const { email, password, confirmPassword} = this.state;
        const fee = 7.49;
        const countryRate = 82.95;
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
                                                        <img src={AppConfig.appLogo} alt="Hamro Remit" height={55} width={100}/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters my-auto">
                                            <div className="col-10 col-lg-9 mx-auto">
                                                <h1 className="text-11 text-white mb-4">Send Money Instantly</h1>
                                                <p className="text-4 text-white line-height-4 mb-5">Hamro Remittance makes your transaction safe and easy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="container my-4">
                                    <div className="row">
                                        <div className="col-11 col-lg-9 col-xl-8 mx-auto">
                                            <h3 className="ml-5 mb-4">Send</h3>
                                            <SendMoney
                                                fee={fee}
                                                countryRate={countryRate}
                                                onContinue={() => this.onUserSignIn()}
                                            />
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
})(InstantSend);
