/**
 * Stepper 2 Payment and Amount Details
 */
import React, { useState, useRef, Fragment, useEffect } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Input, FormGroup, Table, TableBody, TableRow, TableCell, } from '@material-ui/core';
import { Form, Label, Toast } from 'reactstrap';

const StepTwo = ({ saveData, formData, isError }) => {
    const [sendAmount, setSendAmount] = useState('')
    const [recieveAmount, setRecieveAmount] = useState('')

    useEffect(() => {
        if (formData[1] != null) {
            handleAmountChange({ target: { value: formData[1].send } }, 'send')
        }
    }, [])

    const handleAmountChange = (e, target) => {
        let amount = e.target.value

        if (!Number(amount) && amount != '') {
            return;
        }
        calcRates(amount, target);
    }
    const calcRates = (amount, target) => {
        amount = amount == "" ? 0 : parseFloat(amount)
        const conversionData = formData[0]
        var send, recieve
        if (target == 'send') {
            send = amount
            recieve = Math.floor((amount * conversionData.rate) * 100) / 100
            setRecieveAmount(recieve)
            setSendAmount(amount == 0 ? '' : amount)
        }
        if (target == "recieve") {
            recieve = amount
            send = Math.ceil((amount / conversionData.rate) * 100) / 100
            setSendAmount(send)
            setRecieveAmount(amount == 0 ? '' : amount)
        }
        saveData({ send: send, recieve: recieve })
    }
    const txnData = {
        send: `${sendAmount != '' ? sendAmount : 0} AUD`,
        recieve: `${recieveAmount != '' ? recieveAmount : 0} ${formData[0].currency}`,
        rate: `1 AUD = ${formData[0].rate} ${formData[0].currency}`,
        toPay: `${(sendAmount == '' ? 0 : (parseFloat(sendAmount) + parseFloat(formData[0].fees)).toFixed(2))} AUD`,
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
                                        error={isError}
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
                                        error={isError}
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
