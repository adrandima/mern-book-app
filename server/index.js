import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import initiateMongoServer from "./config/db";
import { bookRouter } from './src/router/bookRouter';
import { authRouter } from './src/router/authRouter';

// Initiate Mongo Server
initiateMongoServer();
const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api/book', bookRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
