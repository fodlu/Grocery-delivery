import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	removeCart,
	addToCart,
	getCart,
	updateCart,
} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.put("/:id", authMiddleware, updateCart);
cartRouter.delete("/:id", authMiddleware, removeCart);

export default cartRouter;
