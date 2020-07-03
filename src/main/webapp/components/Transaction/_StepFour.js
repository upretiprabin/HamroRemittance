/**
 * Stepper 1 Transaction Details
 */
import React, { useState, Fragment } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Input } from '@material-ui/core';
import { Input, FormGroup, Table, TableBody, TableRow, TableCell, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Button } from 'reactstrap';

const StepFour = ({ saveData, formData }) => {
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const redirectTo = (e) => {
        /***
         * redirect to edit recipient with recipient id
         */
    }
    const reciever = formData[2];
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
                                        <CustomTableRow title={'Name'} headercolSpan={2} data={`${reciever.name.fName} ${reciever.name.mName} ${reciever.name.lName}`} />
                                        <CustomTableRow title={'Phone Number'} headercolSpan={2} data={reciever.phoneNumber} />
                                        <CustomTableRow title={'Email'} headercolSpan={2} data={reciever.email} />
                                        <CustomTableRow title={'Address'} headercolSpan={2} data={''} />
                                        <CustomTableRow title={'Address Line 1'} headercolSpan={1} data={reciever.address.aLine1} />
                                        <CustomTableRow title={'Address Line 2'} headercolSpan={1} data={reciever.address.aLine2} />
                                        <CustomTableRow title={'State'} headercolSpan={1} data={reciever.address.state} />
                                        <CustomTableRow title={'Country'} headercolSpan={1} data={reciever.address.country} />
                                        <CustomTableRow title={'Bank Details'} headercolSpan={2} data={''} />
                                        <CustomTableRow title={'Bank'} headercolSpan={1} data={reciever.bankDetails.name} />
                                        <CustomTableRow title={'Branch'} headercolSpan={1} data={reciever.bankDetails.branch} />
                                        <CustomTableRow title={'Account Number'} headercolSpan={1} data={reciever.bankDetails.acNo} />
                                        <TableRow>
                                            <TableCell colSpan={2} align={"center"}><b>{'Purpose of Transfer'}: </b></TableCell>
                                            <TableCell>
                                                <InputLabel htmlFor="purpose-helper">Select purpose of transfer</InputLabel>
                                                <Select value={selectedPurpose} onChange={(e) => {
                                                    setSelectedPurpose(e.target.value)
                                                    if (e.target.value != '') { saveData({ purposeOfTransfer: e.target.value }) }
                                                }}
                                                    input={<Input name="purpose" id="purpose-helper" />}>
                                                    <MenuItem value="Bill Sharing">Bill Sharing</MenuItem>
                                                    <MenuItem value="Family Expenses">Family Expenses</MenuItem>
                                                    <MenuItem value="Lend / Borrow">Lend / Borrow</MenuItem>
                                                    <MenuItem value="Personal Use">Personal Use</MenuItem>
                                                    <MenuItem value="Others">Others</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
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
