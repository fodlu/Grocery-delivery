import CartModel from "../models/CartModel.js";

export const addToCart = async (req, res) => {
	try {
		const { product, quantity } = req.body;
		const productExists = await ProductModel.findById(product);
		if (!productExists)
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });
		const cartItem = await CartModel.findOne({ user: req.user._id, product });
		if (cartItem) {
			cartItem.quantity += quantity || 1;
			await cartItem.save();
			return res.status(200).json({
				success: true,
				message: "Cart updated successfully.",
				cart: cartItem,
			});
		}

		const cart = await CartModel.create({
			user: req.user._id,
			product,
			quantity: quantity || 1,
		});
		return res.status(201).json({
			success: true,
			message: "Product added to the cart successfully.",
			cart,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getCart = async (req, res) => {
	try {
		const cart = await CartModel.find({ user: req.user._id }).populate(
			"product",
		);
		res
			.status(200)
			.json({ success: true, status: true, count: cart.length, cart });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const updateCart = async (req, res) => {
	try {
		const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: "after",
		});
		if (!cart) {
			return res
				.status(404)
				.json({ success: false, message: "Cart item not found" });
		}

		res
			.status(200)
			.json({ message: "Cart item updated successfully", success: true, cart });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const removeCart = async (req, res) => {
	try {
		const cart = await CartModel.findOneAndDelete(req.params.id);
		if (!cart) {
			return res
				.status(404)
				.json({ success: false, message: "Cart item not found" });
		}

		res.status(200).json({
			message: "Product removed from the cart successfully",
			success: true,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
