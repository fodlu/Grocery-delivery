import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
	try {
		// console.log("Authorization Header", req.headers.authorization);
		const headers = req.headers.authorization;
		if (!headers || !headers.startsWith("Bearer "))
			return res.status(401).json({ success: false, message: "Token missing" });
		const token = headers.split(" ")[1];
		// console.log("Token", token);
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log("Decoded", decoded);
		const user = await User.findById(decoded.id).select("-password");
		// console.log("User", user);

		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		req.user = user;

		next();
	} catch (error) {
		console.log("Auth Error", error);
		res
			.status(401)
			.json({ success: false, message: "Invalid or expired  token " });
	}
};
