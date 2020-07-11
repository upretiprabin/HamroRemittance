import React from 'react'
import NameForm from '../FormComponents/NameForm';
import AddressForm from '../FormComponents/AddressForm';
import { Divider, FormGroup } from '@material-ui/core';
import RelationNContact from '../FormComponents/RelationNContact';
import BankForm from '../FormComponents/BankDetails';
import Button from '@material-ui/core/Button';
import { Label } from 'reactstrap';
import Validator from '../../util/Validators';

export default class RecieverDetails extends React.Component {
    state = {
        fName: { value: '', error: false },
        mName: { value: '', error: false },
        lName: { value: '', error: false },
        aLine1: { value: '', error: false },
        aLine2: { value: '', error: false },
        state: { value: '', error: false },
        zip: { value: '', error: false },
        country: { value: '', error: false },
        relation: { value: '', error: false },
        phone: { value: '', error: false },
        email: { value: '', error: false },
        bank: { value: '', error: false },
        branch: { value: '', error: false },
        accNumber: { value: '', error: false },
    }
    componentDidMount() {
        userData = this.props.userData
    }
    validator = () => {
        let error = false
        let updatedState = this.state
        for (let obj in updatedState) {
            switch (obj) {
                case 'phone':
                    if (!Validator.phoneValidator(updatedState[obj].value)) {
                        updatedState.phone.error = true
                        error = true
                    } else {
                        updatedState.phone.error = false
                    }
                    break
                case 'email':
                    if (!Validator.emailValidator(updatedState[obj].value)) {
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
                        updatedState[obj].error = true
                        error = true
                    } else {
                        updatedState[obj].error = false
                    }
                    break
            }
        }
        this.setState({ ...updatedState })
        return error
    }
    onChangeValue = e => {
        let updatedState = this.state;
        updatedState[e.target.name] = { value: e.target.value, error: false }
        this.setState({ ...updatedState })
    }
    onSubmit = e => {
        var formData = {}
        for (let obj in this.state) {
            formData[obj] = this.state[obj].value
        }
        if (this.validator()) {
            this.props.addReciver(formData)
        }
    }
    render() {
        const { fName, mName, lName, aLine2, aLine1, state, zip, country, relation, phone, email, bank, branch, accNumber } = this.state
        return (
            <div className="session-inner-wrapper">
                <div className="container">
                    <div className="row row-eq-height">
                        <div className='col-sm-12 col-md-12 col-lg-12'>
                            <Label>User Details</Label>
                            <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />
                            <RelationNContact relation={relation} phone={phone} email={email} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />
                            <AddressForm aLine1={aLine1} aLine2={aLine2} zip={zip} state={state} country={country} disabledCountry={false} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />
                            <Divider />
                            <Label className='mt-10'>Bank Details</Label>
                            <BankForm bank={bank} branch={branch} accNumber={accNumber} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />

                            {!this.props.disabled && <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <div className="d-flex justify-content-center">
                                        <FormGroup className="m-15">
                                            <Button
                                                className="btn-info text-white btn-block w-100"
                                                variant="contained"
                                                size="large"
                                                onClick={(e) => this.onSubmit(e)}
                                            >Add Reciver</Button>
                                        </FormGroup>

                                        <FormGroup className="m-15">
                                            <Button
                                                className="btn-danger text-white btn-block w-100"
                                                variant="contained"
                                                size="large"
                                                onClick={() => this.props.cancel()}
                                            >Cancel</Button>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}