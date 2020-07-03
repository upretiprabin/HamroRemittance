/**
 * Stepper 1 Transaction Details
 */
import React, { useState } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


const StepOne = ({ saveData }) => {
    const redirectTo = id => {
        /***
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
                                        <Label>Reciever</Label>
                                        <Input className="mb-20" type="select" bsSize="lg">
                                            <option value=''>Please Select Recipient</option>
                                            <option>Large Select</option>
                                            <option>Large Select</option>
                                            <option>Large Select</option>
                                            <option>Large Select</option>
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
