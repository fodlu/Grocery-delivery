import AddressModel from "../models/AddressModel.js";

const handle = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const addAddress = handle(async (req, res) => {
	const address = await AddressModel.create({
		user: req.user._id,
		...req.body,
	});
	return res
		.status(201)
		.json({ message: "Address added successfully.", status: true, address });
});

export const getAddresses = handle(async (req, res) => {
	const addresses = await AddressModel.create({
		user: req.user._id,
		...req.body,
	}).sort({ createdAt: -1 });
	return res
		.status(201)
		.json({ count: addresses.length, status: true, addresses });
});

export const updateAddress = handle(async (req, res) => {
	const address = await AddressModel.findOneAndUpdate(
		{ _id: req.params.id, user: req.user._id },
		req.body,
		{ returnDocument: true },
	);
	if (!address)
		return res
			.status(404)
			.json({ message: "Address not found", success: false });

	return res
		.status(201)
		.json({ message: "Address updated successfully", status: true, address });
});

export const deleteAddress = handle(async (req, res) => {
	const address = await AddressModel.findOneAndDelete({
		_id: req.params.id,
		user: req.user._id,
	});
	if (!address)
		return res
			.status(404)
			.json({ message: "Address not found", success: false });

	return res
		.status(201)
		.json({ message: "Address deleted successfully", status: true });
});
