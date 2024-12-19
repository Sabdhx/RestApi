import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import user from "./userModel";
import { config } from "../config/config";

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  // console.log("name :" + name);
  console.log(req.body);
  // console.log("password :" + password);

  try {
    const finding = await user.findOne({ email });
    if (finding) {
      const error: Error = createHttpError(500, "this user already exists");
      throw error;
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (error) {
    console.log(error);
    next(createHttpError("this has error during registering"));
  }
};






export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
      // Find the user by email
      const check = await user.findOne({ email });
      if (!check) {
          return res.status(404).json({ message: "User not found!" });
      }
      console.log(check)

      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, check.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials!" });
      }

      // Generate a token
      const age = 1000 * 60 * 60 * 24 * 7; // 1 week
      const token = jwt.sign(
          {
              email: check.email,
              name: check.name,
              id: check._id,
          },
          config.secret || "secret", // Ensure secret is properly typed
          { expiresIn: age }
      );

      // Convert Mongoose document to plain object
      const userInfo = check.toObject();
      const { password: _, ...rest } = userInfo;
       console.log(token)
      // Set a cookie with the token
      res.cookie("token", token, {
          sameSite: "lax",
      }).status(200).json(rest);

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to login!" });
  }
};
