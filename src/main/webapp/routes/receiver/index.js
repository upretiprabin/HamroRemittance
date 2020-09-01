import React, { Component } from 'react'
import { connect } from 'react-redux';

import MUIDataTable from "mui-datatables";
import AlertDialogSlide from '../../components/Dialogs/AlertDialog';
import CustomIcon from '../../components/CustomIcon/index';
import Controller from "../../controllers/receiverController"
import ReceiverDetails from '../../components/Receiver/ReceiverDetails'
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


class ReceiverTable extends Component {

    _isMounted = false;
    columns =
        [{ name: "id", label: "", options: { display: false } },
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "relation", label: "Relation" },
        { name: "country", label: "Country" },
        { name: "phoneNumber", label: "Phone Number" },
        { name: "bankName", label: "Bank Name" },
        {
            name: "action",
            label: " ",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    let receiverIndex = tableMeta.rowData[0];
                    this.changeState({ receiverIndexInUse: receiverIndex });
                    return (
                    <div className="d-flex align-items-center">
                        <CustomIcon name="fa fa-pencil fa-lg text-warning p-5" title="Edit" action={() => { this.openEditForm(false); }} />
                        <div className="verticalLine"></div>
                        <CustomIcon name="fa fa-trash fa-lg text-danger p-5" title="Delete" action={() => { this.setDialogOpen(true); }} />
                    </div>
                    )
                }
            }
        }
        ]

    options =
        {
            viewColumns: false, print: false, download: false, filter: false, selectableRows: false,
            textLabels: { body: { noMatch: 'No records found' } },
            responsive: 'standard'
        }

    state = {
        dialogOpen: false,
        receiverIndexInUse: 0,
        receiverDetails: [],
        receivers: [],
        tableData: true,
        add: false
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadReceivers();
    }
    isAddEdit = () => {
        let userId = this.props.location.state?.userId == null ? null : this.props.location.state?.userId
        if (userId === -1) {
            this.openAddForm(false)
        }
        if (userId !== null) {
            this.setState({ receiverIndexInUse: userId }, this.openEditForm(false))
        }
        this.props.history.replace('/app/receiver')
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

    openAddForm = (status) => {
        this.changeState({ add: true, tableData: status });
    }
    openEditForm = (status) => {
        this.changeState({ add: false, tableData: status });
    }
    newReceiver = (data) => {
        Controller.addReceiver(this, this.formatData(data))
    }
    formatData = (data) => {
        let postData = {
            firstName: data.fName,
            middleName: data.mName,
            lastName: data.lName,
            relationshipToSender: data.relation,
            phoneNumber: data.phone,
            emailAddress: data.email,
            receiver: true,
            addressLineOne: data.aLine1,
            addressLineTwo: data.aLine2,
            suburbCity: data.subUrb,
            country: data.country,
            stateProvince: data.state,
            zipCode: data.zip,
            bankName: data.bank,
            branchId: data.branch,
            accountNumber: data.accNumber
        }
        return postData
    }
    editReceiver = (data) => {
        Controller.editReceiver(this, this.formatData(data))
        // Controller.editReceiver(data)
    }
    deleteReceiver = () => {
        const receiverToDelete = this.state.receivers.filter((receiver) => { return receiver.id == this.state.receiverIndexInUse; });
        const receiverUpdated = this.state.receivers.filter((receiver) => { receiver.id != this.state.receiverIndexInUse; });
        Controller.deleteReceiverData(this, receiverToDelete[0].email, receiverUpdated);
    }
    getSelectedReceiverDerails = () => {
        const { receiverIndexInUse, add, receiverDetails } = this.state;
        const selectedReceiver = receiverDetails.find(el => {
            return el._id == receiverIndexInUse
        })
        return add ? null : selectedReceiver
    }
    setDialogOpen = (status) => {
        this.changeState({ dialogOpen: status })
    }
    render() {
        const { add, receivers, dialogOpen, tableData } = this.state;

        return (
            <div className="mt-30 container mb-30 receiver-container screenHeight">
                {!tableData &&

                    <RctCollapsibleCard
                        heading={add ? 'Add Receiver' : 'Edit Receiver'}
                        fullBlock>
                        <ReceiverDetails
                            userData={this.getSelectedReceiverDerails()}
                            disabled={add ? null : false}
                            cancel={e => { this.openAddForm(true) }}
                            addReceiver={e => this.newReceiver(e)}
                            updateReceiver={e => this.editReceiver(e)} />
                    </RctCollapsibleCard>
                }
                {tableData &&
                    <>
                        <MUIDataTable
                            title={<CustomIcon name="fa fa-user-plus fa-lg" title="Add Receiver" preText="Receivers" action={() => { this.openAddForm(false); }} />}
                            data={receivers}
                            columns={this.columns}
                            options={this.options}
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
                    </>
                }
            </div>
        );
    }
}

export default connect(null)(ReceiverTable);