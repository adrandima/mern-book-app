import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import initiateMongoServer from "./config/db";
import { bookRouter } from './src/router/book';
import { authRouter } from './src/router/auth';

// Initiate Mongo Server
initiateMongoServer();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api/book', bookRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
