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
import { SnackbarContent, Snackbar, Fab } from '@material-ui/core';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

function getSteps() {
    return ['Transaction details', 'Select Receiver', 'Receiver Details', 'Review Transaction'];
}

function getStepContent(stepIndex, saveStepData, data, senderInfo, receiverInfo, countries, addReceiver, error) {
    switch (stepIndex) {
        case 0:
            return <StepOne saveData={(obj) => saveStepData(obj, stepIndex)} countries={countries} isError={error} formData={data} />
        // case 1:
        //     return <StepTwo saveData={(obj) => saveStepData(obj, stepIndex)} formData={data} isError={error} />
        case 1:
            return <StepThree saveData={(obj) => saveStepData(obj, stepIndex)} receiverInfo={receiverInfo} isError={error} addReceiver={addReceiver} formData={data} />
        case 2:
            return <StepFour saveData={(obj) => saveStepData(obj, stepIndex)} formData={data} isError={error} />
        case 3:
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
        console.log(stepsData)
        switch (activeStep) {
            case 0:
                if (typeof (stepsData[activeStep]) != 'undefined') {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please input amount to be sent!')
                }
                break
            // case 1:
            //     if ((stepsData[activeStep] != null && stepsData[activeStep]?.send != '')) {
            //         updatedState = { activeStep: activeStep + 1 }
            //     } else {
            //         this.setError('Please input amount to be sent!')
            //     }
            //     break
            case 1:
                if (!(stepsData[activeStep] == null)) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please select recipient!')
                }
                break
            case 2:
                if (!!stepsData[activeStep] && !!(stepsData[activeStep]?.purposeOfTransfer != '') && !!(stepsData[activeStep]?.sourceOfFund != '')) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please select purpose of transaction and source of funds!')
                }
                break
            case 3:
                if (stepsData[activeStep] == true) {
                    updatedState = { activeStep: activeStep + 1 }
                } else {
                    this.setError('Please confirm transaction!')
                }
                break
            default:
                updatedState = { activeStep: activeStep + 1 }

        }
        this.setState(updatedState);
    };

    // saveTransaction = () => {

    //         this.props.saveTransaction(postData)
    //     }
    // }
    addReceiver = (data) => {
        let postData = {
            firstName: data.fName,
            middleName: data.mName,
            lastName: data.lName,
            relationshipToSender: data.relation,
            phoneNumber: data.phone,
            emailAddress: data.email,
            receiver: true,
            addressLineOne: data.aLine1,
            addressLineTwo: data.aLine2,
            suburbCity: data.subUrb,
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
        this.setState({ stepsData: updatedStepData })
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
        const { senderInfo, receiverInfo, countries } = this.props
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
                            <p>Your request has been sent for processing. Would you like to start another transaction?</p>
                            <Button variant="contained" className="btn btn-success text-white m-10" onClick={this.handleReset}>Yes</Button>
                            <Button variant="contained" className="btn btn-danger text-white m-10" onClick={e => {/***TODO: redirect to transaction page */ }}>No</Button>
                        </div>
                    ) : (
                            <div className="pl-40">
                                <div className="row">
                                    <div className="col-6 text-left">
                                        {this.state.activeStep != 0 ?
                                            <span className='mr-10 ml-10' title="Back">
                                                <Fab color="primary" disabled={activeStep === 0} onClick={this.handleBack}>
                                                    <NavigateBefore />
                                                </Fab>
                                            </span>
                                            : ''
                                        }
                                    </div>
                                    <div className="col-6 text-right">
                                        <span className='mr-10 ml-10' title="Next">
                                            <Fab color="primary" onClick={this.handleNext}>
                                                <NavigateNext />
                                            </Fab>
                                        </span>
                                    </div>
                                </div>
                                <div>{getStepContent(activeStep, this.saveStepData, this.state.stepsData, senderInfo, receiverInfo, countries, this.addReceiver, this.state.isError)}</div>
                                <div className="text-center">
                                    {this.state.activeStep != 0 ?
                                        <span className='mr-10 ml-10'>
                                            <Fab variant="extended" color="secondary" disabled={activeStep === 0} onClick={this.handleBack}>
                                                <NavigateBefore />
                                            Back
                                        </Fab>
                                        </span>
                                        : ''
                                    }

                                    <span className='mr-10 ml-10'>
                                        <Fab variant="extended" color="primary" onClick={this.handleNext}>
                                            Next
                                    <NavigateNext />
                                        </Fab>
                                    </span>
                                </div>
                            </div>
                        )}
                </div>
            </div >
        );
    }
}
