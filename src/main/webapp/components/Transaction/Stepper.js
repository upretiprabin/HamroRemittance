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

function getSteps() {
    return ['Transaction details', 'Payment and amount details', 'Select Reciever', 'Reciever Details', 'Review Transaction'];
}
//TODO each stepper child components need to be aligned centered
function getStepContent(stepIndex, saveStepData, data) {
    switch (stepIndex) {
        case 0:
            return <StepOne saveData={(obj) => saveStepData(obj, stepIndex)} />
        case 1:
            return <StepTwo saveData={(obj) => saveStepData(obj, stepIndex)} formData={data} />
        case 2:
            return <StepThree saveData={(obj) => saveStepData(obj, stepIndex)} />
        case 3:
            return <StepFour saveData={(obj) => saveStepData(obj, stepIndex)} />
        case 4:
            return <StepFive saveData={(obj) => saveStepData(obj, stepIndex)} />
        default:
            return <StepOne saveData={(obj) => saveStepData(obj, stepIndex)} />
    }
}

export default class HorizontalLabelPositionBelowStepper extends React.Component {
    state = {
        activeStep: 0,
        stepsData: []
    };

    handleNext = () => {
        const { activeStep } = this.state;
        var updatedState;
        switch (activeStep) {
            case 0:
                if (typeof (this.state.stepsData[activeStep]) != 'undefined') {
                    updatedState = { activeStep: activeStep + 1 }
                }
            default:
                updatedState = { activeStep: activeStep + 1 }

        }
        this.setState(updatedState);
    };

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
    }

    render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div>
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
                            <p>All steps completed - you&quot;re finished</p>
                            <Button variant="contained" className="btn btn-success text-white" onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div className="pl-40">
                                <div>{getStepContent(activeStep, this.saveStepData, this.state.stepsData)}</div>
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
            </div>
        );
    }
}
