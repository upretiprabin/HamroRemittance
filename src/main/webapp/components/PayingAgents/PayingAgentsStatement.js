import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
const PayingAgentsStatement = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [payingAgents, setPayingAgents] = useState([])
    const [selectedAgent, changeSelectedAgent] = useState(null)
    useEffect(() => {
        // Controller.fetchPayingAgents(setLoading, setPayingAgents)
    }, [])
    const changeAgent = e => {
        changeSelectedAgent(e)
        // Controller.fetchOrdersForSelectedPayingAgent({ setLoading, setOrders })
    }
    return (
        <div className='container-fluid mt-30 mb-30'>
            <h3 className="text-center">Statement of Accounts</h3>
            <div className="mt-5 mb-5 mr-20 ml-20">
                <Autocomplete
                    value={selectedAgent}
                    onChange={(event, newValue) => {
                        changeAgent(newValue)
                    }}
                    options={payingAgents}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Select Paying Agent" variant="outlined" />}
                />
            </div>

            <div className="mt-5 mb-5 mr-20 ml-20 pb-20">
                <table className="table">
                    <thead>
                        <tr align="center">
                            <th colSpan="3">
                                {selectedAgent ? selectedAgent : 'Select Paying agent First'}
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
                    {selectedAgent ? <tbody>
                        {orders.map(order =>
                            <tr key={order.id}>
                                <td align="center">{(order.date.toString())}</td>
                                <td align="center">{order.id}</td>
                                <td align="center">{order.sender}</td>
                                {order.isCredit &&
                                    <>
                                        <td align="right"></td>
                                        <td align="right">{order.amount}</td>
                                    </>
                                }
                                {!order.isCredit &&
                                    <>
                                        <td align="right">{order.amount}</td>
                                        <td align="right"></td>
                                    </>
                                }
                                <td align="right">{order.total}</td>
                            </tr>)
                        }
                    </tbody> : <></>}
                </table>
            </div>
        </div>
    )
}
export default PayingAgentsStatement