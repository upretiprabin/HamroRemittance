import React from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';

const BankForm = ({ bank, branch, accNumber, onChangeValue }) => {
    return (
        <>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={bank.error}
                            type="text"
                            value={bank.value}
                            name="bank"
                            id="bank-name"
                            className="has-input input-lg"
                            placeholder="Bank Name*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="zmdi zmdi-home"></i></span>
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
                            className="has-input input-lg"
                            placeholder="Branch*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="zmdi zmdi-arrow-split"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={accNumber.error}
                            type="number"
                            value={accNumber.value}
                            name="accNumber"
                            id="account-number"
                            className="has-input input-lg"
                            placeholder="Account Number*"
                            onChange={(e) => {
                                if (Number(e.target.value) || e.target.value == '' || e.target.value == "0")
                                    onChangeValue(e)
                            }}
                        />
                        <span className="has-icon"><i className="zmdi zmdi-pin-account"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
            </div>
        </>
    )
}
export default BankForm