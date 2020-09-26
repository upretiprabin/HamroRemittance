import React, { useState, useEffect } from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';
import banks from './banks.json'

const AdminBankForm = ({ remit, district, remitPhone, bank, branch, accNumber, disabled, onChangeValue }) => {
    const [selectedCashPickup, setSelectedCashPickup] = useState(0)
    useEffect(() => {
        if (disabled !== null && disabled == true) {
            setSelectedCashPickup(1)
        }
    }, [])
    const onChangeCashPickup = (e) =>{
        onChangeValue(e)
        setSelectedCashPickup(e.target.value)
    }
    return (
        <>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <FormGroup className="has-wrapper">
                        <Input
                            disabled={disabled}
                            value={selectedCashPickup}
                            name="cashPickup"
                            id="cashPickUp"
                            className="has-input input-lg"
                            type="select"
                            bsSize="lg"
                            onChange={(e) => onChangeCashPickup(e)}>
                            <option value='0'>Select Cash PickUp Type*</option>
                            <option value='1'>Bank Transfer</option>
                            <option value='2'>Local Remit</option>
                        </Input>
                    </FormGroup>
                </div>
            </div>
            {
                selectedCashPickup == 1 &&
                <div className='row mt-10'>
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        <FormGroup className="has-wrapper">
                            <Input
                                invalid={bank.error}
                                value={bank.value}
                                name="bank"
                                id="bank-name"
                                className="has-input input-lg"
                                disabled={disabled}
                                type="select"
                                bsSize="lg"
                                onChange={(e) => onChangeValue(e)}>
                                <option value=''>Select Bank*</option>
                                <option value={banks[0].type} className="text-danger" disabled>{banks[0].type.toUpperCase()}</option>
                                {
                                    banks[0].banks.sort().map((bank, index) => <option key={index} value={bank}>{bank}</option>)
                                }

                                <option value={banks[1].type} className="text-danger" disabled>{banks[1].type.toUpperCase()}</option>
                                {
                                    banks[1].banks.sort().map((bank, index) => <option key={index} value={bank}>{bank}</option>)
                                }
                                <option value={banks[2].type} className="text-danger" disabled>{banks[2].type.toUpperCase()}</option>
                                {
                                    banks[2].banks.sort().map((bank, index) => <option key={index} value={bank}>{bank}</option>)
                                }
                                <option value={banks[3].type} className="text-danger" disabled>{banks[3].type.toUpperCase()}</option>
                                {
                                    banks[3].banks.sort().map((bank, index) => <option key={index} value={bank}>{bank}</option>)
                                }
                            </Input>
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        <FormGroup className="has-wrapper">
                            <Input
                                invalid={branch.error}
                                type="text"
                                value={branch.value}
                                name="branch"
                                id="bank-branch"
                                placeholder="Branch*"
                                className="has-input input-lg"
                                disabled={disabled}
                                bsSize="lg"
                                onChange={(e) => onChangeValue(e)}
                            >
                            </Input>
                            <span className="has-icon"><i className="zmdi zmdi-arrow-split"></i></span>
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        <FormGroup className="has-wrapper">
                            <Input
                                invalid={accNumber.error}
                                type="text"
                                value={accNumber.value}
                                name="accNumber"
                                id="account-number"
                                className="has-input input-lg"
                                placeholder="Account Number*"
                                disabled={disabled}
                                onChange={(e) => onChangeValue(e)}
                            />
                            <span className="has-icon"><i className="zmdi zmdi-pin-account"></i></span>
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </div>
                </div>
            }
            {
                selectedCashPickup == 2 &&
                <div className='row mt-10'>
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        <FormGroup className="has-wrapper">
                            <Input
                                invalid={remit.error}
                                type="text"
                                value={remit.value}
                                name="remit"
                                id="remit-name"
                                className="has-input input-lg"
                                placeholder="Remit Name*"
                                disabled={disabled}
                                onChange={(e) => onChangeValue(e)}
                            />
                            <span className="has-icon"><i className="zmdi zmdi-store"></i></span>
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        <FormGroup className="has-wrapper">
                            <Input
                                invalid={district.error}
                                type="text"
                                value={district.value}
                                name="district"
                                id="remit-district"
                                className="has-input input-lg"
                                placeholder="District*"
                                disabled={disabled}
                                onChange={(e) => onChangeValue(e)}
                            />
                            <span className="has-icon"><i className="zmdi zmdi-my-location"></i></span>
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        <FormGroup className="has-wrapper">
                            <Input
                                invalid={remitPhone.error}
                                type="number"
                                value={remitPhone.value}
                                name="remitPhone"
                                id="remit-phone"
                                className="has-input input-lg"
                                placeholder="Remit Phone Number*"
                                disabled={disabled}
                                onChange={(e) => onChangeValue(e)}
                            />
                            <span className="has-icon"><i className="zmdi zmdi-phone"></i></span>
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </div>
                </div>
            }

        </>
    )
}
export default AdminBankForm