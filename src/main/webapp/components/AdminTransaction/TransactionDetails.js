import React, { useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap';

const sourceOfFund = ['Salary', 'Business', 'Sales of assets', 'Borrowing']
const purposeTransfer = ['Bill Sharing', 'Family Expense', 'Lend / Borrow', 'Personal Use']

const TransactionDetails = ({ saveData }) => {
    const [selectedPurpose, setSelectedPurpose] = useState('')
    const [selectedSOFunds, setSelectedSOFunds] = useState('')
    const [textPurpose, setTextPurpose] = useState('')
    const [textSOFunds, setTextSOFunds] = useState('')

    const onChangeValue = (e) => {
        let data
        if (e.target.id == 'sOfFundSelect') {
            setSelectedSOFunds(e.target.value)
            if (e.target.value != '') {
                setTextSOFunds('')
                data = {
                    sourceOfFund: e.target.value === "Others" ? '' : e.target.value,
                    purposeOfTransfer: selectedPurpose === "Others" ? textPurpose : selectedPurpose
                }
            }
        }
        if (e.target.id == 'sofFunds') {
            setTextSOFunds(e.target.value)
            data = {
                sourceOfFund: e.target.value,
                purposeOfTransfer: selectedPurpose === "Others" ? textPurpose : selectedPurpose
            }
        }
        if (e.target.id == 'purposeSelect') {
            setTextPurpose('')
            setSelectedPurpose(e.target.value)
            if (e.target.value != '') {
                data = {
                    sourceOfFund: selectedSOFunds === "Others" ? textSOFunds : selectedSOFunds,
                    purposeOfTransfer: e.target.value === "Others" ? '' : e.target.value
                }
            }
        }
        if (e.target.id == 'purpose') {
            setTextPurpose(e.target.value)
            data = {
                purposeOfTransfer: e.target.value,
                sourceOfFund: selectedSOFunds === "Others" ? textSOFunds : selectedSOFunds
            }
        }
        if (data.sourceOfFund !== '' && data.purposeOfTransfer !== "") {
            saveData(data, 3)
        }
    }
    return (
        <div>
            <h4>Transaction Details</h4>
            <div className="session-inner-wrapper">
                <div className="container">
                    <div className="row row-eq-height text-center mt-10">
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <Label>Source of funds*</Label>
                            <FormGroup className="has-wrapper">
                                <Input
                                    type="select"
                                    name="sOfFund"
                                    id="sOfFundSelect"
                                    bsSize="lg"
                                    className="input-lg"
                                    value={selectedSOFunds}
                                    onChange={(e) => onChangeValue(e)}>
                                    <option value=''>Select Source of funds</option>
                                    {
                                        sourceOfFund.map((data, index) => <option key={index} value={data}>{data}</option>)
                                    }
                                    <option value='Others'>Others</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <Label >Purpose Of Transfer*</Label>
                            <FormGroup className="has-wrapper">
                                <Input
                                    type="select"
                                    value={selectedPurpose}
                                    name="purpose"
                                    bsSize="lg"
                                    id="purposeSelect"
                                    className="input-lg"
                                    placeholder="Purpose*"
                                    onChange={(e) => onChangeValue(e)}>
                                    <option value=''>Select Purpose of Transfer</option>
                                    {
                                        purposeTransfer.map((data, index) => <option key={index} value={data}>{data}</option>)
                                    }
                                    <option value='Others'>Others</option>
                                </Input>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row row-eq-height text-center">
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <FormGroup className="has-wrapper">
                                {!(sourceOfFund.includes(selectedSOFunds) || selectedSOFunds == '') &&
                                    <Input
                                        type="text"
                                        value={textSOFunds}
                                        name="sofFunds"
                                        id="sofFunds"
                                        className="has-input input-lg"
                                        placeholder="Source of Funds*"
                                        onChange={(e) => onChangeValue(e)}
                                    />
                                }
                            </FormGroup>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <FormGroup className="has-wrapper">
                                {!(purposeTransfer.includes(selectedPurpose) || selectedPurpose == '') &&
                                    <Input
                                        type="text"
                                        value={textPurpose}
                                        name="purpose"
                                        id="purpose"
                                        className="has-input input-lg"
                                        placeholder="Purpose of Transfer*"
                                        onChange={(e) => onChangeValue(e)}
                                    />
                                }
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetails