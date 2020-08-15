/**
 * Stepper 1 Transaction Details
 */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
// rct card
import { RctCard } from 'Components/RctCard/index';
import Controller from '../../controllers/transactionController'
import { CircularProgress } from '@material-ui/core';
import Formatter from './../../util/Formatter'
import AlertDialogSlide from '../Dialogs/AlertDialog';

const StepFive = ({ saveData, selectedData }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [ratesAndAmount, recipient, purpose] = selectedData
    const [isLoading, setIsLoading] = useState(false);
    const [senderInfo, setSenderInfo] = useState({
        addressLineOne: "",
        addressLineTwo: "",
        country: "",
        emailAddress: "",
        firstName: "",
        middleName: "",
        stateProvince: "",
        suburbCity: "",
        zipCode: ""
    })

    useEffect(() => {
        Controller.getSenderDetails({ setIsLoading, setSenderInfo })
    }, [])
    const transactionDetails = {
        send: `${ratesAndAmount.send}`,
        receive: `${ratesAndAmount.receive}`,
        rate: `1 AUD = ${ratesAndAmount.rate} NRS`,
        toPay: `${ratesAndAmount.send + ratesAndAmount.fees}`,
        fee: `${ratesAndAmount.fees}`,
    }
    const confirmTransaction = () => {
        setDialogOpen(true)
    }
    const submitForm = () => {
        setDialogOpen(false)
        let formData = {
            "sendMoneyTo": 'Nepal',
            "receiverEmailAddress": selectedData[1].email,
            "subTotal": selectedData[0].send,
            "total": selectedData[0].send + selectedData[0].fees,
            "exchangedTotal": selectedData[0].receive,
            "currency": "AUD",
            "transactionReason": selectedData[2].purposeOfTransfer,
            "sourceOfFund": selectedData[2].sourceOfFund,
            "cashPickUpId": 1 //TODO:: change later to cashPickUpId from receiverDetails
        };
        Controller.postData({ setIsLoading, saveData }, formData)
    }
    return (
        <div className="invoice-wrapper">
            {isLoading &&
                <div className="page-loader d-flex justify-content-center mb-30">
                    <CircularProgress />
                </div>
            }
            {
                !isLoading &&
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-xl-10 mx-auto">
                        <RctCard>
                            <div className="invoice-head text-right">
                                <ul className="list-inline">
                                    <li><a href="#" onClick={e => e.preventDefault()}><i className="mr-10 ti-email"></i> Email</a></li>
                                </ul>
                            </div>
                            <div className="p-50">
                                <div className="d-flex justify-content-between mb-30 add-full-card">
                                    <div className="add-card">
                                        <h4 className="mb-15">Sender</h4>
                                        <span className="name">{`${senderInfo.firstName} ${senderInfo.middleName} ${senderInfo.lastName}`}</span>
                                        <span>{senderInfo.addressLineOne}</span>
                                        <span>{senderInfo.addressLineTwo}</span>
                                        <span>{senderInfo.suburbCity + ', ' + senderInfo.stateProvince}</span>
                                        <span>{senderInfo.country}</span>
                                        <span>Phone: {Formatter.phoneNumberFormatter(senderInfo.phoneNumber)}</span>
                                        <span>Email: {senderInfo.emailAddress}</span>
                                    </div>
                                    <div className="add-card">
                                        <h4 className="mb-15">Receiver</h4>
                                        <span className="name">{`${recipient.name.fName} ${recipient.name.mName} ${recipient.name.lName}`}</span>
                                        <span>{recipient.address.aLine1}</span>
                                        <span>{recipient.address.aLine2}</span>
                                        <span>{recipient.address.subUrb + ' ' + recipient.address.state}</span>
                                        <span>{recipient.address.country}</span>
                                        <span>Phone: {Formatter.nepaliPhoneNumberFormatter(recipient.phoneNumber)}</span>
                                        <span>Email: {recipient.email}</span>
                                    </div>
                                </div>
                                <div className="order-status mb-30">
                                    <span>Order Date: {new Date().toDateString()}</span>
                                    <span>Purpose of Transaction: {purpose.purposeOfTransfer}</span>
                                    <span>Source of Funds: {purpose.sourceOfFund}</span>
                                </div>
                                <div className="table-responsive mb-40">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr align="center">
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr align="center">
                                                <td>Sent</td>
                                                <td>{Formatter.currencyFormatter(transactionDetails.send)} AUD</td>
                                            </tr>
                                            <tr align="center">
                                                <td>Receiver Gets</td>
                                                <td>{Formatter.currencyFormatter(transactionDetails.receive)} NRS</td>
                                            </tr>
                                            <tr align="center">
                                                <td>Rate</td>
                                                <td className="text-gray fw-bold">{transactionDetails.rate}</td>
                                            </tr>
                                            <tr align="center">
                                                <td>Fees</td>
                                                <td className="text-gray fw-bold">{Formatter.currencyFormatter(transactionDetails.fee)} AUD</td>
                                            </tr>
                                            <tr align="center">
                                                <td className="fw-bold">To Pay</td>
                                                <td className="fw-bold">{Formatter.currencyFormatter(transactionDetails.toPay)} AUD</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="note-wrapper row">
                                    <div className="invoice-note col-sm-12 col-md-8">
                                        <h2 className="invoice-title">Note</h2>
                                        <p className="fs-14 text-pink">Please verify the details of receiver party before proceeding as error in details provided might result in delay of the transaction.</p>
                                    </div>
                                    <div className="totle-amount col-sm-12 col-md-4 text-right">
                                        <h2 className="invoice-title">{Formatter.currencyFormatter(transactionDetails.toPay)} AUD</h2>
                                        {!selectedData[3] &&
                                            <Button variant="contained" className="btn-success text-white btn-icon" onClick={e => {
                                                confirmTransaction()
                                            }}><i className="ti-wallet mr-10"></i>Confirm Transaction</Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </RctCard>
                    </div>
                    <AlertDialogSlide
                        open={dialogOpen}
                        title={"Confirm Transaction!"}
                        body={"Please verify the details of receiver party before proceeding as error in details provided might result in delay of the transaction."}
                        cancelText={"Cancel"}
                        submitText={"Submit"}
                        dialogType={"warning"}
                        onCancel={e => setDialogOpen(false)}
                        onSubmit={e => submitForm()}
                    />
                </div>
            }
        </div>
    )
}

export default StepFive;
