import React from 'react'
import { Button } from '@material-ui/core';

const SendMoneyNow = ({ }) => {
    return (
        <div className='row text-center'>
            <div className='col-12 d-flex justify-content-center'>
                <img src={require('./../../assets/flag-icons/nepal.jpg')} className="img-fluid rounded-circle" alt="user profile" width="50" height="50" />
                <Button variant="contained" size="large" color="primary" className='m-5'>
                    Send Now
                </Button>
            </div>
        </div>
    )
}

export default SendMoneyNow