import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, console.log(`express app running on port:${PORT}`));

app.use("/user", userRoutes);
