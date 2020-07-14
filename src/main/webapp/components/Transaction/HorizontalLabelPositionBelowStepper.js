import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import StepOne from './_StepOne';
import StepTwo from './_StepTwo';
import StepThree from './_StepThree';
import StepFive from './_StepFive';
import StepFour from './_StepFour';
import { SnackbarContent, Snackbar } from '@material-ui/core';

function getSteps() {
    return ['Transaction details', 'Payment and amount details', 'Select Reciever', 'Reciever Details', 'Review Transaction'];
}
//TODO each stepper child components need to be aligned centered
function getStepContent(stepIndex, saveStepData, data, senderInfo, recieverInfo, countries, addReceiver, error) {
    switch (stepIndex) {
        case 0:
            return <StepOne saveData={(obj) => saveStepData(obj, stepIndex)} countries={countries} isError={error} />
        case 1:
            return <StepTwo saveData={(obj) => saveStepData(obj, stepIndex)} formData={data} isError={error} />
        case 2:
            return <StepThree saveData={(obj) => saveStepData(obj, stepIndex)} recieverInfo={recieverInfo} isError={error} addReceiver={addReceiver} />
        case 3:
            return <StepFour saveData={(obj) => saveStepData(obj, stepIndex)} formData={data} isError={error} />
        case 4:
            return <StepFive saveData={(obj) => saveStepData(obj, stepIndex)} selectedData={data} senderInfo={senderInfo} isError={error} />
        default:
            return <StepOne saveData={(obj) => saveStepData(obj, stepIndex)} />
    }
}

export default class HorizontalLabelPositionBelowStepper extends React.Component {
    state = {
        activeStep: 0,
        stepsData: [],
        isError: false,
        errorMessage: ""
    };

    handleNext = () => {
        const { activeStep, stepsData } = this.state;
        var updatedState;

        switch (activeStep) {
            case 0:
                if (typeof (stepsData[activeStep]) != 'undefined') {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please select country!')
                }
                break
            case 1:
                if ((stepsData[activeStep] != null && stepsData[activeStep]?.send != '')) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please input amount to be sent!')
                }
                break
            case 2:
                if (!(stepsData[activeStep] == null)) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please select recipient!')
                }
                break
            case 3:
                if (!!stepsData[activeStep] && !!(stepsData[activeStep]?.purposeOfTransfer != '')) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please select purpose of transaction!')
                }
                break
            case 4:
                if (stepsData[activeStep] == true) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please confim transaction!')
                }
                break
            default:
                updatedState = { activeStep: activeStep + 1 }

        }
        this.setState(updatedState);
    };

    saveTransaction = () => {
        if (this.state.activeStep == 4 && this.state.stepsData[4] == true) {
            let postData = {
                "sendMoneyTo": this.state.stepsData[0].name,
                "senderId": this.props.senderInfo._id,
                "receiverId": this.state.stepsData[2]._id,
                "subTotal": this.state.stepsData[1].send,
                "total": this.state.stepsData[1].send + this.state.stepsData[0].fees,
                "exchangedTotal": this.state.stepsData[1].recieve,
                "currency": "AUD",
                "transactionReason": this.state.stepsData[3].purposeOfTransfer,
            };
            this.props.saveTransaction(postData)
        }
    }
    addReceiver = (data) => {
        let postData = {
            firstName: data.fName,
            middleName: data.mName,
            lastName: data.lName,
            relationshipToSender: data.relation,
            phoneNumber: data.phone,
            emailAddress: data.email,
            senderId: this.props.senderInfo._id,
            receiver: true,
            addressLineOne: data.aLine1,
            addressLineTwo: data.aLine2,
            suburbCity: '',
            country: data.country,
            stateProvince: data.state,
            zipCode: data.zip,
            bankName: data.bank,
            branchId: data.branch,
            accountNumber: data.accNumber
        }
        this.props.addReceiver(postData)
    }
    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    saveStepData = (data, index) => {
        const updatedStepData = [...this.state.stepsData]
        updatedStepData[index] = data
        this.setState({ stepsData: updatedStepData }, this.saveTransaction)
        this.setError('');
    }
    setError = (errorMessage) => {
        this.setState({
            isError: errorMessage != "" && errorMessage != null,
            errorMessage: errorMessage
        })
    }
    render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        const { senderInfo, recieverInfo, countries } = this.props
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.isError}>
                    <SnackbarContent className="bg-danger" message={this.state.errorMessage} />
                </Snackbar>
                <Stepper activeStep={activeStep} alternativeLabel className="stepper-rtl">
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div className="pl-40">
                            <p>Your request has been sent for proecessing. Would you like to start another transaction?</p>
                            <Button variant="contained" className="btn btn-success text-white m-10" onClick={this.handleReset}>Yes</Button>
                            <Button variant="contained" className="btn btn-danger text-white m-10" onClick={e => {/***TODO: redirect to transaction page */ }}>No</Button>
                        </div>
                    ) : (
                            <div className="pl-40">
                                <div>{getStepContent(activeStep, this.saveStepData, this.state.stepsData, senderInfo, recieverInfo, countries, this.addReceiver, this.state.isError)}</div>
                                {this.state.activeStep != 0 ?
                                    <Button variant="contained" className="btn-danger text-white mr-10 mb-10" disabled={activeStep === 0} onClick={this.handleBack}>
                                        Back
                                    </Button>
                                    : ''
                                }

                                <Button variant="contained" color="primary" className="text-white mr-10 mb-10" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                </div>
            </div >
        );
    }
}
