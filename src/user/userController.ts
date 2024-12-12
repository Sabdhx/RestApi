import { Request, Response } from "express";
import user from "./userModel";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export const Register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // console.log("name :" + name);
  console.log("email :" + email);
  // console.log("password :" + password);
  

  try {
    const finding = await user.findOne({ email });
    if (finding) {
      const error:Error = createHttpError(400, "this user already exists");
      throw error;
    }
   const salt = 10
    const hashedPassword = await bcrypt.hash(password , salt);
    const newUser = await user.create({
      name,
      email,
      password:hashedPassword
        });

    res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Login = async (req: Request, res: Response) => {
    const {name , email}= req.body;
    console.log(req.body)
    res.status(200).json({message:"successsed"})
};
