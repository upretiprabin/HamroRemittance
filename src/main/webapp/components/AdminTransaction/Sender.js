import React, { useEffect, useState } from 'react'
import { CircularProgress, Modal, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Close from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Controller from './../../controllers/adminTransactionController'
import SenderModalContent from './SenderModalContent';
const Sender = ({ saveData }) => {
    const [selectedSender, setSelectedSender] = useState(null)
    const [senderList, setSenderList] = useState([])
    const [loading, setLoading] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const classes = useStyles();

    useEffect(() => {
        Controller.getSenderList({ setLoading, setSenderList,setModalOpen })
    }, [])

    const changeSender = (newValue) => {
        setSelectedSender(newValue);
        saveData(newValue, 0)
    }

    return (
        <div>
            { loading &&
                <div className="page-loader d-flex justify-content-center mb-30">
                    <CircularProgress />
                </div>
            }
            {
                !loading &&
                <div>
                    <div className='row mr-20'>
                        <div className='col-6'>
                            <h4>Select Sender</h4>
                        </div>
                        <div className='col-6 text-right'>
                            <div>
                                <IconButton color="primary" aria-label="add to shopping cart" onClick={e => setModalOpen(true)}>
                                    <PersonAdd title="Add New Sender" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className='ml-20 mr-20 mb-20'>
                        <Autocomplete
                            value={selectedSender}
                            id="receiver-autocomplete"
                            onChange={(event, newValue) => {
                                changeSender(newValue)
                            }}
                            options={senderList}
                            getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.emailAddress})`}
                            renderInput={(params) => <TextField {...params} label="Select Sender" variant="outlined" />}
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
                                <SenderModalContent
                                    submit={e => { Controller.saveSender({ setLoading, setSenderList }, e) }}
                                    cancel={e => { setModalOpen(false) }} />
                            </div>
                        </Fade>
                    </Modal>
                </div>
            }
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

export default Sender