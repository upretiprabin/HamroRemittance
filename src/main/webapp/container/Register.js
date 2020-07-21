import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppConfig from 'Constants/AppConfig';
import Divider from "@material-ui/core/Divider/Divider";
import {Card, FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon, FormFeedback} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from 'Util/IntlMessages';

import {
    signIn
} from 'Actions';
import Validator from "../util/Validators";
import NameForm from "../components/FormComponents/NameForm";
import AddressForm from "../components/FormComponents/AddressForm";

class Register extends Component {

    state = {
        fName: { value: '', error: false },
        mName: { value: '', error: false },
        lName: { value: '', error: false },
        phone: { value: '', error: false },
        dob: { value: '', error: false },
        email: { value: '', error: false },
        password: { value: '', error: false },
        confirmPassword: { value: '', error: false },
        aLine1: { value: '', error: false },
        aLine2: { value: '', error: false },
        subUrb: { value: '', error: false },
        state: { value: '', error: false },
        zip: { value: '', error: false },
        country: { value: 'Australia' },
        nationality: { value: '', error: false },
    };

    /**
     * On User Signup
     */
    onUserSignUp() {
        if (!this.validator()) {
            let formData = {};
            for (let obj in this.state) {
                formData[obj] = this.state[obj].value
            }
            console.log(formData);
            /**
             * TODO register
             */
        }
    }
    onChangeValue = e => {
        let updatedState = this.state;
        updatedState[e.target.name].value = e.target.value;
        this.setState({ ...updatedState })
    };
    validator = () => {
        let error = false;
        let updatedState = this.state;
        for (let obj in updatedState) {
            switch (obj) {
                case 'phone':
                    if (!Validator.phoneValidator(updatedState[obj].value)) {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break;
                case 'email':
                    if (!Validator.emailValidator(updatedState[obj].value)) {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break;
                case 'password':
                    if (!Validator.passwordValidator(updatedState[obj].value)) {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break;
                case 'confirmPassword':
                    if (updatedState[obj].value === updatedState.password.value) {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break;
                case 'mName':
                case 'aLine2':
                    break
                default:
                    if (updatedState[obj].value == '') {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break
            }
        }
        this.setState({ ...updatedState });
        return error
    };

    render() {
        const {
            fName,
            mName,
            lName,
            phone,
            dob,
            email,
            password,
            confirmPassword,
            aLine1,
            aLine2,
            subUrb,
            state,
            zip,
            country,
            nationality
        } = this.state;

        return (
            <div className="app-horizontal rct-session-wrapper">
                <div className="register-wrapper container-fluid px-0 h-100">
                    <div className="no-gutters h-100">
                        <div className="hero-wrap d-flex align-items-center h-100">
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
                                <div className="container my-4 d-flex align-items-center">
                                    <Card body className={"register-card hide-scroll"}>
                                        <div className="">
                                            <h1 className="ml-5 mb-10 text-center">Registration</h1>
                                            <Divider/>
                                            <div className="session-body text-center mt-20">
                                                <Form>
                                                    <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} />
                                                    <div className='row mt-10'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <FormGroup className="has-wrapper">
                                                                <Input
                                                                    invalid={email.error}
                                                                    type="mail"
                                                                    value={email.value}
                                                                    name="email"
                                                                    id="user-mail"
                                                                    className="has-input input-lg"
                                                                    placeholder="Email Address*"
                                                                    onChange={(e) => this.onChangeValue(e)}
                                                                />
                                                                <span className="has-icon"><i className="ti-email"/></span>
                                                                <FormFeedback>Email address in not valid</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <FormGroup className="has-wrapper">
                                                                <Input
                                                                    invalid={phone.error}
                                                                    type="number"
                                                                    value={phone.value}
                                                                    name="phone"
                                                                    id="user-phone"
                                                                    className="has-input input-lg"
                                                                    placeholder="Phone Number*"
                                                                    onChange={(e) => {
                                                                        if (Number(e.target.value) || e.target.value == '')
                                                                            this.onChangeValue(e)
                                                                    }}
                                                                />
                                                                <span className="has-icon"><i className="ti-mobile"/></span>
                                                                <FormFeedback>Required</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <FormGroup className="has-wrapper">
                                                                <Input
                                                                    invalid={password.error}
                                                                    value={password.value}
                                                                    type="Password"
                                                                    name="password"
                                                                    id="pwd"
                                                                    className="has-input input-lg"
                                                                    placeholder="Password*"
                                                                    onChange={(e) => this.onChangeValue(e)}
                                                                />
                                                                <span className="has-icon"><i className="ti-lock"/></span>
                                                                <FormFeedback>Password must contain more than 8 characters, 1 or more special character and a combination of upper and lowercase characters</FormFeedback>
                                                            </FormGroup>
                                                        </div><div className='col-sm-12 col-md-6 col-lg-6'>
                                                        <FormGroup className="has-wrapper">
                                                            <Input
                                                                invalid={confirmPassword.error}
                                                                value={confirmPassword.value}
                                                                type="password"
                                                                name="confirmPassword"
                                                                id="confm-pwd"
                                                                className="has-input input-lg"
                                                                placeholder="Confirm Password*"
                                                                onChange={(e) => this.onChangeValue(e)}
                                                            />
                                                            <span className="has-icon"><i className="ti-lock"/></span>
                                                            <FormFeedback>Passwords dont match or empty passwords</FormFeedback>
                                                        </FormGroup>
                                                    </div>
                                                    </div>
                                                    <div className='row mt-10'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <FormGroup className="has-wrapper">
                                                                <Input
                                                                    invalid={dob.error}
                                                                    type="date"
                                                                    value={dob.value}
                                                                    name="dob"
                                                                    id="user-dob"
                                                                    className="has-input input-lg"
                                                                    placeholder="Date of Birth*"
                                                                    onChange={(e) => this.onChangeValue(e)}
                                                                />
                                                                <FormFeedback>Required</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <FormGroup className="has-wrapper">
                                                                <Input
                                                                    invalid={nationality.error}
                                                                    type="nation"
                                                                    value={nationality.value}
                                                                    name="nationality"
                                                                    id="user-nation"
                                                                    className="has-input input-lg"
                                                                    placeholder="Nationality*"
                                                                    onChange={(e) => this.onChangeValue(e)}
                                                                />
                                                                <span className="has-icon"><i className="ti-flag-alt-2"/></span>
                                                                <FormFeedback>Required</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <AddressForm aLine1={aLine1} aLine2={aLine2} subUrb={subUrb} zip={zip} state={state} country={country} disabledCountry={true} onChangeValue={this.onChangeValue} />
                                                    <h5 className={"mt-20"}>By submitting this form, you accept Hamro Remit's <a className="text-primary">Terms and Conditions</a> and <a className="text-primary">Privacy Policy</a>.</h5>
                                                    <FormGroup className="mb-15">
                                                        <Button
                                                            color="primary"
                                                            className="btn-block btn-custom text-white w-50"
                                                            variant="contained"
                                                            size="large"
                                                            onClick={() => {}}
                                                        >
                                                            <span className={"p-5"}>Register</span>
                                                        </Button>
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                        </div>
                                    </Card>
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
})(Register);
