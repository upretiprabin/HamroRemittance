/**
 * User Profile Update
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { FormGroup, Input, Form, FormFeedback } from 'reactstrap';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Controller from "./../../controllers/userProfileController"
import Validator from '../../util/Validators';
import { getFormattedDate } from "../../helpers/helpers";
class UserProfile extends Component {

    _isMounted = false;
    state = {
        loading: false,
        firstName: { value: '', error: false },
        middleName: { value: '', error: false },
        lastName: { value: '', error: false },
        dateOfBirth: { value: '', error: false },
        phoneNumber: { value: '', error: false },
        addressLineOne: { value: "", error: false },
        addressLineTwo: { value: "", error: false },
        suburbCity: { value: "", error: false },
        stateProvince: { value: "", error: false },
        zipCode: { value: "", error: false },
        country: { value: "", error: false },
        nationality: { value: "", error: false },
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState = (data) => {
        if (this._isMounted) {
            this.setState(data)
        }
    }
    setValuesAndErrors = (data) => {
        const updatedData = {
            firstName: { value: data.firstName, error: false },
            middleName: { value: data.middleName, error: false },
            lastName: { value: data.lastName, error: false },
            dateOfBirth: { value: getFormattedDate(data.dateOfBirth).split(' ')[0], error: false },
            phoneNumber: { value: data.phoneNumber, error: false },
            addressLineOne: { value: data.addressLineOne, error: false },
            addressLineTwo: { value: data.addressLineTwo, error: false },
            suburbCity: { value: data.suburbCity, error: false },
            stateProvince: { value: data.stateProvince, error: false },
            zipCode: { value: data.zipCode, error: false },
            country: { value: data.country, error: false },
            nationality: { value: data.nationality, error: false }
        }
        const { firstName, lastName } = updatedData
        this.props.setInitials({ initials: `${firstName.value ? firstName.value[0] : ""} ${lastName.value ? lastName.value[0] : ""}` })
        this.changeState({
            ...updatedData,
            loading: false
        })
    }
    updateUser = () => {
        if (!this.validator()) {
            let formData = {}
            for (let obj in this.state) {
                if (obj != 'loading') {
                    formData[obj] = this.state[obj].value
                }
            }
            Controller.updateUser(this, formData)
        } else {
            console.log("Not validated")
        }
    }
    validator = () => {
        let error = false;
        let updatedState = this.state;
        delete updatedState['loading']
        for (let obj in updatedState) {
            switch (obj) {
                case 'phoneNumber':
                    if (!Validator.australianPhoneValidator(updatedState[obj].value)) {
                        updatedState[obj].error = true;
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break;
                case 'middleName':
                case 'addressLineTwo':
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
    }
    onChangeValue = e => {
        let updatedState = this.state;
        updatedState[e.target.name].value = e.target.value;
        this.setState({ ...updatedState })
    };

    loadData() {
        const user = localStorage.getItem('user-profile')
        if (!user)
            Controller.getUserDetails(this)
        else {
            this.setValuesAndErrors(JSON.parse(user))
        }
    }
    render() {
        const {
            loading, firstName, middleName, lastName, dateOfBirth, phoneNumber, filePath,
            addressLineOne, addressLineTwo, suburbCity, country, stateProvince, zipCode, nationality,
        } = this.state
        return (
            <div>
                {loading &&
                    <div className="page-loader d-flex justify-content-center mb-30">
                        <CircularProgress />
                    </div>
                }
                {!loading &&

                    <Form>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={firstName.error}
                                        type="text"
                                        value={firstName.value}
                                        name="firstName"
                                        id="first-name"
                                        className="has-input input-lg"
                                        placeholder="First Name*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-user" /></span>
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={middleName.error}
                                        type="text"
                                        value={middleName.value}
                                        name="middleName"
                                        id="middle-name"
                                        className="has-input input-lg"
                                        placeholder="Middle Name"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-user" /></span>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={lastName.error}
                                        type="text"
                                        value={lastName.value}
                                        name="lastName"
                                        id="last-name"
                                        className="has-input input-lg"
                                        placeholder="Last Name*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-user" /></span>
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>
                        <div className='row mt-10'>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" >+61</span>
                                        </div>
                                        <Input
                                            invalid={phoneNumber.error}
                                            type="text"
                                            value={phoneNumber.value}
                                            name="phoneNumber"
                                            id="user-phoneNumber"
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
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={dateOfBirth.error}
                                        type="date"
                                        value={dateOfBirth.value}
                                        name="dateOfBirth"
                                        id="user-dateOfBirth"
                                        className="has-input input-lg"
                                        placeholder="Date of Birth*"
                                        max={`${new Date().getFullYear()}-${('00' + (new Date().getMonth() + 1)).slice(-2)}-${('00' + new Date().getDate()).slice(-2)}`}
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>
                        <div className='row mt-10'>
                            <div className='col-sm-12 col-md-12 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={addressLineOne.error}
                                        type="text"
                                        value={addressLineOne.value}
                                        name="addressLineOne"
                                        id="user-addressLineOne"
                                        className="has-input input-lg"
                                        placeholder="Address line 1*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-location-pin"></i></span>
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        type="text"
                                        value={addressLineTwo.value}
                                        name="addressLineTwo"
                                        id="user-addressLineTwo"
                                        className="has-input input-lg"
                                        placeholder="Address line 2"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-location-pin"></i></span>
                                </FormGroup>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={suburbCity.error}
                                        type="text"
                                        value={suburbCity.value}
                                        name="suburbCity"
                                        id="user-suburbCity"
                                        className="has-input input-lg"
                                        placeholder={"Suburb*"}
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-location-pin"></i></span>
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={stateProvince.error}
                                        type="text"
                                        value={stateProvince.value}
                                        name="stateProvince"
                                        id="stateProvince-name"
                                        className="has-input input-lg"
                                        placeholder="State*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-location-arrow"></i></span>
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={zipCode.error}
                                        type="text"
                                        value={zipCode.value}
                                        name="zipCode"
                                        id="zipCode-code"
                                        className="has-input input-lg"
                                        placeholder={"Post Code*"}
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-line-dashed"></i></span>
                                </FormGroup>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        type="select"
                                        value={country.value}
                                        name="country"
                                        id="country"
                                        bsSize="lg"
                                        className="input-lg"
                                        placeholder="Country*"
                                        disabled={true}
                                        onChange={(e) => this.onChangeValue(e)}>
                                        <option value=''>Select Country</option>
                                        <option value={country.value}>{country.value}</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={nationality.error}
                                        type="nation"
                                        value={nationality.value}
                                        name="nationality"
                                        disabled={true}
                                        id="user-nation"
                                        className="has-input input-lg"
                                        placeholder="Nationality*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span className="has-icon"><i className="ti-flag-alt-2" /></span>
                                    <FormFeedback>Required</FormFeedback>
                                </FormGroup>
                            </div>
                            <FormGroup className="mb-15 mr-auto ml-auto text-center">
                                <Button
                                    className="text-white pr-20 pl-20 btn-primary"
                                    variant="contained"
                                    size="large"
                                    onClick={() => this.updateUser()}>
                                    Save
                            	</Button>
                                <Button
                                    className="text-white pr-20 pl-20 ml-10 btn-secondary"
                                    variant="contained"
                                    size="large"
                                    onClick={() => this.props.history.push('dashboard')}>
                                    Return to Dashboard
                            	</Button>
                            </FormGroup>
                        </div>
                    </Form>
                }
            </div>
        )
    }
}

export default withRouter(UserProfile)