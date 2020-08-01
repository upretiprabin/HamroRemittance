/**
 * Recent Orders
 */
import React, { Component } from 'react';
import Controller from "../../controllers/dashboardController"

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import ChevronRight from '@material-ui/icons/ChevronRight';

class UserTransactionDetails extends Component {

	state = {
		recentOrders: null,
		pages: 1,
		currentPage: 1
	}

	componentDidMount() {
		Controller.pastTxnData(this);
	}

	// recent orders
	getRecentOrders() {
		let dummyData = [{ "id": "#1212", "invoice": "INV-001001", "customerName": "Cristian Joy", "customerEmail": "cristian@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }, { "id": "#1213", "invoice": "INV-001003", "customerName": "Donatella Arin", "customerEmail": "conatella@example.com", "amount": "180.40", "status": "Paid", "labelClass": "badge-success" }, { "id": "#1214", "invoice": "INV-001004", "customerName": " Slurs", "customerEmail": "vikram@example.com", "amount": "200.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1215", "invoice": "INV-001005", "customerName": "Juan Rodriquez", "customerEmail": "juan@example.com", "amount": "158.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1216", "invoice": "INV-001006", "customerName": "Christia Slurs", "customerEmail": "christia@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }, { "id": "#1212", "invoice": "INV-001001", "customerName": "Cristian Joy", "customerEmail": "cristian@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }, { "id": "#1213", "invoice": "INV-001003", "customerName": "Donatella Arin", "customerEmail": "conatella@example.com", "amount": "180.40", "status": "Paid", "labelClass": "badge-success" }, { "id": "#1214", "invoice": "INV-001004", "customerName": " Slurs", "customerEmail": "vikram@example.com", "amount": "200.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1215", "invoice": "INV-001005", "customerName": "Juan Rodriquez", "customerEmail": "juan@example.com", "amount": "158.40", "status": "Canceled", "labelClass": "badge-danger" }, { "id": "#1216", "invoice": "INV-001006", "customerName": "Christia Slurs", "customerEmail": "christia@example.com", "amount": "120.40", "status": "Pending", "labelClass": "badge-info" }];
		Promise.resolve(this.setState({ recentOrders: dummyData, pages: (dummyData.length / 10) }))
	}
	render() {
		const { recentOrders, currentPage, pages } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Invoice</th>
							<th>Customer Name</th>
							<th>Sent Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((order, key) => (
							<tr key={key}>
								<td>{order.id}</td>
								<td>{order.invoice}</td>
								<td>
									<span className="d-block fw-normal">{order.customerName}</span>
									<span className="fs-12">{order.customerEmail}</span>
								</td>
								<td>${order.amount}</td>
								<td>
									<span className={`badge ${order.labelClass}`}>{order.status}</span>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={5}>
								<Pagination size="sm" aria-label="Page navigation example">
									<PaginationItem>
										<PaginationLink first href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink previous href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">
											1
        							</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">
											2
        							</PaginationLink>
									</PaginationItem>
									<PaginationItem disabled>
										<PaginationLink href="#">
											...
        							</PaginationLink>
									</PaginationItem><PaginationItem>
										<PaginationLink href="#">
											7
        							</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">
											8
        							</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink next href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink last href="#" />
									</PaginationItem>
								</Pagination>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
}

export default UserTransactionDetails;
