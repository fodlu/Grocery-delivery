import cloudinary from "../config/cloudinary.js";
import Hooka from "../models/Hooka.js";

export const addHooka = async (req, res) => {
	try {
		const { image, name, company, sellingPrice, oldPrice, size } = req.body;
		const hooka = await Hooka.create({
			image: { url: image.url, public_id: image.public_id },
			name,
			company,
			sellingPrice,
			oldPrice,
			size,
		});
		res
			.status(201)
			.json({ success: true, message: "Hooka added successfully", hooka });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getHookas = async (req, res) => {
	try {
		const hooka = await Hooka.find().sort({ createdAt: -1 });
		res.status(200).json({ success: true, hooka, count: hooka.length });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getHooka = async (req, res) => {
	try {
		const hooka = await Hooka.findById(req.params.id)
        if(!hooka) return res.status(404).json({success: false, message: "Hookah not found"})
		res.status(200).json({ success: true, hooka, });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const updateHooka = async (req, res) => {
	try {
		const hooka = await Hooka.findById(req.params.id);
		console.log(hooka);
		if (!hooka)
			return res
				.success(400)
				.json({ success: false, message: "Hookah not found" });
		const { image, name, company, sellingPrice, oldPrice, size } = req.body;
		let oldImagePublicId = null;

		if (
			image?.url &&
			image?.public_id &&
			image?.public_id !== hooka.image.public_id
		) {
			oldImagePublicId = hooka.image.public_id;
			hooka.image = { url: image.url, public_id: image.public_id };
		}

		if (name) hooka.name = name;
		if (company) hooka.company = company;
		if (size) hooka.size = size;
		if (category) hooka.category = category;
		if (sellingPrice !== undefined) hooka.sellingPrice = sellingPrice;
		if (oldPrice !== undefined) hooka.oldPrice = oldPrice;
		await hooka.save();

		if (oldImagePublicId) {
			try {
				await cloudinary.uploader.destroy(oldImagePublicId);
			} catch (cleanupError) {
				console.log("Old product image clean up failed", cleanupError.message);
			}
		}

		res
			.status(200)
			.json({ success: true, message: "Hookah Updated Successfully", hooka });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const deleteHookah = async (req, res) => {
	try {
		const hooka = await Hooka.findById(req.params.id);
		if (!hooka)
			return res
				.status(404)
				.json({ message: "Hooka not found", success: false });
		if (hooka.image?.public_id) {
			await cloudinary.uploader.destroy(hooka.image.public_id, {
				invalidate: true,
			});
		}
		await Hooka.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ success: true, message: "Hookah Deleted Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
