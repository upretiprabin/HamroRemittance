
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import Controller from './../../controllers/adminTransactionController'

const AmountDetails = ({ saveData }) => {
    const [companyCharges, setCompanyCharges] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sendAmount, setSendAmount] = useState('')
    const [receiveAmount, setReceiveAmount] = useState('')
    const [discount, setDiscount] = useState('')
    useEffect(() => {
        Controller.getTransactionRates({ setLoading, setCompanyCharges })
    }, [])
    const handleDiscountChange = (e) => {
        setDiscount(e.target.value, saveIfValid(sendAmount,receiveAmount))
    }
    const handleAmountChange = (e, target) => {
        let amount = e.target.value

        if (!Number(amount) && amount != '') {
            return;
        }
        calcRates(amount, target);
    }
    const calcRates = (amount, target) => {
        amount = amount == "" ? 0 : parseFloat(amount)
        const conversionData = companyCharges
        var send, receive
        if (target == 'send') {
            send = amount
            receive = Math.floor((amount * conversionData.exchangeRate) * 100) / 100
            setReceiveAmount(receive)
            setSendAmount(amount == 0 ? '' : amount, saveIfValid(send, receive))
        }
        if (target == "receive") {
            receive = amount
            send = Math.ceil((amount / conversionData.exchangeRate) * 100) / 100
            setSendAmount(send)
            setReceiveAmount(amount == 0 ? '' : amount, saveIfValid(send,receive))
        }
    }
    const saveIfValid = (sendAmount,receiveAmount) => {
        if (validate(sendAmount)) {
            saveData({
                send: sendAmount,
                receive: receiveAmount,
                discount: discount == '' ? 0 : parseInt(discount),
                ...companyCharges
            }, 1)
        }
    }
    const validate = (sendAmount) => {
        if (sendAmount == '' || sendAmount == 0) return false
        return true
    }
    return (
        <div>
            <h4>Amount Details</h4>
            <div className="col-md-12 d-flex align-items-center">
                <div className="container my-4">
                    <Form>
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <div className={"send-money ml-5"}>
                                    <FormGroup className={"text-left"}>
                                        <Label for="serviceCharge">Tax</Label>
                                        <div className="input-group d-flex flex-row">
                                            <Input className={"w-50"} type="number" name="serviceCharge" id="serviceCharge" value={companyCharges ? companyCharges.taxPercentage : 0} disabled />
                                            <div className="input-group-append">
                                                <span className="input-group-text" style={{ width: "45px" }}>%</span>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <div className={"send-money ml-5"}>
                                    <FormGroup className={"text-left"}>
                                        <Label for="discount" >Discount</Label>
                                        <div className="input-group d-flex flex-row">
                                            <Input className={"w-50"} type="number" name="discount" id="discount" value={discount} onChange={e => handleDiscountChange(e)} />
                                            <div className="input-group-append">
                                                <span className="input-group-text" style={{ width: "45px" }}>%</span>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <div className={"send-money ml-5"}>
                                    <FormGroup className={"text-left"}>
                                        <Label for="recipientGets">Send Amount</Label>
                                        <div className="input-group d-flex flex-row">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" style={{ width: "45px" }}>$</span>
                                            </div>
                                            <Input className={"w-50"} type="number" name="youSend" id="youSend" value={sendAmount} onChange={e => handleAmountChange(e, 'send')} />
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <div className={"send-money ml-5"}>
                                    <FormGroup className={"text-left"}>
                                        <Label for="recipientGets" >Receive Amount</Label>
                                        <div className="input-group d-flex flex-row">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" style={{ width: "45px" }}>Rs.</span>
                                            </div>
                                            <Input className={"w-50"} type="number" name="recipientGets" id="recipientGets" value={receiveAmount} onChange={e => handleAmountChange(e, 'receive')} />
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div >
        </div>
    )
}
export default AmountDetails;
