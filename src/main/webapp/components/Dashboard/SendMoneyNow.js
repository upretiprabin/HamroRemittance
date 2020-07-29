import React, { useState, useEffect } from 'react'
import Send from '@material-ui/icons/Send';
import { Tooltip, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Controller from '../../controllers/dashboardController'

const SendMoneyNow = ({ }) => {
    const [rate, setRates] = useState(0)
    const [fees, setFees] = useState(0)
    const history = useHistory()
    useEffect(() => {
        Controller.getCurrentRates({ setRates, setFees })
    }, [])
    return (
        <div className='row text-center'>
            <div className='col-12 d-flex justify-content-center'>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Todays Rate</TableCell>
                                <TableCell align="center">Fees</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">1 AUD = {rate} NRS</TableCell>
                                <TableCell align="center">{fees} AUD</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    <Tooltip title="Send Now">
                                        <Button variant="outlined" color='primary' onClick={e => { history.push('/app/transaction') }}>Send Now</Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default SendMoneyNow