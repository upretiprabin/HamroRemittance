
import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import Controller from './../../controllers/payingAgentsController'
const PayingAgentsCreateTransaction = ({ handleIndexChange }) => {
    const [payingAgents, setPayingAgents] = useState([])
    const [selectedAgent, changeSelectedAgent] = useState(null)
    const [value, setValue] = useState('receive');
    const [amount, setAmount] = useState(0);
    const [desc, setDesc] = useState('Transfer');
    const [loading, setLoading] = useState(0);
    const [agentError, setAgentError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [descError, setDescError] = useState(false);

    useEffect(() => {
        Controller.fetchPayingAgents({ setLoading, setPayingAgents })
    }, [])

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };
    const handleChange = (event) => {
        if (event.target.id == 'desc') {
            setDescError(false)
            setDesc(event.target.value)
        }
        if (event.target.id == 'amount') {
            setAmountError(false)
            setAmount(event.target.value)
        }
    }
    const handleSubmit = () => {
        if (selectedAgent != null && amount != 0 && desc != null) {
            const ctx = { setLoading, handleIndexChange }
            const data = {
                payingAgentsId: selectedAgent.id,
                transactionType: value,
                amount: parseFloat(amount),
                description: desc
            }
            Controller.createPayingAgentTransaction(ctx, data)
        } else {
            if (amount == 0) setAmountError(true)
            if (desc == '') setDescError(true)
            if (selectedAgent == null) setAgentError(true)
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
                    <h3 className="text-center">Create Transaction</h3>
                    <div className="row mt-5 mb-5 mr-20 ml-20">
                        <div className='col-s-12 col-md-12 col-lg-12'>
                            <Autocomplete
                                value={selectedAgent}
                                onChange={(event, newValue) => {
                                    setAgentError(false)
                                    changeSelectedAgent(newValue)
                                }}
                                options={payingAgents}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} error={agentError} helperText={agentError ? 'Please Select Paying Agent' : ''} label="Select Paying Agent*" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="row mt-5 mb-5 mr-20 ml-20">
                        <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                            <TextField
                                id="desc"
                                label="Description*"
                                value={desc}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                variant="outlined"
                                error={descError}
                                helperText={descError ? 'Required' : ''}
                            />
                        </div>
                        <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                            <div className="row">
                                <div className='col-s-12 col-md-12 col-lg-12'>
                                    <FormControl component="fieldset" >
                                        <RadioGroup row aria-label="paymentType" name="paymentType" value={value} onChange={handleRadioChange} className='text-center'>
                                            <FormControlLabel value="receive" control={<Radio />} label="Credit" />
                                            <FormControlLabel value="payment" control={<Radio />} label="Debit" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className='col-s-12 col-md-12 col-lg-12'>
                                    <TextField label="Amount*" variant="outlined" value={amount} type='number' id='amount' onChange={handleChange} error={amountError} helperText={amountError ? 'Required' : ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <Button variant="contained" color="primary" size='large' className='m-10' onClick={handleSubmit}>
                            Create Transaction
                </Button>
                    </div>
                </div>
            }
        </>
    )
}
export default PayingAgentsCreateTransaction