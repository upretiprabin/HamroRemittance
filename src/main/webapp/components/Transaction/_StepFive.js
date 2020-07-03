/**
 * Stepper 1 Transaction Details
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card
import { RctCard } from 'Components/RctCard/index';

const StepFive = ({ saveData, selectedData, senderInfo }) => {
    const [currency, amount, recipient, purpose] = selectedData
    const transactionDetails = {
        send: `${amount.send} AUD`,
        recieve: `${amount.recieve} ${currency.currency}`,
        rate: `1 AUD = ${currency.rate} ${currency.currency}`,
        toPay: `${amount.send + currency.fees}`,
        fee: `${currency.fees} AUD`,
    }
    return (
        <div className="invoice-wrapper">
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
                                    <span className="name">{`${senderInfo.name.fName} ${senderInfo.name.mName} ${senderInfo.name.lName}`}</span>
                                    <span>{senderInfo.address.aLine1}</span>
                                    <span>{senderInfo.address.aLine2 + ' ' + senderInfo.address.state}</span>
                                    <span>{senderInfo.address.country}</span>
                                    <span>Phone: {senderInfo.phoneNumber}</span>
                                    <span>Email: {senderInfo.email}</span>
                                </div>
                                <div className="add-card">
                                    <h4 className="mb-15">Reciever</h4>
                                    <span className="name">{`${recipient.name.fName} ${recipient.name.mName} ${recipient.name.lName}`}</span>
                                    <span>{recipient.address.aLine1}</span>
                                    <span>{recipient.address.aLine2 + ' ' + recipient.address.state}</span>
                                    <span>{recipient.address.country}</span>
                                    <span>Phone: {recipient.phoneNumber}</span>
                                    <span>Email: {recipient.email}</span>
                                </div>
                            </div>
                            <div className="order-status mb-30">
                                <span>Order Date: {new Date().toDateString()}</span>
                                <span>Purpose of Transaction: {purpose.purposeOfTransfer}</span>
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
                                            <td>{transactionDetails.send}</td>
                                        </tr>
                                        <tr align="center">
                                            <td>Reciever Gets</td>
                                            <td>{transactionDetails.recieve}</td>
                                        </tr>
                                        <tr align="center">
                                            <td>Rate</td>
                                            <td className="text-gray fw-bold">{transactionDetails.rate}</td>
                                        </tr>
                                        <tr align="center">
                                            <td>Fees</td>
                                            <td className="text-gray fw-bold">{transactionDetails.fee}</td>
                                        </tr>
                                        <tr align="center">
                                            <td className="fw-bold">To Pay</td>
                                            <td className="fw-bold">{transactionDetails.toPay} AUD</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="note-wrapper row">
                                <div className="invoice-note col-sm-12 col-md-8">
                                    <h2 className="invoice-title">Note</h2>
                                    <p className="fs-14 text-pink">Please verify the details of reciever party before proceeding as error in details provided might result in delay of the transaction.</p>
                                </div>
                                <div className="totle-amount col-sm-12 col-md-4 text-right">
                                    <h2 className="invoice-title">{transactionDetails.toPay} AUD</h2>
                                    <Button variant="contained" className="btn-success text-white btn-icon"><i className="ti-wallet mr-10"></i>Confirm Transaction</Button>
                                </div>
                            </div>
                        </div>
                    </RctCard>
                </div>
            </div>
        </div>

    )
}

export default StepFive;
