import mongoose, { Schema, Document } from "mongoose";
import { book } from "../../types";

// Define the schema for books
const booksModel = new Schema<book>({
  title: { type: String, required: true, unique: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  coverImage: { type: String, required: true },
  file: { type: String, required: true },
  genre: { type: String, required: true },
}, { timestamps: true });

// Create and export the model
const bookModel = mongoose.model<book>("Book", booksModel);
export default bookModel;
