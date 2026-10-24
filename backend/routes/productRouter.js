import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	addProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.post("/add", authMiddleware, addProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", authMiddleware, updateProduct);
productRouter.delete("/:id", authMiddleware, deleteProduct);

export default productRouter;
