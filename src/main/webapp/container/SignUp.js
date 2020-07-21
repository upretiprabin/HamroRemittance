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

class SignUp extends Component {

    state = {
        email: '',
        password: '',
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

    onShowPassword(){
        let pwdDom = document.getElementById("pwd");
        if(!this.state.showPassword)
            pwdDom.type = "text";
        else
            pwdDom.type = "password";
        this.setState({showPassword:!this.state.showPassword});
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
                                                    <span onClick={()=>{
                                                        this.onShowPassword();
                                                    }} title={"Show"} className="has-icon"><i className="ti-eye"/></span>
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
