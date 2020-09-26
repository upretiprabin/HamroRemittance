import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Modal } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Close from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReceiverModalContent from './ReceiverModalContent'


import Controller from './../../controllers/adminTransactionController'
const SelectReceiver = ({ saveData, formData }) => {
    const [selectedReceiver, setSelectedReceiver] = useState(null)
    const [receiverList, setReceiverList] = useState([])
    const [loading, setLoading] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const data = { senderEmailAddress: formData[0].emailAddress }
        Controller.getReceiverList(data, { setLoading, setReceiverList })
    }, [])

    const classes = useStyles();

    const changeSender = (newValue) => {
        setSelectedReceiver(newValue);
        saveData(newValue, 2)
    }
    const addReceiver = (saveData) => {
        const fetchData = { senderEmailAddress: formData[0].emailAddress }
        Controller.saveReceiverFromAdmin({ setLoading, setReceiverList, setModalOpen }, saveData, fetchData)
    }
    return (
        <div>
            <div className='row mr-20'>
                <div className='col-6'>
                    <h4>Select Receiver</h4>
                </div>
                <div className='col-6 text-right'>
                    <div>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={e => setModalOpen(true)}>
                            <PersonAdd />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='ml-20 mr-20 mb-20'>
                <Autocomplete
                    value={selectedReceiver}
                    id="receiver-autocomplete"
                    onChange={(event, newValue) => {
                        changeSender(newValue);
                    }}
                    options={receiverList}
                    getOptionLabel={(option) => `${option.receiver.firstName} ${option.receiver.lastName} (${option.receiver.emailAddress})`}
                    renderInput={(params) => <TextField {...params} label="Select Receiver" variant="outlined" />}
                />
            </div>
            <Modal
                open={modalOpen}
                onClose={e => setModalOpen(false)}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper}>
                        <span>
                            <IconButton color="primary" className={classes.closeIcon} onClick={e => setModalOpen(false)}>
                                <Close />
                            </IconButton>
                        </span>
                        <ReceiverModalContent cancel={e => { setModalOpen(false) }} addReceiver={e => { addReceiver(e) }} />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        borderRadius: '5px',
        padding: theme.spacing(2, 4, 3),
        position: "relative"
    },
    closeIcon: {
        position: 'absolute',
        top: "0px",
        right: "0px",
    },
}));
export default SelectReceiver