import mongoose from "mongoose";
import { User } from "../../types";

const User = new mongoose.Schema<User>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}
,{timestamps:true}
);

const user = mongoose.model<User>(' User', User);
export default user