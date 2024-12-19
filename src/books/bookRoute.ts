import express from "express";
import { createBook, seeBooks, updateBook } from "./booksController";
import multer from "multer";
import path from "node:path"
import middleWare from "../middleware/middleware";
const router = express.Router();




    const upload  = multer({
        dest:path.resolve(__dirname , "../../public/data/uploads"),
        limits:{fileSize:3e7}
    })


router.post("/createBook" ,upload.fields([
    {name:"file",maxCount:1},
    {name:"coverImage",maxCount:1}
]),middleWare, createBook);



router.post("/updatebook/:id" ,upload.fields([
    {name:"file",maxCount:1},
    {name:"coverImage",maxCount:1}
]),middleWare, updateBook);

router.get("/getBook" , seeBooks);

export default router