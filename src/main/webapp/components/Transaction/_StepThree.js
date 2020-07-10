/**
 * Stepper 1 Transaction Details
 */
import React, { useState } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


const StepOne = ({ saveData, recieverInfo, isError }) => {
    const redirectTo = id => {
        /***
         * TODO
         * Redirect to add Recipient and dispatch and save current form data to store
         */
    }
    return (
        <>
            <div className='row text-center'>
                <div className='col-sm-12 col-md-12 col-lg-12 d-flex justify-content-around'>
                    <RctCardContent>
                        <div className="d-flex justify-content-around">
                            <div className="form-group">
                                <Form>
                                    <FormGroup>
                                        <Label className={isError ? 'text-pink' : ''}>Reciever</Label>
                                        <Input className="mb-20" type="select" bsSize="lg" onChange={e => {
                                            const selectedRecipient = recieverInfo.find(data => {
                                                return data._id == e.target.value
                                            })
                                            if (selectedRecipient != null) {
                                                saveData(selectedRecipient)
                                            }
                                        }}>
                                            <option value=''>Please Select Recipient</option>
                                            {recieverInfo.map((data, index) =>
                                                (<option key={index} value={data._id}>{`${data.name.fName} ${data.name.mName} ${data.name.lName}`}</option>)
                                            )}
                                        </Input>
                                    </FormGroup>
                                </Form>
                                <Button
                                    className="mr-10 mb-10 btn-icon"
                                    color="info" size="lg"
                                    onClick={e => {
                                        redirectTo('addReciepienet')
                                    }}>
                                    <i className="zmdi zmdi-account-add"></i> Add Recipient
                            </Button>
                            </div>
                        </div>
                    </RctCardContent>
                </div>
            </div>
        </>

    )
}

export default StepOne;
