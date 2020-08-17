/**
 * User Transacation Table
 */
import React, { Component, useState, useEffect } from 'react';
import Controller from "../../controllers/dashboardController"

import TablePagination from '@material-ui/core/TablePagination';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { currencyFormatter } from '../../util/Formatter'

const UserTransactionDetails = () => {
	const [recentOrders, setRecentOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		Controller.pastTxnData({ setRecentOrders });
	}, [])

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage)
	};
	const currentPageOrders = recentOrders.slice(currentPage * 10, currentPage * 10 + 10)
	return (
		<div className="table-responsive">
			<table className="table table-hover mb-0">
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Sent Amount</th>
						<th>Receive Amount</th>
						<th>Status</th>
						<th>Receipt</th>
					</tr>
				</thead>
				<tbody>
					{currentPageOrders && currentPageOrders.map((order, key) => (
						<tr key={key}>
							<td>
								<span className="d-block fw-normal">{order.receiver}</span>
								<span className="fs-12">{order.receiverEmail}</span>
							</td>
							<td>
								<span className="d-block fw-normal">{currencyFormatter(order.total)}</span>
							</td><td>
								<span className="d-block fw-normal">Rs.{currencyFormatter(order.exchangedTotal).substr(1)}</span>
							</td>
							<td>
								<span className={`badge select-${order.status} pt-5 pb-5`}>{order.status == "readyForCollectionInNepal" ? "Ready For Collection" : order.statusDesc}</span>
							</td>
							<td className="text-center">
								<span title={"fileName"} onClick={() => window.open("https://prd-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/file.jpg", "_blank")}>
									<InsertDriveFile />
								</span>
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
