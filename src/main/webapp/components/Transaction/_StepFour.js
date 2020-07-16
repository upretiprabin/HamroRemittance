/**
 * Stepper 1 Transaction Details
 */
import React, { useState, useEffect } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { FormGroup, Input, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import RecieverDetails from '../Reciever/RecieverDetails';
import { Divider } from '@material-ui/core';

const sorceOfFund = ['Salary', 'Business', 'Sales of assets', 'Borrowing', 'Other']

const StepFour = ({ saveData, formData, isError }) => {
    const [selectedPurpose, setSelectedPurpose] = useState('')
    const [selectedSOFunds, setSelectedSOFunds] = useState('')
    const [editableForm, setEditableForm] = useState(false)
    const redirectTo = (e) => {
        /***
         * redirect to edit recipient with recipient id
         */
    }
    useEffect(() => {
        if (formData[3] != null) {
            setSelectedSOFunds(formData[3].sorceOfFund)
            setSelectedPurpose(formData[3].purposeOfTransfer)
        }
    }, [])
    const reciever = formData[2];
    return (
        <>
            <div className="row text-center" >
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <RctCollapsibleCard heading="Reciever Details" fullBlock>
                        <RctCardContent>
                            <RecieverDetails disabled={!editableForm} userData={reciever} cancel={e => { setEditableForm(false) }} />
                            {!editableForm &&
                                <div className="session-inner-wrapper">
                                    <div className="container">
                                        <Divider />
                                        <div className="row row-eq-height text-center mt-10">
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <Label className={isError && selectedSOFunds == '' ? 'text-pink' : ''}>Source of funds*</Label>
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
                                                                saveData({
                                                                    sorceOfFund: e.target.value,
                                                                    purposeOfTransfer: selectedPurpose
                                                                })
                                                            }
                                                        }}>
                                                        <option value=''>Select Source of funds</option>
                                                        {
                                                            sorceOfFund.map((data, index) => <option key={index} value={data}>{data}</option>)
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <Label className={isError && selectedPurpose == '' ? 'text-pink' : ''}>Purpose Of Transfer*</Label>
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
                                                            setSelectedPurpose(e.target.value)
                                                            if (e.target.value != '') {
                                                                saveData({
                                                                    sorceOfFund: selectedSOFunds,
                                                                    purposeOfTransfer: e.target.value
                                                                })
                                                            }
                                                        }}>
                                                        <option value=''>Select Purpose of Transfer</option>
                                                        <option value="Bill Sharing">Bill Sharing</option>
                                                        <option value="Family Expenses">Family Expenses</option>
                                                        <option value="Lend / Borrow">Lend / Borrow</option>
                                                        <option value="Personal Use">Personal Use</option>
                                                        <option value="Others">Others</option>
                                                    </Input>
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
                                color="info" size="lg"
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
