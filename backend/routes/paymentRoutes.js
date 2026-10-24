import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	createCheckoutSession,
	verifyPayment,
} from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.post("/create-session", authMiddleware, createCheckoutSession);
paymentRouter.post("/verify-payment", authMiddleware, verifyPayment);

export default paymentRouter;
