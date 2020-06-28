import React from 'react'
import SweetAlert from "react-bootstrap-sweetalert";
import {CardTitle} from "reactstrap";

const alertTitle = (heading,onCancel)=>{
    return (
        <div>
            <CardTitle>{heading?heading:"Delete"}</CardTitle>
            <i className="ti-close modal-close-icon" onClick={onCancel}> </i>
        </div>
    )};

const alertMessage = (message,warning)=>{
    return (
        <span>
            <CardTitle className={"alert-message"}>{message?message:"Are you Sure?"}</CardTitle>
            {warning &&
                <CardTitle className={"alert-message"}>{warning}</CardTitle>
            }
        </span>
    )};

const ConfirmAlert = ({show,onCancel,onConfirm,confirmBtnText,confirmTitle,confirmMessage,warningMessage})=>{
    return (
        <SweetAlert
            reverseButtons
            btnSize="sm"
            show={show}
            showCancel
            closeOnClickOutside={false}
            confirmBtnText={confirmBtnText?confirmBtnText:"Delete"}
            confirmBtnBsStyle=" primary-btn"
            cancelBtnBsStyle=" cancel-btn"
            title={alertTitle(confirmTitle,onCancel)}
            onConfirm={() => onConfirm()}
            onCancel={() => onCancel()}
        >
            {alertMessage(confirmMessage,warningMessage)}
        </SweetAlert>
    )
};

export default ConfirmAlert;