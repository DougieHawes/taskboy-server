import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signUpUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    function validatePassword(password) {
      if (password.length < 8) {
        return [false, "Password must be at least 8 characters long."];
      }
      if (!/[A-Z]/.test(password)) {
        return [false, "Password must contain at least one uppercase letter."];
      }
      if (!/[a-z]/.test(password)) {
        return [false, "Password must contain at least one lowercase letter."];
      }
      if (!/[0-9]/.test(password)) {
        return [false, "Password must contain at least one number."];
      }
      return [true, "Password is valid."];
    }

    const passwordValid = await validatePassword(password);
    const passwordsMatch = password === confirmPassword;
    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });

    if (!passwordValid[0]) {
      res.status(400).json({ msg: passwordValid[1] });
    }
    if (!passwordsMatch) {
      res.status(400).json({ msg: "passwords don't match" });
    }
    if (usernameExists || emailExists) {
      res.status(400).json({ msg: "invalid credentials" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ msg: `user - ${username} signed up successfully` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "user not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
