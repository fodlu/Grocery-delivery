import AddressModel from "../models/AddressModel.js";
import OrdersModel from "../models/OrdersModel.js";

export const placeOrders = async (req, res) => {
	try {
		if (["Online", "Stripe"].includes(req.body.paymentMethod)) {
			return res.status(400).json({
				success: false,
				message: "Online orders are created after successful payment.",
			});
		}
		const address = await AddressModel.findOne({
			_id: req.body.address,
			user: req.user._id,
		});

		if (!address) {
			return res.status(400).json({
				success: false,
				message: "Please add a delivery address first.",
			});
		}
		const order = await OrdersModel.create({
			user: req.user._id,
			...req.body,
			paymentMethod: "COD",
			paymentStatus: "Pending",
		});
		res
			.status(200)
			.json({ success: true, message: "Order created successfully", order });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getOrder = async (req, res) => {
	try {
		const order = await OrdersModel.findById(req.params.id)
			.populate("products.product")
			.populate("address")
			.populate("user", "-password");

		if (!order) {
			return res
				.status(404)
				.json({ success: false, message: "Order not found." });
		}
		res.status(200).json({ success: true, order });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const updateOrder = async (req, res) => {
	try {
		const order = await OrdersModel.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: "after",
		});
		if (!order) {
			return res
				.status(404)
				.json({ success: false, message: "Order not found." });
		}
		res
			.status(200)
			.json({ success: true, message: "Order updated successfully.", order });
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: error.message });
	}
};

export const deleteOrder = async (req, res) => {
	try {
		const order = await OrdersModel.findByIdAndDelete(req.params.id);
		if (!order) {
			return res
				.status(404)
				.json({ success: false, message: "Order not found." });
		}
		res
			.status(200)
			.json({ success: true, message: "Order deleted successfully." });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const myOrders = async (req, res) => {
	try {
		const orders = await OrdersModel.find({ user: req.user._id })
			.populate("products.product")
			.populate("address")
			.sort({ createdAt: -1 });
		res.status(200).json({ success: true, orders, count: orders.length });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
