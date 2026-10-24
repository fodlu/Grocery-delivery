import { Router } from "express";
import {
	forgotPassword,
	getProfile,
	loginUser,
	registerUser,
	resendOtp,
	resetPassword,
	verifyEmail,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

userRouter.get("/profile", authMiddleware, getProfile);

export default userRouter;
