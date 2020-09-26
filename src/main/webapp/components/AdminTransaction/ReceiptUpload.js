import React, { useState } from 'react'
import { CustomInput, FormGroup } from 'reactstrap'

const ReceiptUpload = ({ saveData }) => {
    const [file, setFile] = useState(null)
    const onChangeFile = (event) => {
        setFile(event.target.files[0])
        saveData(event.target.files[0], 4)
    }
    return (
        <FormGroup>
            <h4>Receipt Upload</h4>
            <CustomInput
                type="file"
                id="fileUpload"
                name="file-upload"
                label="Select receipt file to be uploaded."
                accept="image/x-png,image/gif,image/jpeg"
                onChange={e => onChangeFile(e)} />
        </FormGroup>
    )
}
export default ReceiptUpload