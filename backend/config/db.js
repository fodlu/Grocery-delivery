import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Database connected successfully"))
    await mongoose.connect("mongodb://localhost:27017/grocery")
}