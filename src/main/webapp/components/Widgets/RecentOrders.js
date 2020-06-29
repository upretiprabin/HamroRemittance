/**
 * Recent Orders
 */
import React, { Component } from 'react';

// api
import api from 'Api';

class RecentOrders extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}

	// recent orders
	getRecentOrders() {
		let dummyData = [{"id":"#1212","invoice":"INV-001001","customerName":"Cristian Joy","customerEmail":"cristian@example.com","amount":"120.40","status":"Pending","labelClass":"badge-info"},{"id":"#1213","invoice":"INV-001003","customerName":"Donatella Arin","customerEmail":"conatella@example.com","amount":"180.40","status":"Paid","labelClass":"badge-success"},{"id":"#1214","invoice":"INV-001004","customerName":" Slurs","customerEmail":"vikram@example.com","amount":"200.40","status":"Canceled","labelClass":"badge-danger"},{"id":"#1215","invoice":"INV-001005","customerName":"Juan Rodriquez","customerEmail":"juan@example.com","amount":"158.40","status":"Canceled","labelClass":"badge-danger"},{"id":"#1216","invoice":"INV-001006","customerName":"Christia Slurs","customerEmail":"christia@example.com","amount":"120.40","status":"Pending","labelClass":"badge-info"}];
		Promise.resolve(this.setState({recentOrders:dummyData}))
	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Invoice</th>
							<th>Customer Name</th>
							<th>Profitment</th>
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
				</table>
			</div>
		);
	}
}

export default RecentOrders;
