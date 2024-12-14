import { Request, Response } from "express";

export const createBook = async(req:Request , res:Response)=>{
    // const {  coverImage , file} = req.body;

    console.log(req.files)
    res.status(200).json({message:"book created sucessfully"})
}