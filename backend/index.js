import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRouter from './routes/auth.router.js';
import cookieParser from "cookie-parser";
import cors from 'cors'
import adminRoute from "./routes/admin.router.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the mongo"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => console.log("Server running on 3000"));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}))

app.use('/backend/userRoute', userRoutes);
app.use('/backend/auth', authRouter);
app.use('/backend/admin',adminRoute);

// app.use((err,req,res,next)=>{
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';

//   return res.status(statusCode).json({
//     success : false,
//     message,
//     statusCode
//   })
// })
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message, statusCode });
});
