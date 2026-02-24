import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import roleRouter from "./routes/roleRoutes.js";
import permissionRouter from "./routes/permissionRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js"
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

connectDB();

app.use("/api/auth", authRouter);
app.use("/api", roleRouter, permissionRouter, userRouter,dashboardRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
