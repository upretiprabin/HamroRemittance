/**
 * Stepper 2 Payment and Amount Details
 */
import React, { useState, useRef, Fragment } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Input, FormGroup, Table, TableBody, TableRow, TableCell, } from '@material-ui/core';
import { Form, Label, Toast } from 'reactstrap';

const StepTwo = ({ saveData, formData }) => {
    const [sendAmount, setSendAmount] = useState('')
    const [recieveAmount, setRecieveAmount] = useState('')
    const handleAmountChange = (e, target) => {
        let amount = e.target.value

        if (!Number(amount) && amount != '') {
            return;
        }
        calcRates(amount, target);
    }
    const calcRates = (amount, target) => {
        amount = amount == "" ? 0 : parseInt(amount)
        const conversionData = formData[0]
        if (target == 'send') {
            setRecieveAmount((amount * conversionData.rate).toFixed(2))
            setSendAmount(amount == 0 ? '' : amount)
        }
        if (target == "recieve") {
            setSendAmount((amount / conversionData.rate).toFixed(2))
            setRecieveAmount(amount == 0 ? '' : amount)
        }
    }
    const txnData = {
        send: `${sendAmount != '' ? sendAmount : 0} AUD`,
        recieve: `${recieveAmount != '' ? recieveAmount : 0} ${formData[0].currency}`,
        rate: `1 AUD = ${formData[0].rate} ${formData[0].currency}`,
        toPay: `${(parseFloat(sendAmount == '' ? 0 : sendAmount) + parseFloat(formData[0].fees)).toFixed(2)} AUD`,
        fee: `${formData[0].fees} AUD`,
    }
    return (
        <>
            <div className="row text-center" >
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <RctCardContent>
                        <div className='current-widget bg-primary'>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleNumber">Send Amount</Label>
                                    <Input
                                        type="number"
                                        placeholder="Amount to Send"
                                        value={sendAmount}
                                        onChange={e => handleAmountChange(e, 'send')}>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </div>
                    </RctCardContent>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <RctCardContent>
                        <div className='current-widget bg-success'>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleNumber">Recieve Amount</Label>
                                    <Input
                                        type="number"
                                        placeholder="Amount to Recieve"
                                        value={recieveAmount}
                                        onChange={e => handleAmountChange(e, 'recieve')}>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </div>
                    </RctCardContent>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <RctCollapsibleCard heading="Transaction Details" fullBlock className=''>
                        <div className="table-responsive">
                            <Table>
                                <TableBody>
                                    <Fragment>
                                        <TableRow>
                                            <TableCell align="center"><b>You Send: </b></TableCell>
                                            <TableCell align="center">{txnData.send}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center"><b>Rate: </b></TableCell>
                                            <TableCell align="center">{txnData.rate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center"><b>Reciever Gets: </b></TableCell>
                                            <TableCell align="center">{txnData.recieve}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center"><b>Fee: </b></TableCell>
                                            <TableCell align="center">{txnData.fee}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center"><b>You Pay: </b></TableCell>
                                            <TableCell align="center">{txnData.toPay}</TableCell>
                                        </TableRow>
                                    </Fragment>
                                </TableBody>
                            </Table>
                        </div>
                    </RctCollapsibleCard>
                </div>
            </div>
        </>
    )
}

export default StepTwo;
