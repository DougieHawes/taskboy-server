import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";

const app = express();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, console.log(`express app running on port:${PORT}`));

app.use("/user", userRoutes);

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log(e.message));
