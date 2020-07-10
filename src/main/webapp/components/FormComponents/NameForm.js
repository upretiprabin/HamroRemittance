import React from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';

const NameForm = ({ fName, mName, lName, onChangeValue }) => {
    return (
        <div className='row'>
            <div className='col-sm-12 col-md-6 col-lg-4'>
                <FormGroup className="has-wrapper">
                    <Input
                        invalid={fName.error}
                        type="text"
                        value={fName.value}
                        name="fName"
                        id="first-name"
                        className="has-input input-lg"
                        placeholder="First Name*"
                        onChange={(e) => onChangeValue(e)}
                    />
                    <span className="has-icon"><i className="ti-user"></i></span>
                    <FormFeedback>Required</FormFeedback>
                </FormGroup>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4'>
                <FormGroup className="has-wrapper">
                    <Input
                        invalid={mName.error}
                        type="text"
                        value={mName.value}
                        name="mName"
                        id="middle-name"
                        className="has-input input-lg"
                        placeholder="Middle Name"
                        onChange={(e) => onChangeValue(e)}
                    />
                    <span className="has-icon"><i className="ti-user"></i></span>
                </FormGroup>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4'>
                <FormGroup className="has-wrapper">
                    <Input
                        invalid={lName.error}
                        type="text"
                        value={lName.value}
                        name="lName"
                        id="last-name"
                        className="has-input input-lg"
                        placeholder="Last Name*"
                        onChange={(e) => onChangeValue(e)}
                    />
                    <span className="has-icon"><i className="ti-user"></i></span>
                    <FormFeedback>Required</FormFeedback>
                </FormGroup>
            </div>
        </div>
    )
}
export default NameForm