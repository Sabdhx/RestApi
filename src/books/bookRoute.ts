import express from "express";
import { createBook } from "./booksController";
import multer from "multer";
import path from "node:path"
const router = express.Router();




    const upload  = multer({
        dest:path.resolve(__dirname , "../../public/data/uploads"),
        limits:{fileSize:3e7}
    })


router.post("/createBook" ,upload.fields([
    {name:"file",maxCount:1},
    {name:"coverImage",maxCount:1}
]), createBook);


export default router