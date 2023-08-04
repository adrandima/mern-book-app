import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

const URI =
  "mongodb+srv://admin:" +
  process.env.DB_PASSWORD +
  "@cluster0.9dfze3l.mongodb.net/?retryWrites=true&w=majority";

const initiateMongoServer = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });
    console.log("Connected to Mongo Database !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default initiateMongoServer;
