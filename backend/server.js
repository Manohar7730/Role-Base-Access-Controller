import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
