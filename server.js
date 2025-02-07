import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, console.log(`express app running on port:${PORT}`));

app.get("/home", (req, res) => res.status(200).json({ msg: "Hello World!" }));
