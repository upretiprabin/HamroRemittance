import { CircularProgress, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Controller from './../../controllers/payingAgentsController'

const PayingAgentsStatement = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [payingAgents, setPayingAgents] = useState([])
    const [selectedAgent, changeSelectedAgent] = useState(null)
    useEffect(() => {
        Controller.fetchPayingAgents({ setLoading, setPayingAgents })
    }, [])
    const changeAgent = e => {
        changeSelectedAgent(e)
        Controller.fetchOrdersForSelectedPayingAgent({ setLoading, setOrders }, { payingAgentsId: e.id })
    }
    const getOrdersArray = () => {
        let array = []
        let total = 0
        for (const key in orders[0]) {
            //remove this block after amount data and balance is created 
            if (orders[0][key].credit == 0) total = total - orders[0][key].debit
            if (orders[0][key].debit == 0) total = total + orders[0][key].credit
            orders[0][key].balance = total
            orders[0][key].order = parseInt(key)

            array.push(orders[0][key])
        }
        return [array, total]
    }
    const fileName = `${new Date().getTime().toString()}-${selectedAgent?.name.toLowerCase()}`
    const [orderedArray, totalBalance] = getOrdersArray()
    return (
        <>
            { loading &&
                <div className="page-loader d-flex justify-content-center mb-30">
                    <CircularProgress />
                </div>
            }
            {
                !loading &&
                <div className='container-fluid mt-30 mb-30'>
                    <h3 className="text-center">Statement of Accounts</h3>
                    <div className="row mt-5 mb-5 mr-20 ml-20">
                        <div className='col-sm-6 col-md-8 col-lg-10'>
                            <Autocomplete
                                value={selectedAgent}
                                onChange={(event, newValue) => {
                                    changeAgent(newValue)
                                }}
                                options={payingAgents}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Select Paying Agent" variant="outlined" />}
                            />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-2 text-right" style={selectedAgent && orderedArray.length !== 0 ? {} : { pointerEvents: "none", opacity: "0.4" }}>
                            <ReactHTMLTableToExcel
                                className={selectedAgent && orderedArray.length !== 0 ? "btn btn-success" : 'btn'}
                                table="paying_agent_transaction"
                                filename={fileName}
                                sheet={selectedAgent ? selectedAgent.name : ''}
                                buttonText="Export excel" />
                        </div>
                    </div>

                    <div className="mt-5 mb-5 mr-20 ml-20 pb-20">
                        <table className="table" id="paying_agent_transaction">
                            <thead>
                                <tr align="center">
                                    <th colSpan="3">
                                        {selectedAgent ? "Paying Agent: " + selectedAgent.name : 'Select Paying agent First'}
                                    </th>
                                    <th colSpan="3">Amount</th>
                                </tr>
                                <tr>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">Order</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-right">Debit</th>
                                    <th className="text-right">Credit</th>
                                    <th className="text-right">Balance</th>
                                </tr>
                            </thead>
                            {selectedAgent && orderedArray.length !== 0
                                ? <tbody>
                                    {orderedArray.map((order, index) =>
                                        <tr key={index}>
                                            <td align="center">{(new Date(order.date)).toDateString()}</td>
                                            <td align="center">{order.order !== 0 ? order.order : ''}</td>
                                            <td align="center">{order.descOrReceiver}</td>
                                            {order.credit !== 0 &&
                                                <>
                                                    <td align="right"></td>
                                                    <td align="right">{order.credit}</td>
                                                </>
                                            }
                                            {order.debit !== 0 &&
                                                <>
                                                    <td align="right">{order.debit}</td>
                                                    <td align="right"></td>
                                                </>
                                            }
                                            <td align="right">{order.balance}</td>
                                        </tr>)
                                    }
                                    <tr>
                                        <td colSpan='3'></td>
                                        <td colSpan='2' align="right" className="text-right fw-bold">Total</td>
                                        <td className="text-right fw-bold">{totalBalance}</td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    <tr className='text-center'>
                                        <td colSpan='6'><b><i>{selectedAgent ? "No records to show for paying agent '" + selectedAgent.name + "'" : "No records to show"}</i></b></td>
                                    </tr>
                                </tbody>}
                        </table>
                    </div>
                </div>
            }
        </>
    )
}
export default PayingAgentsStatement