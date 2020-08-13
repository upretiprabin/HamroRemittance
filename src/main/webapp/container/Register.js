import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppConfig from 'Constants/AppConfig';
import Divider from "@material-ui/core/Divider/Divider";
import { Card, FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from 'Util/IntlMessages';

import {
    signIn
} from 'Actions';
import Validator from "../util/Validators";
import NameForm from "../components/FormComponents/NameForm";
import AddressForm from "../components/FormComponents/AddressForm";
import DocumentIdentification from "../components/FormComponents/DocumentIdentification";
import Controller from './../controllers/userController'

class Register extends Component {

    state = {
        fName: { value: '', error: false },
        mName: { value: '', error: false },
        lName: { value: '', error: false },
        phone: { value: '', error: false },
        dob: { value: '', error: false },
        aLine1: { value: '', error: false },
        aLine2: { value: '', error: false },
        subUrb: { value: '', error: false },
        state: { value: '', error: false },
        zip: { value: '', error: false },
        country: { value: 'Australia' },
        nationality: { value: '', error: false },
        docType: { value: '', error: false },
        docExpiry: { value: '', error: false },
        docId: { value: '', error: false },
        file: { value: null, error: false }
    };
    onFileSelected = e => {
        let updatedState = this.state
        updatedState.file.value = e;
        this.setState({ ...updatedState })
    }
    componentDidMount = () => {
        // const user = localStorage.getItem('user')
        // if (user) {
        //     const data = {
        //         username: localStorage.getItem('user-email'),
        //         password: atob(localStorage.getItem('key'))
        //     }
        //     localStorage.removeItem('user-email')
        //     localStorage.removeItem('key')
        //     this.props.signIn(data, this.props.history)
        // }
    }
    /**
     * On User Signup
     */
    onRegister() {
        if (!this.validator()) {
            let formData = {}
            for (let obj in this.state) {
                if (obj != 'file') {
                    formData[obj] = this.state[obj].value
                }
            }
            Controller.saveUserDetails(this, formData)
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
                    if (!Validator.australianPhoneValidator(updatedState[obj].value)) {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break;
                case 'file':
                    if (updatedState[obj].value === null) {
                        updatedState[obj].error = true
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break
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
            fName, mName, lName,
            phone, dob, aLine1, aLine2, subUrb, state, zip, country, nationality,
            docType, docExpiry, docId, file
        } = this.state;

        return (
            <div className="app-horizontal rct-session-wrapper">
                <div className="register-wrapper container-fluid px-0 h-100">
                    <div className="no-gutters h-100">
                        <div className="hero-wrap d-flex align-items-center h-100">
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
                                <div className="container my-4 d-flex align-items-center">
                                    <Card body className={"register-card hide-scroll"}>
                                        <div className="">
                                            <h1 className="ml-5 mb-10 text-center">Registration</h1>
                                            <Divider />
                                            <div className="session-body text-center mt-20">
                                                <Form>
                                                    <div className="text-left">
                                                        <Label className="text-left">User Details</Label>
                                                    </div>
                                                    <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} />
                                                    <div className='row mt-10'>
                                                        <div className='col-sm-12 col-md-4 col-lg-4'>
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
                                                                <span className="has-icon"><i className="ti-mobile" /></span>
                                                                <FormFeedback>Invalid</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                        <div className='col-sm-12 col-md-4 col-lg-4'>
                                                            <FormGroup className="has-wrapper">
                                                                <Input
                                                                    invalid={dob.error}
                                                                    type="date"
                                                                    value={dob.value}
                                                                    name="dob"
                                                                    id="user-dob"
                                                                    className="has-input input-lg"
                                                                    placeholder="Date of Birth*"
                                                                    max={`${new Date().getFullYear()}-${('00' + (new Date().getMonth() + 1)).slice(-2)}-${('00' + new Date().getDate()).slice(-2)}`}
                                                                    onChange={(e) => this.onChangeValue(e)}
                                                                />
                                                                <FormFeedback>Required</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                        <div className='col-sm-12 col-md-4 col-lg-4'>
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
                                                                <span className="has-icon"><i className="ti-flag-alt-2" /></span>
                                                                <FormFeedback>Required</FormFeedback>
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className="text-left">
                                                        <Label className="text-left">User Address</Label>
                                                    </div>
                                                    <AddressForm aLine1={aLine1} aLine2={aLine2} subUrb={subUrb} zip={zip} state={state} country={country} disabledCountry={true} onChangeValue={this.onChangeValue} sender={true} />

                                                    <div className="text-left">
                                                        <Label className="text-left">User Documents</Label>
                                                    </div>
                                                    <DocumentIdentification
                                                        file={file}
                                                        docType={docType}
                                                        docExpiry={docExpiry}
                                                        docId={docId}
                                                        onChangeValue={this.onChangeValue}
                                                        onFileSelected={this.onFileSelected}
                                                    />
                                                    <FormGroup className="mb-15">
                                                        <Button
                                                            color="primary"
                                                            className="btn-block btn-custom text-white w-50"
                                                            variant="contained"
                                                            size="large"
                                                            onClick={() => this.onRegister()}>
                                                            Register
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

export default connect(null, {
    signIn
})(Register);
