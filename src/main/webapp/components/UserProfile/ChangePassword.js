/**
 * User Password Change
 */

import React, { Component } from 'react'
import { FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Controller from "./../../controllers/userProfileController"
import Validator from '../../util/Validators';
class ChangePassword extends Component {

    _isMounted = false;
    state = {
        loading: false,
        errorMessage: "",
        existingPassword: { value: "", error: false, show: false },
        password: { value: "", error: false, show: false },
        confirmPassword: { value: "", error: false, show: false }
    };

    componentDidMount() {
        this._isMounted = true;
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        if (this._isMounted) {
            this.setState(data)
        }
    }
    changePassword = () => {
        if (!this.validator()) {
            let formData = {}
            for (let obj in this.state) {
                if (obj != 'loading') {
                    formData[obj] = this.state[obj].value
                }
            }
            delete formData['confirmPassword']
            Controller.updateUserPassword(this, formData)
        } else {
            console.log("Not validated")
        }
    }
    validator = () => {
        let error = false;
        let updatedState = this.state;
        delete updatedState['loading']
        delete updatedState['errorMessage']

        for (let obj in updatedState) {
            if (!Validator.passwordValidator(updatedState[obj].value)) {
                updatedState[obj].error = true;
                error = true
                updatedState.errorMessage = 'Your password must have at least 8 characters, upper & lower case letters, at least one special character and at least one number.'
            } else {
                updatedState[obj].error = false
            }
        }
        if (!error && (updatedState.password.value !== updatedState.confirmPassword.value)) {
            updatedState.password.error = true;
            updatedState.confirmPassword.error = true;
            updatedState.errorMessage = 'Your Passwords do not match.'
            error = true
        }
        if (!error && (updatedState.password.value === updatedState.existingPassword.value)) {
            updatedState.password.error = true;
            updatedState.confirmPassword.error = true;
            updatedState.existingPassword.error = true;
            updatedState.errorMessage = 'Old and new passwords cannot be same.'
            error = true
        }
        this.setState({ ...updatedState });
        return error
    }
    onChangeValue = e => {
        let updatedState = this.state;
        updatedState[e.target.name].value = e.target.value;
        this.setState({ ...updatedState })
    };
    onShowPassword = id => {
        const { password, confirmPassword, existingPassword } = this.state;
        let updatedState = {}
        if (id == 0) {
            updatedState.existingPassword = { value: existingPassword.value, error: existingPassword.error, show: !existingPassword.show }
        } else if (id == 1) {
            updatedState.password = { value: password.value, error: password.error, show: !password.show }
        } else {
            updatedState.confirmPassword = { value: confirmPassword.value, error: confirmPassword.error, show: !confirmPassword.show }
        }
        this.changeState(updatedState)
    }
    render() {
        const {
            loading, password, confirmPassword, existingPassword,errorMessage
        } = this.state
        return (
            <>
                {loading &&
                    <div className="page-loader d-flex justify-content-center mb-30">
                        <CircularProgress />
                    </div>
                }
                {!loading &&
                    <div>

                        {(password.error || confirmPassword.error || existingPassword.error) && <Label className='text-danger'>{errorMessage}</Label>}
                        <div className='row'>
                            <div className='col-12'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={existingPassword.error}
                                        type={existingPassword.show ? "text" : "password"}
                                        value={existingPassword.value}
                                        name="existingPassword"
                                        id="first-name"
                                        className="has-input input-lg"
                                        placeholder="Existing Password*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span onClick={() => { this.onShowPassword(0) }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                </FormGroup>
                            </div>
                            <div className='col-12'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={password.error}
                                        type={password.show ? "text" : "password"}
                                        value={password.value}
                                        name="password"
                                        id="middle-name"
                                        className="has-input input-lg"
                                        placeholder="New Password*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span onClick={() => { this.onShowPassword(1) }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                </FormGroup>
                            </div>
                            <div className='col-12'>
                                <FormGroup className="has-wrapper">
                                    <Input
                                        invalid={confirmPassword.error}
                                        type={confirmPassword.show ? "text" : "password"}
                                        value={confirmPassword.value}
                                        name="confirmPassword"
                                        id="last-name"
                                        className="has-input input-lg"
                                        placeholder="Confirm Password*"
                                        onChange={(e) => this.onChangeValue(e)}
                                    />
                                    <span onClick={() => { this.onShowPassword(2) }} title={"Show"} className="has-icon"><i className="ti-eye" /></span>
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup className="mb-15 mr-auto ml-auto text-center">
                            <Button
                                className="text-white pr-20 pl-20 btn-primary"
                                variant="contained"
                                size="large"
                                onClick={() => this.changePassword()}>
                                Change Password
                    </Button>
                            <Button
                                className="text-white pr-20 pl-20 ml-10 btn-secondary"
                                variant="contained"
                                size="large"
                                onClick={() => this.props.history.push('dashboard')}>
                                Cancel
                    </Button>
                        </FormGroup>
                    </div>
                }
            </>
        )
    }
}

export default withRouter(ChangePassword) 