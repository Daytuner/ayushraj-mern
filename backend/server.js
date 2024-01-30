import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import connectDB from "./config/db.js";
import { notFound,errorHandler } from "../backend/middleware/errorMiddleware.js";


const port =process.env.PORT||5000;
connectDB();//connect to mongo db
const app = express();

// body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cookie parser middleware
app.use(cookieParser())

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)


app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})