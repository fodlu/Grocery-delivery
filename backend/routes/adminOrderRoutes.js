import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
	deleteOrder,
	getAllOrders,
	getSingleOrder,
	updateOrderStatus,
} from "../controllers/adminOrderController.js";

const adminOrderRouter = Router();

adminOrderRouter.get("/", authMiddleware, adminMiddleware, getAllOrders);
adminOrderRouter.get("/:id", authMiddleware, adminMiddleware, getSingleOrder);
adminOrderRouter.put(
	"/:id/status",
	authMiddleware,
	adminMiddleware,
	updateOrderStatus,
);
adminOrderRouter.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

export default adminOrderRouter;
