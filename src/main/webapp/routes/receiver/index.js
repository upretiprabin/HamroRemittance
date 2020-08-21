import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NotificationContainer } from "react-notifications";

import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import AlertDialogSlide from '../../components/Dialogs/AlertDialog';
import CustomIcon from '../../components/CustomIcon/index';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import ErrorBoundary from "Components/ErrorBoundary/index";
import Controller from "../../controllers/receiverController"

class ReceiverTable extends Component {

    _isMounted = false;

    state = {
        dialogOpen: false,
        editDialogOpen: false,
        addDialogOpen: false,
        receiverIndexInUse: 0,
        receivers: [],
        columns: [  {name: "id", label:"", options:{display: false}},
                    {name: "name", label:"Name"},
                    {name: "email", label:"Email"},
                    {name: "relation", label:"Relation"},
                    {name: "country", label:"Country"},
                    {name: "phoneNumber", label:"Phone Number"},
                    {name: "bankName", label:"Bank Name"},
                    {
                        name: "action",
                        label: " ",
                        options: {
                            sort: false,
                            customBodyRender: (value, tableMeta, updateValue) => {
                                let receiverIndex = tableMeta.rowData[0];
                                this.changeState({receiverIndexInUse: receiverIndex});
                                return (<div>
                                    <CustomIcon name="fa fa-pencil fa-lg" title="Edit" action={()=>{this.setEditDialogOpen(true);}} /> | <CustomIcon name="fa fa-trash fa-lg" title="Delete" action={()=>{this.setDialogOpen(true);}} />
                                </div>)
                            }
                        }
                    }
                   ],
        options: { viewColumns: false, print: false, download: false, filter: false, search: false, selectableRows: false,
                    textLabels: { body: {noMatch: 'No records found'} },
                customToolbar: () =>{
                    return (<CustomIcon name="fa fa-user-plus fa-lg" title="Add Receiver" action={() =>{this.setAddDialogOpen(true);}} />)
        }}
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadReceivers();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        if (this._isMounted) {
            this.setState(data)
        }
    }

    loadReceivers() {
        Controller.loadReceivers(this);
    }

    setDialogOpen = (status) => {
        this.changeState({dialogOpen: status});
    }

    setEditDialogOpen = (status) => {
        this.changeState({editDialogOpen: status});
    }

    setAddDialogOpen = (status) => {
        this.changeState({addDialogOpen: status});
    }

    addReceiver = ()=> {
        console.log("Hey Add Receiver");
    }

    editReceiver = () => {
        console.log("Hey Edit Receiver ."+this.state.receiverIndexInUse);
    }

    deleteReceiver = () => {
        const receiverToDelete = this.state.receivers.filter((receiver)=>{  return receiver.id == this.state.receiverIndexInUse;});
        const receiverUpdated = this.state.receivers.filter((receiver)=>{ receiver.id != this.state.receiverIndexInUse;});
        Controller.deleteReceiverData(this, receiverToDelete[0].email, receiverUpdated);
    }

    render() {
        const {receivers, columns, options, dialogOpen, editDialogOpen, addDialogOpen} = this.state;

        return (
            <div className="mt-30 container mb-30 receiver-container">
                <MUIDataTable
                    title={"Receivers"}
                    data={receivers}
                    columns={columns}
                    options={options}
                />
                <AlertDialogSlide
                    open={dialogOpen}
                    title={"Confirm Delete!"}
                    body={"Please verify to delete the receiver before proceeding."}
                    cancelText={"Cancel"}
                    submitText={"Confirm"}
                    dialogType={"warning"}
                    onCancel={e => this.setDialogOpen(false)}
                    onSubmit={e => this.deleteReceiver()}
                />
                <AlertDialogSlide
                    open={editDialogOpen}
                    title={"Edit Receiver"}
                    body={"Please edit the receiver."}
                    cancelText={"Cancel"}
                    submitText={"Ok"}
                    dialogType={"info"}
                    onCancel={e => this.setEditDialogOpen(false)}
                    onSubmit={e => this.editReceiver()}
                />
                <AlertDialogSlide
                    open={addDialogOpen}
                    title={"Add Receiver"}
                    body={"Please add the receiver"}
                    cancelText={"Cancel"}
                    submitText={"Ok"}
                    dialogType={"info"}
                    onCancel={e => this.setAddDialogOpen(false)}
                    onSubmit={e => this.addReceiver()}
                />
            </div>
        );
    }
}

export default connect(null)(ReceiverTable);