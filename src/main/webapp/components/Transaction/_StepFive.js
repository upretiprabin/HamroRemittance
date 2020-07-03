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

const StepFive = ({ saveData }) => {
    const transactionDetails = {
        send: '1000 AUD',
        recieve: '87000',
        rate: '1 AUD = 87 NRS',
        toPay: '1009.99 AUD',
        fee: '9.99 AUD',
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
                                    <span className="name">Jack Perez</span>
                                    <span>2nd Floor</span>
                                    <span>St John Street, Aberdeenshire 2541</span>
                                    <span>United Kingdom</span>
                                    <span>Phone: 031-432-678</span>
                                    <span>Email: youemail@gmail.com</span>
                                </div>
                                <div className="add-card">
                                    <h4 className="mb-15">Reciever</h4>
                                    <span className="name">Jack Perez</span>
                                    <span>2nd Floor</span>
                                    <span>St John Street, Aberdeenshire 2541</span>
                                    <span>United Kingdom</span>
                                    <span>Phone: 031-432-678</span>
                                    <span>Email: youemail@gmail.com</span>
                                </div>
                            </div>
                            <div className="order-status mb-30">
                                <span>Order Date: Jun 15, 2016</span>
                                <span>Order ID: #123456</span>
                                <span>Purpose of Transaction: Borrow/Lend</span>
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
                                            <td className="fw-bold">{transactionDetails.toPay}</td>
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
                                    <h2 className="invoice-title">{transactionDetails.toPay}</h2>
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
