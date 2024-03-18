import { BookModel } from "../model/Book.model.js"
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
export const createBooks =asyncHandler(async (req,res)=>{
   
    const { title, author, publishYear } = req.body;
    // console.log(title);
    // console.log(author);
    // console.log(publishYear);
    if ([title, author, publishYear].some((e) =>e.trim() === "")) {
        throw new ApiError(404, "All fields should be complete");
    }
    // Check if the book already exists
    const existingBook = await BookModel.findOne({title});
    if (existingBook) {
        throw new ApiError(402, "Book already exists");
    }
    // Create the book if it doesn't exist
    const book = await BookModel.create({
        title: title.toLowerCase(),
        author,
        publishYear
    });
    return res.status(200).send(book);
    } 
)
export const  findBook=asyncHandler(async (req,res)=>{
    const {id}=req.params
    const book= await BookModel.findById(id);
if(!book){
    throw new ApiError(404,"Book not found")
}
return res.status(200).send(book)
})

export const getBooks = asyncHandler(async (req, res) => {
    const books = await BookModel.find({});
    if(!books){
        throw new ApiError(404," No Books found")
    }
    return res.status(200).json(books);
});

export const updateBook=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const{title,author,publishYear}=req.body;
    // if (!isValidObjectId(id)) {
    //     throw new ApiError(400, "Invalid book ID format");
    // }
    const book= await BookModel.findById(id);
    if(!book){
        
        res.status(400).json("Book Not found")
    }
    if ([title, author, publishYear].some((e) => e.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
      book.title=title;
      book.author=author;
      book.publishYear=publishYear;
      book.save()
      return res.status(200).send(book)
})

export const deleteBook=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const book= await BookModel.findByIdAndDelete(id);
    if(!book){
        throw new ApiError(404,"Book not found")
    }
    return res.status(200).send("Book deleted successfully")

})
