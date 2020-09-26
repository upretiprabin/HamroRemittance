import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider/Divider";
import { FormGroup, Input, Form, Label, FormFeedback } from 'reactstrap';
import NameForm from '../FormComponents/NameForm';
import AddressForm from '../FormComponents/AddressForm';
import DocumentIdentification from '../FormComponents/DocumentIdentification';

import Validator from '../../util/Validators';
import { getPasswordFromRegEx } from '../../util/helpers';


class SenderModalContent extends Component {

    state = {
        email: { value: '', error: false },
        password: { value: '', error: false, visible: false },
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
    createUser() {
        if (!this.validator()) {
            let formData = {}
            for (let obj in this.state) {
                formData[obj] = this.state[obj].value
            }
            this.props.submit(formData)
        } else {
            console.log("Not validated")
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
    changePasswordVisible = (e) => {
        const password = this.state.password
        this.setState({ password: { value: password.value, error: password.error, visible: password.visible ? false : true } })
    }
    generatePassword = (e) =>{
        const password = this.state.password
        const genPassword = getPasswordFromRegEx()
        this.setState({ password: { value: genPassword, error: password.error, visible: true } })
    }
    render() {
        const {
            email, password,
            fName, mName, lName,
            phone, dob, aLine1, aLine2, subUrb, state, zip, country, nationality,
            docType, docExpiry, docId, file
        } = this.state;
        return (
            <div className="">
                <h1 className="ml-5 mb-10 text-center">Create New Sender</h1>
                <Divider />
                <div className="session-body text-center mt-20">
                    <Form>
                        <div className="text-left">
                            <Label className="text-left">User Login Credentials</Label>
                        </div>
                        <div className='row mt-10'>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <div className="input-group">
                                        <Input
                                            invalid={email.error}
                                            type="text"
                                            value={email.value}
                                            name="email"
                                            id="user-email"
                                            className="has-input input-lg w-50"
                                            placeholder="Email Address*"
                                            onChange={(e) => {
                                                this.onChangeValue(e)
                                            }}
                                        />
                                        <FormFeedback>Invalid</FormFeedback>
                                        <span className="has-icon"><i className="ti-email" /></span>
                                    </div>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={password.error}
                                        type={password.visible ? "text" : "password"}
                                        value={password.value}
                                        name="password"
                                        id="user-password"
                                        className="has-input input-lg"
                                        placeholder="Password*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <FormFeedback>Required</FormFeedback>
                                    <span title={"Show"} className="has-icon" onClick={e => this.changePasswordVisible(e)}><i className="ti-eye" /></span>
                                    <span title={"Generate Random Password"} className="has-icon mr-30 text-primary" onClick={e => this.generatePassword(e)}><i className="ti-control-shuffle" /></span>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="text-left">
                            <Label className="text-left">User Details</Label>
                        </div>
                        <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} />
                        <div className='row mt-10'>
                            <div className='col-sm-12 col-md-4 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" >+61</span>
                                        </div>
                                        <Input
                                            invalid={phone.error}
                                            type="text"
                                            value={phone.value}
                                            name="phone"
                                            id="user-phone"
                                            className="has-input input-lg w-50"
                                            placeholder="Phone Number*"
                                            onChange={(e) => {
                                                this.onChangeValue(e)
                                            }}
                                        />
                                        <FormFeedback>Invalid</FormFeedback>
                                        <span className="has-icon"><i className="ti-mobile"></i></span>
                                    </div>
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
                        <div className="mt-10 mb-15">
                            <Button
                                color="primary"
                                className="btn-block btn-custom text-white w-40 m-5"
                                variant="contained"
                                size="large"
                                onClick={() => this.createUser()}>
                                Register
                            </Button>
                            <Button
                                color="secondary"
                                className="btn-block btn-custom text-white w-40 m-5"
                                variant="contained"
                                size="large"
                                onClick={() => this.props.cancel()}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SenderModalContent;
