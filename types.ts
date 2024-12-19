import { Types } from "mongoose";

export interface User {
   id:number,
   name:string,
   email:string,
   password:string,
   profilePicture:string
}

export interface book {
   _id:number,
   title:string,
   author:Types.ObjectId,
   genre:string,
   coverImage:string,   
   file:string,
   createdAt:number,
   updatedAt:number
}

declare module "express-serve-static-core" {
   interface Request {
     userId?: string | number; // Adjust type based on your usage
   }
 }