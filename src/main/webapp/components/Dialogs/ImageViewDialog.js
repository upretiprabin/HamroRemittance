/**
 * Animated Dialog
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class ImageViewDialog extends React.Component {
    render() {
        const { open, fileName, filePath, onCancel } = this.props
        const path = '/static/media/prayer_wheels.bb7e729a.jpg'
        return (
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={onCancel}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" className={`bg-info text-center`}>
                        {fileName}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span>
                                <span
                                    style={{
                                        background: "#eeeef0",
                                        borderRadius: 5,
                                        display: 'inline-flex',
                                        border: '1px solid #eeeef0',
                                        padding: 10,
                                        borderRadius: 5,
                                        boxSizing: 'border-box',
                                        marginRight: "24px",
                                    }}>
                                    <span
                                        style={{
                                            display: 'flex',
                                            minWidth: 0,
                                            overflow: 'hidden',
                                            margin: '0 auto'
                                        }}>
                                        <img
                                            src={path}
                                            alt="Receipt Image"
                                            style={{
                                                display: 'block',
                                                width: "auto",
                                                height: "500px",
                                            }}
                                        />
                                    </span>
                                </span>
                            </span>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
