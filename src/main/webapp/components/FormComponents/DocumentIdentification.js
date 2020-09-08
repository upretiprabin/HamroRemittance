import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';

import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const DocumentIdentification = ({
    file,
    docType,
    docExpiry,
    docId,
    onChangeValue,
    onFileSelected
}) => {

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => {
                onFileSelected(file)
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            }
            ));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <div className={"register"}>
            <div className='row mt-10'>
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <FormGroup className="has-wrapper">
                        <Input
                            type="select"
                            value={docType.value?.toString()}
                            name="docType"
                            error={docType.error?.toString()}
                            id="docType"
                            bsSize="lg"
                            className="input-lg"
                            onChange={(e) => onChangeValue(e)}>
                            <option value=''>Document Type</option>
                            <option value='passport'>Passport</option>
                            <option value='photo_id'>Photo ID</option>
                            <option value='licence'>Australian Driving License</option>
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
            <div className='row mb-10'>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                    <Label className={file.error ? 'text-danger mr-20' : 'mr-20'}>Identification Document*</Label>
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone file-upload' })}>
                            <input {...getInputProps()} />
                            <p>Drag and drop the document image here or click to search for the document.</p>
                        </div>
                    </section>
                </div>
                <div className='col-sm-12 col-md-6 col-sm-6'>
                    <Label className={file.error ? 'text-danger mr-20' : 'mr-20'}>Document Preview</Label>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </div>
            </div>
        </div>
    )
}
export default DocumentIdentification
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '0 auto'
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eeeef0',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    borderRadius: 5,
    background: "#eeeef0",
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    margin: '0 auto'
};

const img = {
    display: 'block',
    margin: "auto",
    width: 'auto',
    height: '100%'
};
