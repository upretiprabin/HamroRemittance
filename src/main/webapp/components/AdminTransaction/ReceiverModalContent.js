import React from 'react'
import NameForm from '../FormComponents/NameForm';
import AddressForm from '../FormComponents/AddressForm';
import { Divider, FormGroup } from '@material-ui/core';
import RelationNContact from '../FormComponents/RelationNContact';
import AdminBankForm from '../FormComponents/AdminBankDetails';
import Button from '@material-ui/core/Button';
import { Label } from 'reactstrap';
import Validator from '../../util/Validators';

export default class ReceiverModalContent extends React.Component {
    state = {
        fName: { value: '', error: false },
        mName: { value: '', error: false },
        lName: { value: '', error: false },
        aLine1: { value: '', error: false },
        aLine2: { value: '', error: false },
        subUrb: { value: '', error: false },
        state: { value: '', error: false },
        zip: { value: '', error: false },
        country: { value: 'Nepal', error: false },
        relation: { value: '', error: false },
        phone: { value: '', error: false },
        email: { value: '', error: false },
        bank: { value: '', error: false },
        branch: { value: '', error: false },
        accNumber: { value: '', error: false },
        remit: { value: '', error: false },
        district: { value: '', error: false },
        remitPhone: { value: '', error: false },
        cashPickup: null
    }
    validator = () => {
        let error = false
        let updatedState = this.state
        const cashPickup = this.state.cashPickup
        delete updatedState["cashPickup"]
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
                case 'zip':
                    break
                case "bank":
                case "branch":
                case "accNumber":
                    if (cashPickup == 1) {
                        if (updatedState[obj].value == '') {
                            updatedState[obj].error = true
                            error = true
                        } else {
                            updatedState[obj].error = false
                        }
                    }
                case "remit":
                case "district":
                case "remitPhone":
                    if (cashPickup == 2) {
                        if (updatedState[obj].value == '') {
                            updatedState[obj].error = true
                            error = true
                        } else {
                            updatedState[obj].error = false
                        }
                    }
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
        if (e.target.name == 'cashPickup') updatedState[e.target.name] = e.target.value
        else updatedState[e.target.name] = { value: e.target.value, error: false }
        this.setState({ ...updatedState })
    }
    onSubmit = e => {
        var formData = {}
        for (let obj in this.state) {
            if (obj !== 'cashPickup')
                formData[obj] = this.state[obj].value
        }
        if (!this.validator()) {
            this.props.addReceiver(formData)
        }
    }
    render() {
        const { fName, mName, lName, aLine2, aLine1, subUrb, state, zip, country, relation, phone, email, bank, branch, accNumber, remit, district, remitPhone, cashPickup } = this.state
        return (
            <div className="">
                <h1 className="ml-5 mb-10 text-center">Create New Receiver</h1>
                <Divider />
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row row-eq-height">
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                <Label>Receiver Details</Label>
                                <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />
                                <RelationNContact relation={relation} phone={phone} email={email} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />
                                <Label>Receiver Address</Label>
                                <AddressForm aLine1={aLine1} aLine2={aLine2} subUrb={subUrb} zip={zip} state={state} country={country} disabledCountry={true} onChangeValue={this.onChangeValue} disabled={this.props.disabled} sender={false} />
                                <Divider />
                                <Label className='mt-10'>Cash Pickup Details</Label>
                                <AdminBankForm bank={bank} branch={branch} accNumber={accNumber} remit={remit} district={district} remitPhone={remitPhone} onChangeValue={this.onChangeValue} disabled={this.props.disabled} />

                                {!this.props.disabled && <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="d-flex justify-content-center">
                                            <FormGroup className="m-15">
                                                <Button
                                                    className="btn-primary text-white btn-block w-100"
                                                    variant="contained"
                                                    size="large"
                                                    onClick={(e) => this.onSubmit(e)}
                                                >{this.props.disabled == null ? 'Add Receiver' : 'Edit Receiver'}</Button>
                                            </FormGroup>

                                            <FormGroup className="m-15">
                                                <Button
                                                    className="btn-secondary text-white btn-block w-100"
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
            </div>
        )
    }
}