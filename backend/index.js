import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the mongo"))
  .catch((err) => console.log(err));


const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Server running on 3000"));
