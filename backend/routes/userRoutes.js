import express from "express";
import { test, updateUser } from "../controller/userController.js";
import { verifyUser } from "../utils/verifyUser.js";


const userRoutes = express.Router();

userRoutes.get("/", test);
userRoutes.post('/update/:id', verifyUser, updateUser)

export default userRoutes;
