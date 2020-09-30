
import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
const PayingAgentsCreateTransaction = () => {
    const [payingAgents, setPayingAgents] = useState([])
    const [selectedAgent, changeSelectedAgent] = useState(null)
    const [value, setValue] = useState('receive');
    const [amount, setAmount] = useState(0);
    const [desc, setDesc] = useState('Transfer');
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        const _payingAgents = ['Sunrise', 'Investment', 'Nabil', 'Prabhu']
        setPayingAgents(_payingAgents)
    }, [])

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };
    const handleChange = (event) => {
        event.target.id == 'desc' ? setDesc(event.target.value) : setAmount(event.target.value)
    }
    const handleSubmit = () => {
        if (selectedAgent != null && amount != 0) {
            const ctx = { setLoading }
            const data = {
                payingAgentsId: 1,
                transactionType: value,
                amount: parseFloat(amount),
                description: desc
            }
            console.log(data)
            // Controller.createPayingAgent(ctx, data)
        }
    }
    return (
        <div className='container-fluid mb-30 mt-30'>
            <h3 className="text-center">Create Transaction</h3>
            <div className="row mt-5 mb-5 mr-20 ml-20">
                <div className='col-s-12 col-md-12 col-lg-12'>
                    <Autocomplete
                        value={selectedAgent}
                        onChange={(event, newValue) => {
                            changeSelectedAgent(newValue)
                        }}
                        options={payingAgents}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Select Paying Agent" variant="outlined" />}
                    />
                </div>
            </div>
            <div className="row mt-5 mb-5 mr-20 ml-20">
                <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                    <TextField
                        id="desc"
                        label="Description"
                        value={desc}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </div>
                <div className='col-s-12 col-md-6 col-lg-6 mt-10 mb-10'>
                    <div className="row">
                        <div className='col-s-12 col-md-12 col-lg-12'>
                            <FormControl component="fieldset" >
                                <RadioGroup row aria-label="paymentType" name="paymentType" value={value} onChange={handleRadioChange} className='text-center'>
                                    <FormControlLabel value="payment" control={<Radio />} label="Credit" />
                                    <FormControlLabel value="receive" control={<Radio />} label="Debit" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className='col-s-12 col-md-12 col-lg-12'>
                            <TextField label="Amount" variant="outlined" value={amount} type='number' onChange={handleChange} />
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
    )
}
export default PayingAgentsCreateTransaction