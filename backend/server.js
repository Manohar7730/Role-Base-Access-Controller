import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

connectDB();

app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
