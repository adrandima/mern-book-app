// Book.js
import { model,Schema } from "mongoose";

const bookSchema = new Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
});

export default model("Book", bookSchema);
