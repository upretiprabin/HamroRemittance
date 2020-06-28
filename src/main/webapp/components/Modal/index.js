import React from "react";

export default class CustomModal extends React.Component {

    state = {
        open: false,
    };

    handleClickOpen(){
        this.setState({ open: true });
    };

    handleClose(){
        this.setState({ open: false });
    };

    render() {
        throw new Error("Implement render method");
    }
}