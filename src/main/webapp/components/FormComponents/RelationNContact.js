import React from 'react'
import { FormGroup, Input, FormFeedback } from 'reactstrap';

const RelationNContact = ({ relation, phone, email, disabled, onChangeValue }) => {
    return (
        <>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={relation.error}
                            type="relation"
                            value={relation.value}
                            name="relation"
                            id="user-aLine1"
                            className="has-input input-lg"
                            placeholder="Relation to Sender*"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                            disabled={disabled}
                        />
                        <span className="has-icon"><i className="ti-link"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={phone.error}
                            type="number"
                            value={phone.value}
                            name="phone"
                            id="user-phone"
                            className="has-input input-lg"
                            placeholder="Phone Number*"
                            disabled={disabled}
                            onChange={(e) => {
                                if (Number(e.target.value) || e.target.value == '')
                                    onChangeValue(e)
                            }}
                        />
                        <span className="has-icon"><i className="ti-mobile"></i></span>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={email.error}
                            type="mail"
                            value={email.value}
                            name="email"
                            id="user-mail"
                            className="has-input input-lg"
                            placeholder="Email Address*"
                            disabled={disabled}
                            onChange={(e) => onChangeValue(e)}
                        />
                        <span className="has-icon"><i className="ti-email"></i></span>
                        <FormFeedback>Email address in not valid</FormFeedback>
                    </FormGroup>
                </div>
            </div>
        </>
    )
}
export default RelationNContact