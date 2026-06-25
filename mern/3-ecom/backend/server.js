import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import connectDB from "./config/db.js";


dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        msg:"Hello"
    })
})


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running 4000");
})