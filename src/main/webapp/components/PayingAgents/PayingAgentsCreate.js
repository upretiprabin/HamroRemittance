import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

const PayingAgentsCreate = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {
        if (name != '' && address != '') {
            const ctx = { setLoading }
            const data = {
                name: name,
                address: address
            }
            console.log(data)
            // Controller.createPayingAgentTransaction(ctx, data)
        }
    }
    return (
        <div className='container-fluid mb-30 mt-30'>
            <h3 className="text-center">Create Paying Agent</h3>
            <div className="row mt-5 mb-5 mr-20 ml-20">
                <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                    <TextField label="Paying Agent Name" value={name} onChange={e => { setName(e.target.value) }} variant="outlined" />
                </div>
                <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                    <TextField label="Paying Agent Address" value={address} onChange={e => { setAddress(e.target.value) }} variant="outlined" />
                </div>
            </div >
            <div className='text-center'>
                <Button variant="contained" color="primary" size='large' className='m-10' onClick={handleSubmit}>
                    Create Paying Agent
                </Button>
            </div>
        </div >
    )
}

export default PayingAgentsCreate