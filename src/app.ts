import express, { NextFunction, Request, Response } from 'express';
import  { HttpError } from 'http-errors';
import { config } from './config/config';
import user from "./user/userRouts"
import book from "./books/bookRoute"


const app = express();
app.use(express.json())

app.use("/user",user)
app.use("/book",book)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode : number = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "An unexpected error occurred",
        errstack: config.env === "development" ? err.stack || "" : "",
    });
    next()
});
export default app