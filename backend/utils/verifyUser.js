import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUser = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
       return next(errorHandler(401, 'Please Login!'))
    }

    jwt.verify(token, process.env.JWT_Secret,(err, user)=>{
        if(err) return next(errorHandler(403,'Token is not valid'))

        req.user = user;
        next();
    })
}