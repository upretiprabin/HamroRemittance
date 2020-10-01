import React, { useState } from 'react'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import Controller from './../../controllers/payingAgentsController'

const PayingAgentsCreate = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const handleSubmit = () => {
        if (name != '' && address != '') {
            const ctx = { setLoading }
            const data = {
                name: name,
                address: address
            }
            Controller.createPayingAgent(ctx, data)
        } else {
            if (name == '') setNameError(true)
            if (address == '') setAddressError(true)
        }
    }
    return (
        <>
            { loading &&
                <div className="page-loader d-flex justify-content-center mb-30">
                    <CircularProgress />
                </div>
            }
            {
                !loading &&
                <div className='container-fluid mb-30 mt-30'>
                    <h3 className="text-center">Create Paying Agent</h3>
                    <div className="row mt-5 mb-5 mr-20 ml-20">
                        <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                            <TextField label="Paying Agent Name*" error={nameError} value={name} helperText={nameError ? 'Required' : ''} onChange={e => { setNameError(false); setName(e.target.value) }} variant="outlined" />
                        </div>
                        <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                            <TextField label="Paying Agent Address*" error={addressError} value={address} helperText={addressError ? 'Required' : ''} onChange={e => { setAddressError(false); setAddress(e.target.value) }} variant="outlined" />
                        </div>
                    </div >
                    <div className='text-center'>
                        <Button variant="contained" color="primary" size='large' className='m-10' onClick={handleSubmit}>
                            Create Paying Agent
                </Button>
                    </div>
                </div >
            }
        </>
    )
}

export default PayingAgentsCreate