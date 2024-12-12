import mongoose from "mongoose";
import { book } from "../../types";
const booksModel =new mongoose.Schema<book>({
  title:{ type: String, required: true, unique: true },
    author:{type:mongoose.Schema.Types.ObjectId , required:true },
    coverImage:{type:String ,required:true},
    file:{type:String , required:true},
    genre:{type:String , required:true},


},{timestamps:true}
)

const bookModel = mongoose.model<book>('Book',booksModel);
export default bookModel