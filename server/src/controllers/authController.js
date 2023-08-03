import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Book from "../models/Book";

import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// Register endpoint
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    // Send token in response
    sendMail(req, res, token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const sendMail = (req, res, token) => {
  const { email } = req.body;

  const config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  const response = {
    body: {
      name: "User Registration",
      intro: "Your registration is completed.",
      outro: "Looking forward to do more business",
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: "User Registration",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
        token: token,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// Login endpoint
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// API endpoint to verify JWT token expiration
export const verifyUser = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
    res.json({ expired: false, decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ expired: true, error: "Token expired" });
    }

    return res.status(401).json({ expired: true, error: "Invalid token" });
  }
};

// API endpoint to delete a user and their associated books
export const deleteUserWithBooks = async (req, res) => {
  const { userId } = req.query;

  try {
    // Delete associated books
    await Book.deleteMany({ userId });
    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: "User and associated books deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");

    // Add the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
