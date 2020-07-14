/**
 * Stepper 1 Transaction Details
 */
import React, { useState } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Tabs, Tab } from '@material-ui/core';
import RecieverDetails from '../Reciever/RecieverDetails'


const StepOne = ({ saveData, recieverInfo, isError, addReceiver }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const postData = data => {
        addReceiver(data)
    }
    return (
        <>
            <Tabs
                value={activeIndex}
                onChange={(e, value) => {
                    setActiveIndex(value)
                }}
                textColor="primary"
                indicatorColor="primary"
                centered>
                <Tab label="Select Reciever" />
                <Tab label="Add Reciever" />
            </Tabs>
            <RctCollapsibleCard customClasses="mark">
                {activeIndex === 0 && (
                    <div className='row text-center'>
                        <div className='col-sm-12 col-md-12 col-lg-12'>
                            <RctCardContent>
                                <div className="d-flex justify-content-around">
                                    <div className="form-group">
                                        <Form>
                                            <FormGroup>
                                                <Label className={isError ? 'text-pink' : ''}>Reciever</Label>
                                                <Input className="mb-20" type="select" bsSize="lg"
                                                    onChange={e => {
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
                                                setActiveIndex(1)
                                            }}>
                                            <i className="zmdi zmdi-account-add"></i> Add Recipient
                                            </Button>
                                    </div>
                                </div>
                            </RctCardContent>

                        </div>
                    </div>)
                }
                {activeIndex === 1 && <RctCardContent><RecieverDetails addReciver={postData} cancel={() => setActiveIndex(0)} /></RctCardContent>}
            </RctCollapsibleCard>
        </>

    )
}

export default StepOne;
