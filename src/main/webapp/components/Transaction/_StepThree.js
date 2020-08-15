/**
 * Stepper 1 Transaction Details
 */
import React, { useState, useEffect } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Tabs, Tab } from '@material-ui/core';
import ReceiverDetails from '../Receiver/ReceiverDetails'


const StepThree = ({ saveData, receiverInfo, isError, addReceiver, formData }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [selected, setSelected] = useState('')
    const postData = data => {
        addReceiver(data)
    }
    useEffect(() => {
        setActiveIndex(0)
    }, [receiverInfo])
    useEffect(() => {
        if (formData[2] != null) {
            setSelected(formData[2]._id)
            setActiveIndex(0)
        }
    }, [])
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
                <Tab label="Select Receiver" />
                <Tab label="Add Receiver" />
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
                                                <Label className={isError ? 'text-pink' : ''}>Receiver</Label>
                                                <Input className="mb-20" type="select" bsSize="lg"
                                                    value={selected}
                                                    onChange={e => {
                                                        setSelected(e.target.value)
                                                        const selectedRecipient = receiverInfo.find(data => {
                                                            return data._id == e.target.value
                                                        })
                                                        if (selectedRecipient != null) {
                                                            saveData(selectedRecipient)
                                                        }
                                                    }}>
                                                    <option value=''>Please Select Recipient</option>
                                                    {receiverInfo && receiverInfo.map((data, index) =>
                                                        (<option key={index} value={data._id}>{`${data.name.fName} ${data.name.mName} ${data.name.lName}`}</option>)
                                                    )}
                                                </Input>
                                            </FormGroup>
                                        </Form>
                                        <Button
                                            className="mr-10 mb-10 btn-icon"
                                            color="secondary" size="lg"
                                            onClick={e => {
                                                setActiveIndex(1)
                                            }}>
                                            <i className="zmdi zmdi-account-add" /> Add Recipient
                                            </Button>
                                    </div>
                                </div>
                            </RctCardContent>

                        </div>
                    </div>)
                }
                {activeIndex === 1 && <RctCardContent><ReceiverDetails addReceiver={postData} cancel={() => setActiveIndex(0)} /></RctCardContent>}
            </RctCollapsibleCard>
        </>

    )
}

export default StepThree;
