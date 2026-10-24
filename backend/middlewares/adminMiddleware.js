export const adminMiddleware = (req, res, next) => {
	try {
		if (req.user.role !== "admin")
			return res
				.status(403)
				.json({ success: false, message: "access denied, admin only" });

		next();
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
