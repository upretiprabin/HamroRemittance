import React, { useState, useEffect } from 'react'
import Send from '@material-ui/icons/Send';
import { Tooltip, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Controller from '../../controllers/dashboardController'

const SendMoneyNow = ({ }) => {
    const [rate, setRates] = useState(null)
    const [fees, setFees] = useState(null)
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
                                <TableCell align="center">Today's Rate</TableCell>
                                <TableCell align="center">Fees</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    {rate &&
                                        <span>1 AUD = {rate} NRS</span>
                                    }
                                    {!rate &&
                                        <span>N/A</span>
                                    }
                                    </TableCell>
                                <TableCell align="center">
                                    {fees &&
                                        <span>{fees} AUD</span>
                                    }
                                    {!fees &&
                                        <span>N/A</span>
                                    }
                                </TableCell>
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