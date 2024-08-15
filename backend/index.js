import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRouter from './routes/auth.router.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the mongo"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Server running on 3000"));


app.use('/backend/userRoute', userRoutes);
app.use('/backend/auth', authRouter);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success : false,
    message,
    statusCode
  })
})