import React from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';

const AddressForm = ({ aLine1, aLine2, state, zip, country, disabledCountry, onChangeValue }) => {
    return (
        <>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={aLine1.error}
                            type="aLine1"
                            value={aLine1.value}
                            name="aLine1"
                            id="user-aLine1"
                            className="has-input input-lg"
                            placeholder="Address line 1*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-pin"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <FormGroup className="has-wrapper">
                        <Input
                            type="aLine2"
                            value={aLine2.value}
                            name="aLine2"
                            id="user-aLine2"
                            className="has-input input-lg"
                            placeholder="Address line 2"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-pin"></i></span>
                    </FormGroup>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={zip.error}
                            type="text"
                            value={zip.value}
                            name="zip"
                            id="zip-code"
                            className="has-input input-lg"
                            placeholder="Zip*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-line-dashed"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={state.error}
                            type="text"
                            value={state.value}
                            name="state"
                            id="state-name"
                            className="has-input input-lg"
                            placeholder="State*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-arrow"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            type="text"
                            value={country.value}
                            name="country"
                            id="country"
                            className="has-input input-lg"
                            placeholder="Country*"
                            disabled={disabledCountry}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-map-alt"></i></span>
                    </FormGroup>
                </div>
            </div>
        </>
    )
}
export default AddressForm