import express from "express";

import { signInUser, signUpUser } from "../controllers/userControllers";

const router = express.Router();

router.post("/signin", signInUser);
router.post("/signup", signUpUser);

export default router;
