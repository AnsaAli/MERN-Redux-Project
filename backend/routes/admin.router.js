import express from 'express';
import { deleteUser, getUserData, getUserDataById, updateAdminUser } from '../controller/admin.controller.js';

const adminRoute = express();

adminRoute.get('/userData',getUserData );
adminRoute.get('/user/:id', getUserDataById);
adminRoute.put('/update/:id',updateAdminUser );
adminRoute.delete('/delete/:id', deleteUser);

export default adminRoute;