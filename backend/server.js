import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRouter.js";
import hookaRouter from "./routes/hookaRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import ordersRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import adminOrderRouter from "./routes/adminOrderRoutes.js";

const PORT = 5000;
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DB
connectDB();

// ROUTES
app.use("/api/auth/", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/hookas", hookaRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.get("/", (req, res) => {
	res.send("API WORKING");
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
