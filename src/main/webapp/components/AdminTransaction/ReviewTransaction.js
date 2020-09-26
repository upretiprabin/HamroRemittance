import React, { useEffect, useState } from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { Email, EmailOutlined } from '@material-ui/icons'
import Formatter from './../../util/Formatter'

const ReviewTransaction = ({ saveData, formData, saveTransaction, loader }) => {
    const [transactionDetails, setTransactionDetails] = useState({
        send: 0,
        receive: 0,
        rate: 0,
        fee: 0,
        discount: 0,
        tax: 0,
        toPay: 0,
    })
    const [transactionData, setTransactionData] = useState({
        trn: '',
        emailInvoice: false
    })
    useEffect(() => {
        if (formData) {
            var toPay = calculate();
            setTransactionDetails({
                send: formData[1].send,
                receive: formData[1].receive,
                rate: formData[1].exchangeRate,
                fee: formData[1].serviceCharge,
                discount: formData[1].discount,
                tax: formData[1].taxPercentage,
                toPay: toPay,
            })
        }
    }, [formData])
    const calculate = () => {
        if (formData) {
            let toPay = formData[1].send + formData[1].serviceCharge
            toPay = toPay - toPay * formData[1].discount / 100
            toPay = toPay + toPay * formData[1].taxPercentage / 100
            return Math.ceil(toPay * 100) / 100
        }
        return 0
    }
    const changeValue = (event) => {
        var data = null
        if (event.target.id == 'trn')
            data = { trn: event.target.value, emailInvoice: transactionData.emailInvoice }
        if (event.target.id == 'invoice')
            data = { trn: transactionData.trn, emailInvoice: !transactionData.emailInvoice }
        setTransactionData(data)
        saveData(data, 5)
    }
    const sender = formData ? formData[0] : { firstName: '', lastName: '', emailAddress: '' }
    const receiver = formData ? formData[2].receiver : { firstName: '', lastName: '', emailAddress: '' }
    return (
        <div>
            <h4>Review Transaction</h4>
            <div className="table-responsive mb-40">
                <table className="table">
                    <thead>
                        <tr align="center">
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <td>Sender: <b>{sender.firstName} {sender.lastName}</b> ({sender.emailAddress})</td>
                            <td>{Formatter.currencyFormatter(transactionDetails.send)} AUD</td>
                        </tr>
                        <tr align="center">
                            <td>Receiver: <b>{receiver.firstName} {receiver.lastName}</b> ({receiver.emailAddress})</td>
                            <td>{Formatter.currencyFormatter(transactionDetails.receive).substr(1)} NRS</td>
                        </tr>
                        <tr align="center">
                            <td>Rate</td>
                            <td className="text-gray fw-bold">{transactionDetails.rate}</td>
                        </tr>
                        <tr align="center">
                            <td>Discount</td>
                            <td className="text-success">{transactionDetails.discount}%</td>
                        </tr>
                        <tr align="center">
                            <td>Fees</td>
                            <td className="text-danger">{Formatter.currencyFormatter(transactionDetails.fee)} AUD</td>
                        </tr>
                        <tr align="center">
                            <td>Tax</td>
                            <td className="text-danger">{transactionDetails.tax}%</td>
                        </tr>
                        <tr align="center">
                            <td className="fw-bold">To Pay</td>
                            <td className="fw-bold">{Formatter.currencyFormatter(transactionDetails.toPay)} AUD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='row m-10'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <TextField id="trn" label="TRN" variant="outlined" value={transactionData.trn} onChange={e => changeValue(e)} />
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <FormControlLabel
                            control={<Checkbox
                                icon={<EmailOutlined />}
                                checkedIcon={<Email />}
                                name="checkedH"
                                color="primary"
                                id="invoice"
                                checked={transactionData.emailInvoice}
                                onChange={changeValue} />}
                            label="Email receipt to sender?"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="contained" size='large' color={loader ? "default" : "primary"} onClick={e => saveTransaction(transactionDetails.toPay)}>{loader ? "Please Wait..." : 'Confirm Transaction'}</Button>
                </div>
            </div>
        </div>
    )
}
export default ReviewTransaction