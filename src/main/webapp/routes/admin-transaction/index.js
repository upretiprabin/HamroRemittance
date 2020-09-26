/**
 * Dashboard
 */

import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorBoundary from "Components/ErrorBoundary/index";
import { NotificationContainer } from "react-notifications";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from '@material-ui/core';

import Sender from 'Components/AdminTransaction/Sender'
import AmountDetails from 'Components/AdminTransaction/AmountDetails'
import SelectReceiver from 'Components/AdminTransaction/SelectReceiver'
import TransactionDetails from 'Components/AdminTransaction/TransactionDetails'
import ReceiptUpload from 'Components/AdminTransaction/ReceiptUpload'
import ReviewTransaction from 'Components/AdminTransaction/ReviewTransaction'
import Controller from './../../controllers/adminTransactionController'


import Validator from '../../util/Validators';


class Index extends Component {

    _isMounted = false;
    state = {
        loading: false,
        index: 0,
        loader: false,
        stepData: []
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        this.setState(data)
    }
    saveData = (data, index) => {
        let updatedStepData = this.state.stepData
        updatedStepData[index] = data
        this.changeState({ stepData: updatedStepData, index: index + 1 })
    }
    saveTransaction = (toPay) => {
        const formData = this.state.stepData
        let data
        if (formData.length >= 5) {
            data = {
                sendMoneyTo: formData[1].country,
                senderEmailAddress: formData[0].emailAddress,
                receiverEmailAddress: formData[2].receiver.emailAddress,
                subTotal: formData[1].send,
                total: toPay,
                exchangedTotal: formData[1].receive,
                currency: "AUD",
                transactionReason: formData[3].purposeOfTransfer,
                cashPickUpId: formData[2].bankDetails != null ? 1 : 2,
                sourceOfFund: formData[3].sourceOfFund,
                trnNumber: formData[5] ? formData[5].trn : '',
                taxPercentage: formData[1].taxPercentage,
                discount: formData[1].discount,
                receiptImage: formData[4],
                emailInvoice: formData[5] ? formData[5].emailInvoice : false,
            }
        }
        const validateData = !this.validate(data)
        if (!validateData[0]) {
            Controller.saveAdminTransaction(this, data)
        } else {
            alert(validateData[1])
        }
    }
    setLoader = value => {
        this.setState({ loader: value })
    }
    validate = (formData) => {
        let error = false
        let errorMessage = 'The following fields have errors please verify and submit again!'
        for (let obj in formData) {
            switch (obj) {
                case 'receiverEmailAddress':
                case 'senderEmailAddress':
                    if (!Validator.emailValidator(formData[obj])) {
                        error = true
                        errorMessage = errorMessage + ' > Receiver or Sender values'
                    }
                    break
                case 'trnNumber':
                case 'emailInvoice':
                case 'taxPercentage':
                case 'discount':
                    break
                case 'receiptImage':
                    if (formData[obj] == null) {
                        error = true
                        errorMessage = errorMessage + ' > Receipt File'
                    }
                    break
                default:
                    if (formData[obj] == '' || formData[obj] == 0) {
                        error = true
                        errorMessage = errorMessage + ' > Amount or Transaction Details'
                    }
                    break
            }
        }
        return [error, errorMessage]
    }
    render() {
        const {
            loading, index, stepData, loader
        } = this.state;
        return (
            <div className="dashboard-wrapper">
                <ErrorBoundary>
                    {loading &&
                        <div className="page-loader d-flex justify-content-center mb-30">
                            <CircularProgress />
                        </div>
                    }
                    {!loading &&
                        <div >
                            <RctCollapsibleCard
                                heading='Create Transaction'>
                                <div className="container" style={loader ? {pointerEvents: "none", opacity: "0.4"} : {}}>
                                    {index >= 0 &&
                                        <div>
                                            <Sender saveData={this.saveData} />
                                        </div>
                                    }
                                    {index >= 1 &&
                                        <div>
                                            <AmountDetails saveData={this.saveData} />
                                        </div>
                                    }
                                    {index >= 2 &&
                                        <SelectReceiver saveData={this.saveData} formData={this.state.stepData} />
                                    }
                                    {index >= 3 &&
                                        <TransactionDetails saveData={this.saveData} />
                                    }
                                    {index >= 4 &&
                                        <div>
                                            <ReceiptUpload saveData={this.saveData} />
                                        </div>
                                    }
                                    {index >= 5 &&
                                        <div>
                                            <div>
                                                <ReviewTransaction saveData={this.saveData} formData={this.state.stepData} saveTransaction={e => this.saveTransaction(e)} loader={loader} />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </RctCollapsibleCard>
                        </div>
                    }
                    <NotificationContainer />
                </ErrorBoundary>
            </div>
        )
    }
}

export default Index;