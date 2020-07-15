import React from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';
import banks from './banks.json'
const branches = ['Branch A', 'Branch B', 'Branch C', 'Branch D', 'Branch E', 'Branch F', 'Branch G']

const BankForm = ({ bank, branch, accNumber, disabled, onChangeValue }) => {
    return (
        <>
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
                            {
                                banks.map((bank, index) => <option key={index} value={bank}>{bank}</option>)
                            }
                        </Input>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={branch.error}
                            type="select"
                            value={branch.value}
                            name="branch"
                            id="bank-branch"
                            className="has-input input-lg"
                            disabled={disabled}
                            bsSize="lg"
                            onChange={(e) => onChangeValue(e)}
                        >
                            <option value=''>Select Branch*</option>
                            {
                                branches.map((branch, index) => <option key={index} value={branch}>{branch}</option>)
                            }
                        </Input>
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
                            disabled={disabled}
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