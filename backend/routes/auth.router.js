import express from 'express';
import { google, signin, signup } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin', signin);
// authRouter.post('/google',google)
authRouter.post('/google', (req, res, next) => {
    console.log('Received request on /google route:', req.body);
    next();
  }, google);
  


export default authRouter;