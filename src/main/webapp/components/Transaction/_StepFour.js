/**
 * Stepper 1 Transaction Details
 */
import React, { useState, useEffect } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { FormGroup, Input, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import ReceiverDetails from '../Receiver/ReceiverDetails';
import { Divider } from '@material-ui/core';

const sourceOfFund = ['Salary', 'Business', 'Sales of assets', 'Borrowing']
const purposeTransfer = ['Bill Sharing', 'Family Expense', 'Lend / Borrow', 'Personal Use']

const StepFour = ({ saveData, formData, isError }) => {
    const [selectedPurpose, setSelectedPurpose] = useState('')
    const [selectedSOFunds, setSelectedSOFunds] = useState('')
    const [textPurpose, setTextPurpose] = useState('')
    const [textSOFunds, setTextSOFunds] = useState('')
    const [editableForm, setEditableForm] = useState(false)
    const redirectTo = (e) => {
        /***
         * redirect to edit recipient with recipient id
         */
    }
    useEffect(() => {
        if (formData[2] != null) {
            if (sourceOfFund.includes(formData[2].sourceOfFund)) {
                setSelectedSOFunds(formData[2].sourceOfFund)
            } else {
                setSelectedSOFunds("Others")
                setTextSOFunds(formData[2].sourceOfFund)
            }
            if (purposeTransfer.includes(formData[2].purposeOfTransfer)) {
                setSelectedPurpose(formData[2].purposeOfTransfer)
            } else {
                setSelectedPurpose("Others")
                setTextPurpose(formData[2].purposeOfTransfer)
            }
        }
    }, [])
    const receiver = formData[1];
    return (
        <>
            <div className="row text-center mt-20" >
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <RctCollapsibleCard heading="Receiver Details" fullBlock>
                        <RctCardContent>
                            <ReceiverDetails disabled={!editableForm} userData={receiver} cancel={e => { setEditableForm(false) }} />
                            {!editableForm &&
                                <div className="session-inner-wrapper">
                                    <div className="container">
                                        <Divider />
                                        <div className="row row-eq-height text-center mt-10">
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <Label className={isError && (selectedSOFunds == '' || textSOFunds == '') ? 'text-pink' : ''}>Source of funds*</Label>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        type="select"
                                                        name="sOfFund"
                                                        id="sOfFundSelect"
                                                        bsSize="lg"
                                                        className="input-lg"
                                                        value={selectedSOFunds}
                                                        onChange={(e) => {
                                                            setSelectedSOFunds(e.target.value)
                                                            if (e.target.value != '') {
                                                                setTextSOFunds('')
                                                                saveData({
                                                                    sourceOfFund: e.target.value === "Others" ? '' : e.target.value,
                                                                    purposeOfTransfer: selectedPurpose === "Others" ? textPurpose : selectedPurpose
                                                                })
                                                            }
                                                        }}>
                                                        <option value=''>Select Source of funds</option>
                                                        {
                                                            sourceOfFund.map((data, index) => <option key={index} value={data}>{data}</option>)
                                                        }
                                                        <option value='Others'>Others</option>
                                                    </Input>
                                                </FormGroup>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <Label className={isError && (selectedPurpose == '' || textPurpose == '') ? 'text-pink' : ''}>Purpose Of Transfer*</Label>
                                                <FormGroup className="has-wrapper">
                                                    <Input
                                                        type="select"
                                                        value={selectedPurpose}
                                                        name="purpose"
                                                        bsSize="lg"
                                                        id="purpose"
                                                        className="input-lg"
                                                        placeholder="Purpose*"
                                                        onChange={(e) => {
                                                            setTextPurpose('')
                                                            setSelectedPurpose(e.target.value)
                                                            if (e.target.value != '') {
                                                                saveData({
                                                                    sourceOfFund: selectedSOFunds === "Others" ? textSOFunds : selectedSOFunds,
                                                                    purposeOfTransfer: e.target.value === "Others" ? '' : e.target.value
                                                                })
                                                            }
                                                        }}>
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
                                                            invalid={isError && selectedSOFunds == ''}
                                                            type="text"
                                                            value={textSOFunds}
                                                            name="sofFunds"
                                                            id="sofFunds"
                                                            className="has-input input-lg"
                                                            placeholder="Source of Funds*"
                                                            onChange={(e) => {
                                                                setTextSOFunds(e.target.value)
                                                                saveData({
                                                                    sourceOfFund: e.target.value,
                                                                    purposeOfTransfer: selectedPurpose === "Others" ? textPurpose : selectedPurpose
                                                                })
                                                            }}
                                                        />
                                                    }
                                                </FormGroup>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <FormGroup className="has-wrapper">
                                                    {!(purposeTransfer.includes(selectedPurpose) || selectedPurpose == '') &&
                                                        <Input
                                                            invalid={isError && selectedPurpose == ''}
                                                            type="text"
                                                            value={textPurpose}
                                                            name="purpose"
                                                            id="purpose"
                                                            className="has-input input-lg"
                                                            placeholder="Purpose of Transfer*"
                                                            onChange={(e) => {
                                                                setTextPurpose(e.target.value)
                                                                saveData({
                                                                    purposeOfTransfer: e.target.value,
                                                                    sourceOfFund: selectedSOFunds === "Others" ? textSOFunds : selectedSOFunds
                                                                })
                                                            }}
                                                        />
                                                    }
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </RctCardContent>
                        <div className="text-right m-10">
                            <Button
                                disabled={editableForm}
                                className="mr-10 mb-10 btn-icon"
                                color="secondary" size="lg"
                                onClick={e => {
                                    setEditableForm(true)
                                }}>
                                <i className="zmdi zmdi-edit"></i> Edit Recipient
                        </Button>
                        </div>
                    </RctCollapsibleCard>
                </div>
            </div>
        </>

    )
}

export default StepFour;
