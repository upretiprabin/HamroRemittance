/**
 * Stepper 1 Transaction Details
 */
import React, { useState, Fragment } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Input } from '@material-ui/core';
import { Input, FormGroup, Table, TableBody, TableRow, TableCell, } from '@material-ui/core';
import { Button } from 'reactstrap';

const StepFour = ({ saveData }) => {
    const redirectTo = (e) => {
        /***
         * redirect to edit recipient with recipient id
         */
    }
    return (
        <>
            <div className="row text-center" >
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <RctCollapsibleCard heading="Reciever Details" fullBlock className=''>
                        <div className="table-responsive">
                            <Table>
                                <colgroup>
                                    <col style={{ width: '30%' }} />
                                    <col style={{ width: '30%' }} />
                                    <col style={{ width: '40%' }} />
                                </colgroup>
                                <TableBody>
                                    <Fragment>
                                        <CustomTableRow title={'Name'} headercolSpan={2} data={'data'} />
                                        <CustomTableRow title={'Phone Number'} headercolSpan={2} data={'data'} />
                                        <CustomTableRow title={'Email'} headercolSpan={2} data={'data'} />
                                        <CustomTableRow title={'Address'} headercolSpan={2} data={'data'} />
                                        <CustomTableRow title={'Address Line 1'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'Address Line 2'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'State'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'Country'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'Bank Details'} headercolSpan={2} data={'data'} />
                                        <CustomTableRow title={'Bank'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'Branch'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'Account Number'} headercolSpan={1} data={'data'} />
                                        <CustomTableRow title={'Purpose of Transfer'} headercolSpan={2} data={'select'} />
                                    </Fragment>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="text-right m-10">
                            <Button
                                className="mr-10 mb-10 btn-icon"
                                color="info" size="lg"
                                onClick={e => {
                                    redirectTo('recipientForm')
                                }}>
                                <i className="zmdi zmdi-edit"></i> Edit Recipient
                        </Button>
                        </div>
                    </RctCollapsibleCard>
                </div>
            </div>
        </>

    )
}

const CustomTableRow = ({ title, headercolSpan, data }) => {
    if (headercolSpan == 2)
        return (
            <TableRow>
                <TableCell colSpan={headercolSpan} align={"center"}><b>{title}: </b></TableCell>
                <TableCell>{data}</TableCell>
            </TableRow>
        )
    else
        return (
            <TableRow>
                <TableCell />
                <TableCell colSpan={headercolSpan}>{title}:</TableCell>
                <TableCell>{data}</TableCell>
            </TableRow>
        )
}
export default StepFour;
