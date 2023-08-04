// Author.js
import { model,Schema } from "mongoose";

const authorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

export default model("Author", authorSchema);
