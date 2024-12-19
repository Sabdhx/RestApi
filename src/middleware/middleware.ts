import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken"
import { config } from "../config/config";
import createHttpError from "http-errors";




const middleWare=async(req:Request , res:Response , next:NextFunction)=>{
    const token   = req.header("Authorization");

    if(!token){
    return next(createHttpError(401, "authorization token is not here"))
    }
    const splittedToken = token.split(" ")[1];
    const decoded = verify(splittedToken , config.secret as string || "secret");
  
    req.userId = decoded.id;
    console.log(req.userId)
      next()
}
export default middleWare