import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		products: [
			{
				productModel: {
					type: String,
					enum: ["Product", "Hooka"],
					default: "Product",
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					refPath: "products.productModel",
					required: true,
				},
				quantity: { type: Number, default: 1, required: true },
				name: String,
				company: String,
				image: String,
				category: String,
				size: String,
				sellingPrice: Number,
				oldPrice: Number,
			},
		],
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true,
		},
		totalAmount: { type: Number, required: true },
		paymentMethod: {
			type: String,
			enum: ["COD", "Stripe", "Online"],
			default: "COD",
		},
		paymentStatus: {
			type: String,
			enum: ["Pending", "Paid", "Failed"],
			default: "Pending",
		},
		orderStatus: {
			type: String,
			enum: ["Processing", "On the way", "Delivered", "Cancelled"],
			default: "Processing",
		},
		stripeSessionID: { type: String, unique: true, sparse: true },
	},
	{ timestamps: true },
);

export default mongoose.model("Orders", ordersSchema);
