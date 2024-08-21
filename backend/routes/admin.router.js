import express from 'express';
import { getUserData } from '../controller/admin.controller.js';

const adminRoute = express();

adminRoute.get('/userData',getUserData );

export default adminRoute;