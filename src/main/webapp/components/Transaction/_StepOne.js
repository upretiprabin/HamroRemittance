/**
 * Stepper 1 Transaction Details
 */
import React, { useState, useEffect } from 'react';

// rct card box

import Select from "../Select/Select";
import { Form, FormGroup, Input, Label } from 'reactstrap';

const StepOne = ({ saveData, countries, isError, formData }) => {
    const [ratesAndFees, setRatesAndFees] = useState({
        rate: 0,
        fees: 0
    })
    const [sendAmount, setSendAmount] = useState('')
    const [receiveAmount, setReceiveAmount] = useState('')
    useEffect(() => {
        setRatesAndFees(
            countries[0] ?
                {
                    rate: countries[0].rate,
                    fees: countries[0].fees
                } :
                {
                    rate: 0,
                    fees: 0
                })
    }, [countries]);
    useEffect(() => {
        if (formData[0] != null) {
            setSendAmount(formData[0].send)
            setReceiveAmount(formData[0].receive)
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
        const conversionData = ratesAndFees
        var send, receive
        if (target == 'send') {
            send = amount
            receive = Math.floor((amount * conversionData.rate) * 100) / 100
            setReceiveAmount(receive)
            setSendAmount(amount == 0 ? '' : amount)
        }
        if (target == "receive") {
            receive = amount
            send = Math.ceil((amount / conversionData.rate) * 100) / 100
            setSendAmount(send)
            setReceiveAmount(amount == 0 ? '' : amount)
        }
        saveData({ send: send, receive: receive, ...ratesAndFees })
    }
    return (
        <div className="col-md-12 d-flex align-items-center">
            <div className="container my-4">

                <Form>
                    <div className="row">
                        <div className="col-11 col-lg-6 mx-auto">
                            <div className={"send-money ml-5"}>
                                <FormGroup className={"text-left"}>
                                    <Label for="recipientGets" className={isError ? "text-danger" : ""}>You Send</Label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">$</span>
                                        </div>
                                        <Input invalid={isError} className={"w-50"} type="text" name="youSend" id="youSend" value={sendAmount} onChange={e => handleAmountChange(e, 'send')} />
                                        < div className="aud input-group-append select-country">
                                            <Select
                                                optionList={[
                                                    {
                                                        'id': 1,
                                                        'name': 'AUD'
                                                    }
                                                ]}
                                                selection={"AUD"}
                                            />
                                        </div>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="col-11 col-lg-6 mx-auto">
                            <div className={"send-money ml-5"}>
                                <FormGroup className={"text-left"}>
                                    <Label for="recipientGets" className={isError ? "text-danger" : ""}>Recipient Gets</Label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Rs.</span>
                                        </div>
                                        <Input invalid={isError} className={"w-50"} type="text" name="recipientGets" id="recipientGets" value={receiveAmount} onChange={e => handleAmountChange(e, 'receive')} />
                                        <div className="input-group-append">
                                            <Select
                                                optionList={[
                                                    {
                                                        'id': 1,
                                                        'name': 'NPR'
                                                    }
                                                ]}
                                                selection={"NPR"}
                                            />
                                        </div>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <p className="mb-1 text-center">Total fees : <span className="font-weight-500">{ratesAndFees.fees} AUD</span></p>
                    <p className="mb-1 text-center">The current exchange rate is <span className="font-weight-500">1 AUD = {ratesAndFees.rate} NPR</span></p>
                    <p className="mb-1 text-center">You pay : <span className="font-weight-500">{sendAmount == "" ? 0 : sendAmount + ratesAndFees.fees} AUD</span></p>
                </Form>
            </div>
        </div>
    )
}
export default StepOne;
