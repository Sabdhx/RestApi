import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import { config } from "../config/config";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import { book } from "../../types";
import fs from "node:fs";
import { Http2ServerResponse } from "node:http2";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;
  try {
    console.log(req.files);
    console.log(config.name);

    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const filename = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      filename
    );

    const uploading = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const pdfName = files.file[0].filename;
    const pdfPath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      pdfName
    );
    const uploadFile = await cloudinary.uploader.upload(pdfPath, {
      resource_type: "raw",
      filename_override: pdfName,
      folder: "book-pdf",
      format: "pdf",
    });

    const creatingBook: book = await bookModel.create({
      title,
      author: req.userId,
      coverImage: uploading.secure_url,
      file: uploadFile.secure_url,
      genre,
    });

    await fs.promises.unlink(filePath);
    await fs.promises.unlink(pdfPath);

    console.log(creatingBook);
    console.log(uploadFile);

    res.status(200).json({ id: creatingBook._id });
  } catch (error) {
    console.error("Error creating book:", error);

    // Respond with an error message
    return next(createHttpError(500, "Error while uploading file"));
  }
};

export const seeBooks = async (req: Request, res: Response) => {
  const data = await bookModel.find();
  console.log(data);
  res.status(200).json({ message: "this is the data ", data });
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { genre, title } = req.body;
  const { id } = req.params;

  console.log("Request body:", req.body);
  console.log("Uploaded files:", req.files);

  try {
    const findingBook = await bookModel.findOne({ _id: id });
    if (!findingBook) {
      return next(createHttpError(404, "Book not found"));
    }

    console.log("Author's ID:", findingBook?.author?.toString());
    console.log("User ID:", req.userId);

    if (findingBook?.author?.toString() !== req.userId) {
      return next(createHttpError(403, "Unauthorized"));
    }

    const files = (req.files as { [key: string]: Express.Multer.File[] }) || {};

    const coverMineType = files.coverImage[0].mimetype.split("/").at(-1);
    let completeCoverImage = findingBook.coverImage || "";
    if (files?.coverImage?.[0]) {
      const filename = files.coverImage[0].filename;
      const filePath = path.join(
        __dirname,
        "../../public/data/uploads",
        filename
      );

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: filename,
        folder: "book-covers",
        format: coverMineType,
      });

      completeCoverImage = uploadResult.secure_url;
      await fs.promises.unlink(filePath); // Delete local file
    }

    // Handle book file
    let completeFileName = findingBook.file || "";
    if (files?.file?.[0]) {
      const filename = files.file[0].filename;
      const filePath = path.join(
        __dirname,
        "../../public/data/uploads",
        filename
      );

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        filename_override: filename,
        folder: "book-files",
        format: "pdf",
      });

      completeFileName = uploadResult.secure_url;
      await fs.promises.unlink(filePath); // Delete local file
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      {
        title,
        genre,
        coverImage: completeCoverImage,
        file: completeFileName,
      },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  console.log(id);

  try {
    const findAuthor = await bookModel.findOne({ _id: id });
    if (findAuthor?.author?.toString() !== req.userId) {
      return next(createHttpError(403, "Unauthorized"));
    }

    const deleteData = await bookModel.findByIdAndDelete({ _id: id });
    console.log(deleteData);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return next(createHttpError(404, error));
  }
};


export const specificUser = async (req: Request, res: Response,next:NextFunction)=>{
  const id = req.params.id;
  console.log(id);

  try {
    try {
      const findAuthor = await bookModel.findOne({ _id: id });
      res.status(200).json(findAuthor)
  } catch (error) {
     return next(createHttpError(404,error))
  }
}
 
}