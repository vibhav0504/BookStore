import express from "express"
import { createBooks,findBook,updateBook,deleteBook, getBooks } from "../controller/book.controller.js";
const router=express.Router();
router.route("/").get(getBooks)
router.route("/create").post(createBooks)
router.route("/:id").get(findBook)
router.route("/:id").put(updateBook)
router.route("/:id").delete(deleteBook)

export default router;