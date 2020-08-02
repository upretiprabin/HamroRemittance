import React from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';
import countries from "./countries.json";

const AddressForm = ({ aLine1, aLine2, subUrb, state, zip, country, disabledCountry, disabled, onChangeValue }) => {
    return (
        <>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={aLine1.error}
                            type="text"
                            value={aLine1.value}
                            name="aLine1"
                            id="user-aLine1"
                            className="has-input input-lg"
                            placeholder="Address line 1*"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-pin"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                    <FormGroup className="has-wrapper">
                        <Input
                            type="text"
                            value={aLine2.value}
                            name="aLine2"
                            id="user-aLine2"
                            className="has-input input-lg"
                            placeholder="Address line 2"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-pin"></i></span>
                    </FormGroup>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-md-6 col-lg-3'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={subUrb.error}
                            type="text"
                            value={subUrb.value}
                            name="subUrb"
                            id="user-subUrb"
                            className="has-input input-lg"
                            placeholder="SubUrb*"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-pin"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-3'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={state.error}
                            type="text"
                            value={state.value}
                            name="state"
                            id="state-name"
                            className="has-input input-lg"
                            placeholder="State*"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-location-arrow"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-3'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={zip.error}
                            type="text"
                            value={zip.value}
                            name="zip"
                            id="zip-code"
                            className="has-input input-lg"
                            placeholder="Zip*"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-line-dashed"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-3'>
                    <FormGroup className="has-wrapper">
                        <Input
                            type="select"
                            value={country.value}
                            name="country"
                            id="country"
                            bsSize="lg"
                            className="input-lg"
                            placeholder="Country*"
                            disabled={disabledCountry || disabled}
                            onChange={(e) => onChangeValue(e)}>
                            <option value=''>Select Country</option>
                            {
                                countries.map((country, index) => <option key={index} value={country.name}>{country.name}</option>)
                            }
                        </Input>
                    </FormGroup>
                </div>
            </div>
        </>
    )
}
export default AddressForm