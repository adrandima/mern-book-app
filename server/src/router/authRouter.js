import express from "express";
import { loginUser, registerUser, deleteUserWithBooks, authMiddleware, verifyUser } from "../controllers/authController";

// Initiating the router
const authRouter = express.Router();

// User registration
authRouter.post("/register", registerUser);

// User login
authRouter.post("/login", loginUser);

// User verify
authRouter.get("/verify", verifyUser);

// User delete => with books
authRouter.delete("/remove", authMiddleware, deleteUserWithBooks);

export { authRouter };
