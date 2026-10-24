import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { getDashboard } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get("/", authMiddleware, adminMiddleware, getDashboard);

export default adminRouter;
