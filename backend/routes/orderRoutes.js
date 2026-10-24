import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	deleteOrder,
	getOrder,
	myOrders,
	placeOrders,
	updateOrder,
} from "../controllers/ordersController.js";

const ordersRouter = Router();

ordersRouter.post("/place", authMiddleware, placeOrders);
ordersRouter.get("/my-orders", authMiddleware, myOrders);
ordersRouter.get("/:id", authMiddleware, getOrder);
ordersRouter.put("/:id", authMiddleware, updateOrder);
ordersRouter.delete("/:id", authMiddleware, deleteOrder);

export default ordersRouter;
