import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AdminOrdersView from "../../components/DashboardPage/AdminOrdersView";

const Orders = () => {
	return (
		<div>
			<Navbar />
			<AdminOrdersView showSummary={false} />
		</div>
	);
};

export default Orders;
