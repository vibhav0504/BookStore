import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import router  from "./router/book.router.js";
import cors from "cors"
const app=express();
app.use(cors())
// allowed to all
// app.use(cors({
//     origin:"http://localhost:5173/",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))
app.use(express.json())
mongoose.connect( process.env.CONNECTION_URL )
.then(()=>{
    console.log("Database connected Successfully")
    app.listen(process.env.PORT,()=>{
        console.log(`App is running at port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(error.message)
})
app.use("/books",router)
