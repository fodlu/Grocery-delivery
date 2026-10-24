import cloudinary from "../config/cloudinary.js";
import Product from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
	try {
		const { image, name, company, sellingPrice, oldPrice, size, category } =
			req.body;
		if (!image.url || !image?.public_id) {
			return res
				.status(400)
				.json({ success: false, message: "Product Images Required" });
		}
		const product = await Product.create({
			image: { url: image.url, public_id: image.public_id },
			name,
			company,
			sellingPrice,
			oldPrice,
			category,
		});
		res
			.status(201)
			.json({ success: true, message: "Product Added Successfully", product });
	} catch (error) {
		res.status(500).json({ success: true, message: error.message });
	}
};

export const getProducts = async (req, res) => {
	try {
		const { category } = req.query;
		const filter = category ? { category } : {};
		const product = await Product.find(filter);
		res.status(200).json({ success: true, product, count: product.length });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product)
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });
		res.status(200).json({ success: true, product });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product)
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });
		const { image, name, company, sellingPrice, oldPrice, size, category } =
			req.body;
		let oldImagePublicId = null;
		if (
			image?.url &&
			image?.public_id &&
			image?.public_id !== product.image.public_id
		) {
			oldImagePublicId = product.image.public_id;
			product.image = { url: image.url, public_id: image.public_id };
		}
		if (name) product.name = name;
		if (company) product.company = company;
		if (size) product.size = size;
		if (category) product.category = category;
		if (sellingPrice !== undefined) product.sellingPrice = sellingPrice;
		if (oldPrice !== undefined) product.oldPrice = oldPrice;
		await product.save();

		if (oldImagePublicId) {
			try {
				await cloudinary.uploader.destroy(oldImagePublicId);
			} catch (cleanupError) {
				console.log("Old product image clean up failed", cleanupError.message);
			}
		}

		res.status(200).json({
			message: "Product updated successfully",
			success: true,
			product,
		});
	} catch (error) {
		res.status(500).json({ message: error.message, success: false });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			res.status(404).json({ success: false, message: "Product not found" });
		}
		if (product.image?.public_id) {
			await cloudinary.uploader.destroy(product.image.public_id);
		}
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json({ success: true, message: "Deleted successfully." });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
