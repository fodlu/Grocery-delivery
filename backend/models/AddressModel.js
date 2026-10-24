import mongoose from "mongoose";
import { defaultServerConditions } from "vite";

const addressSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		fullname: { type: String, required: true },
		mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
		pincode: { type: String, required: true },
		city: { type: String, required: true },
		address: { type: String, required: true },
		landmark: { type: String },
		addresstype: {
			type: String,
			enum: ["Home", "Office", "Other"],
			default: "Home",
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Address", addressSchema);
