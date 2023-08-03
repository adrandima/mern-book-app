// Author.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

export default mongoose.model("Author", authorSchema);
