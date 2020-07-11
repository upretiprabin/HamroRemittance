/**
 * Stepper 1 Transaction Details
 */
import React, { useState, Fragment } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { FormGroup, Input, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import RecieverDetails from '../Reciever/RecieverDetails';

const StepFour = ({ saveData, formData, isError }) => {
    const [selectedPurpose, setSelectedPurpose] = useState('')
    const [editableForm, setEditableForm] = useState(false)
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
                    <RctCollapsibleCard heading="Reciever Details" fullBlock>
                        <RctCardContent>
                            <RecieverDetails disabled={!editableForm} userData={reciever} cancel={e => { setEditableForm(false) }} />
                            {!editableForm && <div>
                                <div className="form-group text-center d-flex justify-content-center">
                                    <FormGroup className="has-wrapper">
                                        <Input
                                            type="select"
                                            value={selectedPurpose}
                                            name="purpose"
                                            bsSize="lg"
                                            id="purpose"
                                            className="input-lg"
                                            placeholder="Purpose*"
                                            onChange={(e) => {
                                                setSelectedPurpose(e.target.value)
                                                if (e.target.value != '') { saveData({ purposeOfTransfer: e.target.value }) }
                                            }}>
                                            <option value=''>Select Purpose of Transfer</option>
                                            <option value="Bill Sharing">Bill Sharing</option>
                                            <option value="Family Expenses">Family Expenses</option>
                                            <option value="Lend / Borrow">Lend / Borrow</option>
                                            <option value="Personal Use">Personal Use</option>
                                            <option value="Others">Others</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </div>}
                        </RctCardContent>
                        <div className="text-right m-10">
                            <Button
                                disabled={editableForm}
                                className="mr-10 mb-10 btn-icon"
                                color="info" size="lg"
                                onClick={e => {
                                    setEditableForm(true)
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

// const CustomTableRow = ({ title, headercolSpan, data }) => {
//     if (headercolSpan == 2)
//         return (
//             <TableRow>
//                 <TableCell colSpan={headercolSpan} align={"center"}><b>{title}: </b></TableCell>
//                 <TableCell>{data}</TableCell>
//             </TableRow>
//         )
//     else
//         return (
//             <TableRow>
//                 <TableCell />
//                 <TableCell colSpan={headercolSpan}>{title}:</TableCell>
//                 <TableCell>{data}</TableCell>
//             </TableRow>
//         )
// }
export default StepFour;
