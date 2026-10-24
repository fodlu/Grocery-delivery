import mongoose from "mongoose";

const hookaSchema = new mongoose.Schema(
	{
		image: {
			url: { type: String, required: true },
			public_id: { type: String, required: true },
		},
		name: { type: String, required: true, trim: true },
		company: { type: String, required: true, trim: true },
		size: { type: String, required: true, trim: true },
		sellingPrice: { type: Number, required: true },
		oldPrice: { type: Number, required: true },
	},
	{ timestamps: true },
);

export default mongoose.model("Hooka", hookaSchema);
