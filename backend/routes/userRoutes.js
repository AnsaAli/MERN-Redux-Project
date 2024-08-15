import express from "express";
import { test } from "../controller/userController.js";


const userRoutes = express.Router();

userRoutes.get("/", test);

export default userRoutes;
