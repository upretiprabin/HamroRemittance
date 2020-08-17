import React, { useState, useEffect } from 'react'

import { useDropzone } from 'react-dropzone';
const ReceiptUpload = ({ formData, saveData, isError }) => {
    const [files, setFiles] = useState([])
    const [hover, setHover] = useState(false)
    useEffect(() => {
        if (formData[3]) {
            setFiles([formData[3]])
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDragEnter: e => {
            setHover(true);
        },
        onDragLeave: e => {
            setHover(false);
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => {
                saveData(file)
                setHover(false)
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            }
            ));
        }
    });
    const thumbs = files.map(file => (
        <div style={{
            background: "#eeeef0",
            borderRadius: 5
        }}>
            <div>{file.name}</div>
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        </div>
    ));

    return (
        <div>
            <div className='row'>
                <div className="col-2"></div>
                <div className="col-8">
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone file-upload' })} style={hover ? { backgroundColor: '#F08080' } : {}}>
                            <input {...getInputProps()} />
                            <p className="text-center">Drag and drop the receipt image here or click to search for the document.</p>
                        </div>
                    </section>
                </div>
            </div>
            <div className='row'>
                <div className="col-12">
                    <div style={thumbsContainer}>
                        {thumbs}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReceiptUpload

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    textAlign: 'center',
    margin: '10px auto'
};

const thumb = {
    display: 'inline-flex',
    border: '1px solid #eeeef0',
    width: "auto",
    height: "50vh",
    padding: 10,
    borderRadius: 5,
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
    width: 'auto',
    height: '100%'
};
