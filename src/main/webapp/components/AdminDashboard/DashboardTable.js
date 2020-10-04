
import React, { useState, useEffect } from 'react';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import Controller from "../../controllers/adminDashboardController"
import { Input, Select, MenuItem, Chip, Typography, FormControl, InputLabel, Button, IconButton, CircularProgress } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const DashboardTable = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [txnStatus, setTxnStatus] = useState([])
    const [payingAgents, setPayingAgents] = useState([])
    const [selected, setSelected] = useState([])
    const [filter, setFilter] = useState('NULL')
    const [update, setUpdate] = useState('NULL')

    const txnTableColumns = [
        {
            "name": "orderDetailsId",
            "label": "Transaction id",
            "options": {
                "filter": false,
                "sort": true
            }
        },
        {
            "name": "sender",
            "label": "Sender Name",
            "options": {
                "filter": true,
                "sort": true
            }
        },
        {
            "name": "dateCreated",
            "label": "Date",
            "options": {
                "filter": true,
                "sort": true,
                "setCellProps": value => ({ style: { whiteSpace: 'pre' } })
            }
        },
        {
            "name": "status",
            "label": "Status",
            "options": {
                "filter": true,
                "sort": true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const _id = tableMeta.rowData[0]
                    return (
                        <div>
                            <FormControl fullWidth>
                                <Select
                                    className={`text-center select-${value}`}
                                    value={value}
                                    onChange={(e) => {
                                        onSingleStatusChange(e.target.value, _id)
                                    }
                                    }
                                    input={<Input name="status" id="status-helper" />}>
                                    {txnStatus?.map((data, index) => <MenuItem key={index} value={data.statusId}>{data.statusDesc}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                    )
                }
            },
        },
        {
            "name": "total",
            "label": "Amount",
            "options": {
                "filter": true,
                "sort": true
            }
        },
        {
            "name": "trnNumber",
            "label": "TRN",
            "options": {
                "filter": false,
                "sort": false,
                "customBodyRender": (value, tableMeta, updateValue) => {
                    const orderDetailsId =  tableMeta.rowData[0];
                    return (
                        <form className="d-flex" onSubmit={e => saveTRN(e,orderDetailsId)}>
                            <Input className={"width80"} defaultValue={value} id={"trn-"+orderDetailsId} inputProps={{ 'aria-label': 'description' }}/>&nbsp;&nbsp;
                            <Button type="submit" size="small" color="secondary" variant="contained">Save</Button>
                        </form>
                    )
                }
            }
            //TODO change to custom body render with text felid and button
        },
        {
            "name": "receiver",
            "label": "Recipient Name",
            "options": {
                "filter": true,
                "sort": true
            }
        },
        {
            "name": "exchangedTotal",
            "label": "Exchanged",
            "options": {
                "filter": true,
                "sort": true
            }
        },
        {
            "name": "location",
            "label": "Location",
            "options": {
                "filter": true,
                "sort": true
            }
        },
        {
            "name": "payingAgentsId",
            "label": "Paying Agent",
            "options": {
                "filter": true,
                "sort": true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const _id = tableMeta.rowData[0]
                    return (
                        <div>
                            <FormControl fullWidth>
                                <Select
                                    className={`text-center select-${value}`}
                                    value={value?value:''}
                                    onChange={(e) => {
                                        onSinglePayingAgentChange(e.target.value, _id)
                                    }
                                    }
                                    input={<Input name="payingAgent" />}>
                                    {payingAgents?.map((data, index) => <MenuItem key={index} value={data.id}>{data.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                    )
                }
            },
        },
        {
            "name": "action",
            "label": "Actions",
            "options": {
                "filter": false,
                "sort": false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <label htmlFor="icon-button-file">
                                <IconButton color="default" aria-label="upload picture" component="span" size='small' onClick={e => { deleteRecord(tableMeta.rowData[0]) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </label>
                        </div>
                    )
                }
            }
        },

    ]
    const txnTableOptions = {
        responsive: 'standard',
        onRowsSelect: (currentRowSelected, selectedRows) => {
            setSelected([...selectedRows])
        },
        pagination: true,
        print: false,
        filter: false,
        viewColumns: false,
        textLabels: { body: { noMatch: 'No records found' } },
        rowsPerPage: 5
    };


    useEffect(() => {
        Controller.loadTxnStatus({ setTxnStatus })
        Controller.loadPayingAgents({ setPayingAgents })
        Controller.loadData({ setTableData, setIsLoading })
    }, [])

    const bulkUpdate = e => {
        setUpdate(e.target.value)
        let indices = []
        if (e.target.value != 'NULL') {
            selected.forEach(data => {
                indices.push(tableData[data.dataIndex].orderDetailsId)
            })
        }
        const data = {
            request: {
                orderDetailsId: indices,
                status: e.target.value
            }
        }
        // console.log(data)
        setUpdate('NULL')
        setSelected([])
        Controller.postBulkUpdate({ setIsLoading, refreshPage, data })
    }

    const filterTxnStatus = (e, chip) => {
        let value = null;
        if(chip) value = e.target.parentElement.value;
        else value = e.target.value;

        setFilter(value)
        const data = {
            status: value
        }
        if (value == 'NULL') {
            Controller.loadData({ setTableData, setIsLoading })
        } else {
            Controller.loadFilteredData({ setTableData, setIsLoading, data })
        }
    }
    const deleteRecord = e => {
        const data = {
            orderDetailsId: parseInt(e)
        }
        if (confirm("Are you sure you want to delete record id #: " + e)) {
            Controller.deleteRecord({ setIsLoading, refreshPage, data })
        }
    }
    const refreshPage = () => {
        if (filter != 'NULL') {
            const data = {
                status: filter
            }
            Controller.loadFilteredData({ setTableData, setIsLoading, data })
        } else {
            Controller.loadData({ setTableData, setIsLoading })
        }
    }
    const onSingleStatusChange = (e, id) => {
        const data = {
            orderDetailsId: id,
            status: e
        }
        Controller.updateTxnStatus({ refreshPage, setIsLoading, data })
    }

    const onSinglePayingAgentChange = (e, id) => {
        const data = {
            orderDetailsId: id,
            payingAgentsId: e
        }
        Controller.updatePayingAgent({ refreshPage, setIsLoading, data })
    }

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableHeadCell: {
              data: {
                whiteSpace: 'pre'
              },
              root:{
                zIndex: '1!important'
              }
            },
            MUIDataTableSelectCell: {
                root:{
                    zIndex: '10!important',
                    backgroundColor: '#fff'
                }
            }
        }
    })

    const saveTRN = (e, orderDetailsId) =>{
        const trn = document.getElementById("trn-"+orderDetailsId).value;
        Controller.saveTRN({setIsLoading, refreshPage, trn, orderDetailsId});
    }

    return (
        <RctCollapsibleCard
            colClasses="col-sm-12 col-md-12 col-lg-12 pd0"
            collapsible
            reloadable
            closeable
            fullBlock
        >
            {isLoading &&
                <div className="page-loader d-flex justify-content-center mb-30">
                    <CircularProgress />
                </div>
            }
            {!isLoading &&
                <div>
                    <div className="row m-10">
                        <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                            <FormControl>
                                <InputLabel htmlFor="country-helper">Status Filter</InputLabel>
                                <Select
                                    onChange={(e) => { filterTxnStatus(e) }}
                                    value={filter}
                                    input={<Input name="status" id="status-helper" value={""} />}>
                                    <MenuItem value='NULL'><em>Select for filter</em></MenuItem>
                                    {txnStatus?.map((data, index) => <MenuItem key={index} value={data.statusId}>{data.statusDesc}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                            <FormControl>
                                <InputLabel htmlFor="country-helper">Bulk Update</InputLabel>
                                <Select
                                    disabled={selected.length == 0}
                                    onChange={(e) => { bulkUpdate(e) }}
                                    value={update}
                                    input={<Input name="update" id="update-helper" />}>
                                    <MenuItem value='NULL'><em>Select for bulk update</em></MenuItem>
                                    {txnStatus?.map((data, index) => <MenuItem key={index} value={data.statusId}>{data.statusDesc}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="m-20">
                        <Typography variant="body1" color="textPrimary">Status</Typography>
                        <Chip disabled={filter=="NULL"?true:false}
                        className="bg-primary text-white mr-10 mb-10"
                        label={"Show All"} value={"NULL"} component="button"
                        onClick={(event) => filterTxnStatus(event, true)}
                        />
                        {txnStatus?.map((data, index) =>
                            (index<5) &&
                            <Chip key={index} disabled={filter==data.statusId?true:false}
                            className="bg-primary text-white mr-10 mb-10"
                            label={data.statusDesc} value={data.statusId} component="button"
                            onClick={(event) => filterTxnStatus(event, true)}
                            />
                        )}
                    </div>

                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Orders"}
                            data={tableData}
                            columns={txnTableColumns}
                            options={txnTableOptions}
                        />
                    </MuiThemeProvider>
                </div>
            }
        </RctCollapsibleCard>
    )
}
export default DashboardTable