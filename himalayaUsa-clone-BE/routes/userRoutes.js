// routes/user.routes.js
import auth from "../middlewear/auth.js";
import { Router } from "express";
import userModel from "../models/user.model.js";
const router = Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Create a new user
router.post("/register", async (req, res) => {
  try {
    console.log("users", req.body);
    const { fname: firstname, lname: lastname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ user: savedUser, token, message: 'Successfully Registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const savedUser = await userModel.findOne({ email });
    console.log(email, password, savedUser, 'data');

    if (!savedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, savedUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { _id: savedUser._id, firstname: savedUser.firstname, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ user: savedUser, token, message: 'Successfully Signed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "userModel not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }a
});

// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "userModel not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "userModel not found" });
    res.status(200).json({ message: "userModel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
