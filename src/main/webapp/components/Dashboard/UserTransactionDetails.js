/**
 * User Transacation Table
 */
import React, { Component, useState, useEffect } from 'react';
import Controller from "../../controllers/dashboardController"

import TablePagination from '@material-ui/core/TablePagination';
import House from '@material-ui/icons/House';
import { currencyFormatter } from '../../util/Formatter'

const UserTransactionDetails = () => {
	const [recentOrders, setRecentOrders] = useState([]);
	const [statusMap, setStatusMap] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		Controller.pastTxnData({ setRecentOrders });
		Controller.getTxnStatusMap({ setStatusMap })
	}, [])
	const getStatusDesc = (id) => {
		let status = statusMap.find(stat => {
			return stat.statusId === id
		})
		if (status) return status.statusDesc
		return ''

	}
	const handleChangePage = (event, newPage) => {
		console.log(event, newPage)
		setCurrentPage(newPage)
	};
	const currentPageOrders = recentOrders.slice(currentPage * 10, currentPage * 10 + 10)
	return (
		<div className="table-responsive">
			<table className="table table-hover mb-0">
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Customer Name</th>
						<th>Sent Amount</th>
						<th>Cash Pickup</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{currentPageOrders && currentPageOrders.map((order, key) => (
						<tr key={key}>
							<td>#{order.id}</td>
							<td>
								<span className="d-block fw-normal">{order.receiver}</span>
								<span className="fs-12">{order.receiverEmail}</span>
							</td>
							<td>{currencyFormatter(order.total)}</td>
							<td className="text-center" title="Bank Transfer"><House/></td>
							<td>
								<span className={`badge select-${order.status} pt-5 pb-5`}>{getStatusDesc(order.status)}</span>
							</td>
						</tr>
					))}
					{currentPageOrders?.length === 0 &&
						<tr>
							<td colSpan={5} className={"text-center"}> <i>No records available</i></td>
						</tr>
					}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={5}>
							<TablePagination
								component="div"
								count={recentOrders.length}
								rowsPerPageOptions={[10]}
								page={currentPage}
								onChangePage={handleChangePage}
								rowsPerPage={10}
							/>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
export default UserTransactionDetails;
