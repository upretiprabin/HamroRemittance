import React from 'react'

import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
const DocumentIdentification = ({ file, docType, docExpiry, docId, onChangeValue, onFileSelected }) => {
    return (
        <>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            type="select"
                            value={docType.value}
                            name="docType"
                            error={docType.error}
                            id="docType"
                            bsSize="lg"
                            className="input-lg"
                            onChange={(e) => onChangeValue(e)}>
                            <option value=''>Document Type</option>
                            <option value='passport'>Passport</option>
                            <option value='licence'>Driving Licence</option>
                            <option value='photoId'>Photo Id</option>
                        </Input>
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={docId.error}
                            type="text"
                            value={docId.value}
                            name="docId"
                            id="doc-id"
                            className="has-input input-lg"
                            placeholder="Document Id*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            invalid={docExpiry.error}
                            type="text"
                            value={docExpiry.value}
                            name="docExpiry"
                            id="doc-expiry"
                            className="has-input input-lg"
                            placeholder="Expiry Date*"
                            onChange={(e) => onChangeValue(e)}
                        />
                        <FormFeedback>Required</FormFeedback>
                    </FormGroup>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <FormGroup className="has-wrapper">
                        <Label className="mr-20" className={file.error ? 'text-danger mr-20' : 'mr-20'}>Identification Document*</Label>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={e => onFileSelected(e)}
                        />
                    </FormGroup>
                </div>
            </div>
        </>
    )
}
export default DocumentIdentification