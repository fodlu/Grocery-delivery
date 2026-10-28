import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	addCategory,
	deleteCategory,
	getCategories,
	getCategory,
	updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/add", authMiddleware, addCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.put("/:id", authMiddleware, updateCategory);
categoryRouter.delete("/:id", authMiddleware, deleteCategory);

export default categoryRouter;
