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

export default class AlertDialogSlide extends React.Component {
    render() {
        const { open, title, body, cancelText, dialogType, submitText, onCancel, onSubmit } = this.props
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
                    <DialogTitle id="alert-dialog-slide-title" className={`bg-${dialogType}`}>
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {body}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={onCancel} className="btn-danger text-white mr-10">{cancelText}</Button>
                        <Button variant="contained" onClick={onSubmit} className="btn-success text-white mr-10">{submitText}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
